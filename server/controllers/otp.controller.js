const User = require("../models/user.model");
const Otp = require("../models/otp.model");
const { createOTP } = require("../utils/createOtp");
const jwt = require("jsonwebtoken");
const { sendSMS } = require("../utils/sms");

// 📲 SEND OTP
// const sendOTP = async (req, res) => {
//   try {
//     let { phone, type, name, password } = req.body;

//     if (!phone || !type) {
//       return res.status(400).json({
//         success: false,
//         message: "Phone va type kerak",
//       });
//     }

//     phone = phone.replace(/\D/g, "");
//     const fullPhone = "+" + phone;

//     const user = await User.findOne({ phone: fullPhone });

//     if (type === "login" && !user) {
//       return res.json({ success: false, message: "User topilmadi" });
//     }

//     if (type === "register" && user) {
//       return res.json({ success: false, message: "User mavjud" });
//     }

//     // OTP yaratish va DB ga saqlash
//     const otp = await createOTP({
//       phone: fullPhone,
//       name,
//       password,
//       type,
//     });

//     // OTP ni userga SMS qilish
//     const smsSent = await sendSMS(
//       fullPhone,
//       `Sizning tasdiqlash kodingiz: ${otp}`
//     );

//     if (!smsSent) {
//       return res.status(500).json({
//         success: false,
//         message: "SMS yuborilmadi",
//       });
//     }

//     return res.json({
//       success: true,
//       message: "OTP yuborildi",
//     });

//   } catch (e) {
//     console.log("SEND OTP ERROR:", e);
//     return res.status(500).json({
//       success: false,
//       message: "Server error",
//     });
//   }
// };

const sendOTP = async (req, res) => {
  try {
    let { phone, type, name, password } = req.body;

    phone = phone.replace(/\D/g, "");
    const fullPhone = "+" + phone;

    const user = await User.findOne({ phone: fullPhone });

    if (type === "login" && !user) {
      return res.json({
        success: false,
        message: "User topilmadi",
      });
    }

    if (type === "register" && user) {
      return res.json({
        success: false,
        message: "User mavjud",
      });
    }

    // OTP yaratadi va DB ga yozadi
    const otp = await createOTP({
      phone: fullPhone,
      name,
      password,
    });

    // 🔥 Development uchun SMS yubormaymiz
    console.log("DEV OTP:", otp);

    return res.json({
      success: true,
      message: "OTP yaratildi (development mode)",
      status: 200,
      otp, // faqat development uchun
    });

  } catch (e) {
    console.log("SEND OTP ERROR:", e);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// const verifyOTP = async (req, res) => {
//   try {
//     let { phone, otp } = req.body;

//     if (!phone || !otp) {
//       return res.status(400).json({
//         success: false,
//         message: "Phone va OTP kerak",
//       });
//     }

//     phone = phone.replace(/\D/g, "");
//     const fullPhone = "+" + phone;

//     const record = await Otp.findOne({ phone: fullPhone });

//     if (!record) {
//       return res.status(400).json({
//         success: false,
//         message: "OTP topilmadi",
//       });
//     }

//     if (record.otp !== otp) {
//       return res.status(400).json({
//         success: false,
//         message: "OTP noto‘g‘ri",
//       });
//     }

//     if (record.expiresAt < new Date()) {
//       return res.status(400).json({
//         success: false,
//         message: "OTP muddati tugagan",
//       });
//     }

//     let user;

//     // 🔥 REGISTER FLOW
//     if (record.type === "register") {
//       user = await User.create({
//         name: record.name,
//         phone: record.phone,
//         password: record.password, // already hashed
//       });
//     }

//     // 🔥 LOGIN FLOW
//     if (record.type === "login") {
//       user = await User.findOne({ phone: record.phone });

//       if (!user) {
//         return res.status(400).json({
//           success: false,
//           message: "User topilmadi",
//         });
//       }
//     }

//     await Otp.deleteOne({ _id: record._id });

//     const token = jwt.sign(
//       { id: user._id },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: false,
//       sameSite: "strict",
//       maxAge: 7 * 24 * 60 * 60 * 1000,
//     });

//     return res.json({
//       success: true,
//       user: {
//         id: user._id,
//         name: user.name,
//         phone: user.phone,
//       },
//     });

//   } catch (err) {
//     console.log("VERIFY ERROR:", err);
//     res.status(500).json({
//       success: false,
//       message: "Server error",
//     });
//   }
// };

const verifyOTP = async (req, res) => {
  try {
    let { phone, otp } = req.body;

    if (!phone || !otp) {
      return res.status(400).json({
        success: false,
        message: "Phone va OTP kerak",
      });
    }

    phone = phone.replace(/\D/g, "");
    const fullPhone = "+" + phone;

    const record = await Otp.findOne({ phone: fullPhone });

    if (!record) {
      return res.status(400).json({
        success: false,
        message: "OTP topilmadi",
      });
    }

    if (record.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "OTP noto‘g‘ri",
      });
    }

    if (record.expiresAt < new Date()) {
      return res.status(400).json({
        success: false,
        message: "OTP muddati tugagan",
        status: 301,
      });
    }

    return res.status(200).json({
      success: true,
      message: "OTP tasdiqlandi",
      status: 200,
    });

  } catch (err) {
    console.log("VERIFY ERROR:", err);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = {
  sendOTP,
  verifyOTP
};