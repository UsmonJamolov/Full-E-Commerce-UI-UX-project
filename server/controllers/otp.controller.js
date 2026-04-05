const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const Otp = require("../models/otp.model");
const { createOTP } = require("../utils/createOtp");
const jwt = require("jsonwebtoken");
const { sendSMS } = require("../utils/sms");

// 📲 SEND OTP
const sendOTP = async (req, res) => {
  try {
    let { phone, type, name, password } = req.body;

    phone = phone.replace(/\D/g, "");
    const fullPhone = "+" + phone;

    const user = await User.findOne({ phone: fullPhone });

    if (type === "login" && !user) {
      return res.json({ success: false, message: "User topilmadi" });
    }

    if (type === "register" && user) {
      return res.json({ success: false, message: "User mavjud" });
    }

    await createOTP({ phone: fullPhone, name, password });

    res.json({
      success: true,
      message: "OTP yuborildi",
    });

  } catch (e) {
    res.json({ success: false });
  }
};

const verifyOTP = async (req, res) => {
    try {
      let { phone, otp } = req.body;

      if (!phone || !otp) {
        return res.status(400).json({
          success: false,
          message: "Phone va OTP kerak",
        });
      }

      // normalize
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
        });
      }

      // 🔥 USER YARATISH (ENG MUHIM)
      const user = await User.create({
        name: record.name,
        phone: record.phone,
        password: record.password, // already hashed
      });

      // OTP ni o‘chiramiz
      await Otp.deleteOne({ _id: record._id });

      const token = jwt.sign(
        { id: user._id },
        "secret",
        { expiresIn: "7d" }
      );

      res.json({
        success: true,
        token,
      });

    } catch (err) {
      console.log("VERIFY ERROR:", err);
      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  }


module.exports = {
  sendOTP,
  verifyOTP
};