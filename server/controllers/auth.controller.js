const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
// const axios = require("axios");
const { sendSMS } = require("../utils/sms");

// vaqtinchalik OTP storage
const otpStore = new Map();

const sendOTP = async (req, res) => {
  try {
    let { phone } = req.body;

    if (!phone) {
      return res.status(400).json({ success: false, message: "Telefon raqam kiritilmagan" });
    }

    // Raqamni tozalash
    phone = phone.replace(/\D/g, '');
    if (phone.startsWith('8')) phone = '7' + phone.slice(1);
    if (!phone.startsWith('7')) {
      return res.status(400).json({ success: false, message: "Faqat Rossiya raqamlari (+7) qabul qilinadi" });
    }

    const fullPhone = '+' + phone;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    console.log("OTP:", otp);

    const message = `Sizning tasdiqlash kodingiz: ${otp}. Kod 10 daqiqa ichida amal qiladi.`;

    // const success = await sendSMS(fullPhone, message);

    // if (!success) {
    //   return res.status(500).json({ success: false, message: "SMS yuborib bo‘lmadi" });
    // }

    await sendSMS(fullPhone, message); // faqat chaqiramiz, lekin tekshirmaymiz

    // OTP ni saqlash (10 daqiqa)
    otpStore.set(fullPhone, {
      otp,
      expires: Date.now() + 10 * 60 * 1000
    });

    res.json({ success: true, message: "SMS kod muvaffaqiyatli yuborildi" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server xatosi" });
  }
};

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

// /api/auth/login-otp
const loginOtp = async (req, res) => {
  const { phone } = req.body;

  const user = await User.findOne({ phone });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User topilmadi"
    });
  }
};

const register = async (req, res) => {
  const { name, phone, password } = req.body;

  const existing = await User.findOne({ phone });

  if (existing) {
    return res.status(400).json({
      success: false,
      message: "User allaqachon mavjud"
    });
  }

  const user = await User.create({ name, phone, password });

  // OTP yuborish
};

module.exports = {
  sendOTP,
  verifyOTP,
  register,
  loginOtp
};