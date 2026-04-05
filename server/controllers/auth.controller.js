const User = require('../models/user.model');
const bcrypt = require("bcrypt");
const { createOTP } = require("../utils/createOtp");
const jwt = require('jsonwebtoken');

class AuthController {


async login(req, res, next) {
  try {
    const { phone, password } = req.body;

    const normalizedPhone = "+" + phone.replace(/\D/g, "");

    const user = await User.findOne({ phone: normalizedPhone });

    if (!user) {
      return res.status(400).json({ message: "User topilmadi" });
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res.status(400).json({ message: "Password noto‘g‘ri" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 🔥 ENG MUHIM QISM
    res.cookie("token", token, {
      httpOnly: true, // JS orqali o‘qib bo‘lmaydi
      secure: false,  // productionda true qilasan (https bo‘lsa)
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 kun
    });

    return res.json({
      success: true,
      user,
    });

  } catch (error) {
    next(error);
  }
}

  // 📲 REGISTER (OTP yuborish)
 async register  (req, res) {
  try {
    let { name, phone, password } = req.body;

    phone = phone.replace(/\D/g, "");
    const fullPhone = "+" + phone;

    const user = await User.findOne({ phone: fullPhone });

    if (user) {
      return res.json({
        success: false,
        message: "User mavjud",
      });
    }

    // 🔥 SHU YERDA SEND OTP LOGIKA
    await createOTP({
      phone: fullPhone,
      name,
      password,
    });

    res.json({
      success: true,
      message: "OTP yuborildi",
    });

  } catch (e) {
    res.json({ success: false });
  }
};
}

module.exports = new AuthController();