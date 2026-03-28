const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const axios = require("axios");

// vaqtinchalik OTP storage
const otpStore = new Map();

const sendOTP = async (req, res) => {
  try {
    let { phone } = req.body;

    if (!phone) {
      return res.status(400).json({
        success: false,
        message: "Telefon raqam kiritilmagan",
      });
    }

    // 📱 Telefonni tozalash
    phone = phone.toString().replace(/\D/g, "");

    // 🇷🇺 Rossiya format (+7)
    if (phone.startsWith("8")) {
      phone = "7" + phone.slice(1);
    }

    if (!phone.startsWith("7") || phone.length < 11) {
      return res.status(400).json({
        success: false,
        message: "Faqat Rossiya raqami (+7) qabul qilinadi",
      });
    }

    const fullPhone = "+" + phone;

    // 🔢 OTP generatsiya
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // 🔐 Basic Auth
    const auth = Buffer.from(
      `${process.env.SMSAERO_EMAIL}:${process.env.SMSAERO_API_KEY}`
    ).toString("base64");

    // 📩 SMS matni (MUHIM: kirill + app nomi)
    const message = `Код подтверждения: ${otp}. Exclusive`;

    // 🚀 SMS yuborish
    const response = await axios.post(
      "https://gate.smsaero.ru/v2/sms/send",
      {
        number: phone, // + belgisisiz yuboriladi
        text: message,
        sign: "SMS Aero",
      },
      {
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("SMS Aero response:", response.data);

    // ❌ agar API error qaytarsa
    if (!response.data.success) {
      return res.status(500).json({
        success: false,
        message: "SMS yuborilmadi",
        error: response.data,
      });
    }

    // 💾 OTP saqlash (5 min)
    otpStore.set(fullPhone, {
      otp,
      expires: Date.now() + 5 * 60 * 1000,
    });

    // ✅ OK
    return res.json({
      success: true,
      message: "SMS yuborildi",
    });

  } catch (error) {
    console.error("SMS Aero error:", error.response?.data || error.message);

    return res.status(500).json({
      success: false,
      message: "Server xatosi",
    });
  }
};

module.exports = { sendOTP, otpStore };


// ✅ OTP TEKSHIRISH
const verifyOTP = async (req, res) => {
  try {
    let { phone, otp } = req.body;

    if (!phone || !otp) {
      return res.status(400).json({
        success: false,
        message: "Telefon va kod majburiy",
      });
    }

    phone = String(phone);

    let cleaned = phone.replace(/\D/g, "");

    if (cleaned.startsWith("8")) {
      cleaned = "7" + cleaned.slice(1);
    }

    const fullPhone = "+" + cleaned;

    const stored = otpStore.get(fullPhone);

    if (!stored || Date.now() > stored.expires) {
      otpStore.delete(fullPhone);

      return res.status(400).json({
        success: false,
        message: "Kod eskirgan yoki topilmadi",
      });
    }

    if (stored.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Noto‘g‘ri kod",
      });
    }

    // 👤 USER TOPISH yoki YARATISH
    let user = await User.findOne({ phone: fullPhone });

    if (!user) {
      user = await User.create({ phone: fullPhone });
      console.log("Yangi user:", fullPhone);
    }

    // 🗑 OTP o‘chirish
    otpStore.delete(fullPhone);

    // 🔐 JWT token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "secret123",
      { expiresIn: "7d" }
    );

    // 🍪 cookie
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false, // prod: true
    });

    return res.json({
      success: true,
      message: "Muvaffaqiyatli",
      user: {
        id: user._id,
        phone: user.phone,
      },
      token,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server xatosi",
    });
  }
};


module.exports = {
  sendOTP,
  verifyOTP,
};