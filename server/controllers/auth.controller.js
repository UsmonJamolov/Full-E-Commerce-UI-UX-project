const User = require('../models/user.model');
const { sendSMS } = require('../utils/sms');
const jwt = require('jsonwebtoken');

// Vaqtinchalik OTP saqlash (ishlab chiqarishda Redis ishlatish tavsiya etiladi)
const otpStore = new Map();

// const sendOTP = async (req, res) => {
//   try {
//     let { phone } = req.body;

//     if (!phone) {
//       return res.status(400).json({ success: false, message: "Telefon raqam kiritilmagan" });
//     }

//     // Raqamni tozalash
//     phone = phone.replace(/\D/g, '');
//     if (phone.startsWith('8')) phone = '7' + phone.slice(1);
//     if (!phone.startsWith('7')) {
//       return res.status(400).json({ success: false, message: "Faqat Rossiya raqamlari (+7) qabul qilinadi" });
//     }

//     const fullPhone = '+' + phone;
//     const otp = Math.floor(100000 + Math.random() * 900000).toString();

//     console.log("OTP:", otp);

//     const message = `Sizning tasdiqlash kodingiz: ${otp}. Kod 10 daqiqa ichida amal qiladi.`;

//     const success = await sendSMS(fullPhone, message);

//     if (!success) {
//       return res.status(500).json({ success: false, message: "SMS yuborib bo‘lmadi" });
//     }

//     await sendSMS(fullPhone, message); // faqat chaqiramiz, lekin tekshirmaymiz

//     // OTP ni saqlash (10 daqiqa)
//     otpStore.set(fullPhone, {
//       otp,
//       expires: Date.now() + 10 * 60 * 1000
//     });

//     res.json({ success: true, message: "SMS kod muvaffaqiyatli yuborildi" });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: "Server xatosi" });
//   }
// };

const sendOTP = async (phone) => {
  try {
    // 📱 telefonni tozalash
    const cleaned = phone.replace(/\D/g, "");

    if (cleaned.length < 11) {
      throw new Error("Telefon noto‘g‘ri");
    }

    // 🔢 OTP generatsiya
    const otp = Math.floor(100000 + Math.random() * 900000);

    // 🔐 Basic Auth
    const auth = Buffer.from(
      `${process.env.SMSAERO_EMAIL}:${process.env.SMSAERO_API_KEY}`
    ).toString("base64");

    const response = await axios.post(
      "https://gate.smsaero.ru/v2/sms/send",
      {
        number: cleaned,
        text: `Sizning tasdiqlash kodingiz: ${otp}`,
        sign: "SMS Aero", // yoki o‘zing
      },
      {
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("SMS Aero response:", response.data);

    return {
      success: true,
      otp,
    };
  } catch (error) {
    console.error("SMS Aero error:", error.response?.data || error.message);

    return {
      success: false,
      message: "SMS yuborishda xatolik",
    };
  }
};

const verifyOTP = async (req, res) => {
  try {
    let { phone, otp } = req.body;

    if (!phone || !otp) {
      return res.status(400).json({
        success: false,
        message: "Telefon va kod majburiy"
      });
    }

    // 🔹 Telefonni tozalash
    phone = phone.replace(/\D/g, '');
    if (phone.startsWith('8')) phone = '7' + phone.slice(1);
    const fullPhone = '+' + phone;

    const stored = otpStore.get(fullPhone);

    if (!stored || Date.now() > stored.expires) {
      otpStore.delete(fullPhone);
      return res.status(400).json({
        success: false,
        message: "Kod muddati tugagan yoki topilmadi"
      });
    }

    if (stored.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Noto‘g‘ri SMS kod"
      });
    }

    // 🔹 USER TOPISH/YARATISH
    let user = await User.findOne({ phone: fullPhone });

    if (!user) {
      user = await User.create({ phone: fullPhone });
      console.log(`🆕 Yangi foydalanuvchi: ${fullPhone}`);
    }

    // 🔹 OTP o‘chirish
    otpStore.delete(fullPhone);

    // 🔐 TOKENNI SHU YERDA YARATAMIZ
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "secret123",
      { expiresIn: "7d" }
    );

    // 🍪 COOKIE GA SAQLASH
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false // productionda true
    });

    // ✅ RESPONSE
    res.json({
      success: true,
      message: "Muvaffaqiyatli",
      user: {
        id: user._id,
        phone: user.phone
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server xatosi"
    });
  }
};

// module.exports = new AuthController()

module.exports = { sendOTP, verifyOTP };