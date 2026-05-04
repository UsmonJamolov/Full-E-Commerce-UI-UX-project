const User = require('../models/user.model');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { getFavoriteProductIds } = require('../services/favorite.service');
const { validateRegistrationPassword } = require('../utils/passwordPolicy');

class AuthController {


async login(req, res, next) {
  try {
    const rawLogin = req.body.login ?? req.body.phone;
    const { password } = req.body;

    if (!rawLogin || !password) {
      return res.status(400).json({ message: "Login va parol kerak" });
    }

    const trimmed = String(rawLogin).trim();
    let user;
    if (trimmed.includes("@")) {
      user = await User.findOne({ email: trimmed.toLowerCase() });
    } else {
      const normalizedPhone = "+" + trimmed.replace(/\D/g, "");
      user = await User.findOne({ phone: normalizedPhone });
    }

    if (!user) {
      return res.status(400).json({ message: "User topilmadi" });
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res.status(400).json({ message: "Password noto‘g‘ri" });
    }

    if (user.isDeleted) {
      return res.status(403).json({
        success: false,
        message: user.deletedAt
          ? `Akkaunt o‘chirilgan (${user.deletedAt.toLocaleString()})`
          : "Akkaunt o‘chirilgan",
      });
    }

    const token = jwt.sign(
      { userId: user._id },
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

    const userPayload = user.toObject();
    delete userPayload.password;
    userPayload.favorites = await getFavoriteProductIds(user._id);

    return res.json({
      success: true,
      user: userPayload,
    });

  } catch (error) {
    next(error);
  }
}

  // 📲 REGISTER (OTP yuborish)
//  async register  (req, res) {
//   try {
//     let { name, phone, password } = req.body;

//     phone = phone.replace(/\D/g, "");
//     const fullPhone = "+" + phone;

//     const user = await User.findOne({ phone: fullPhone });

//     if (user) {
//       return res.json({
//         success: false,
//         message: "User mavjud",
//       });
//     }

//     // 🔥 SHU YERDA SEND OTP LOGIKA
//     await createOTP({
//       phone: fullPhone,
//       name,
//       password,
//     });

//     res.json({
//       success: true,
//       message: "OTP yuborildi",
//     });

//   } catch (e) {
//     res.json({ success: false });
//   }
// };

async register(req, res) {
  try {
    const { name, login, password, phone } = req.body;
    const rawLogin = login ?? phone;

    if (!name || !String(name).trim() || !rawLogin || !password) {
      return res.status(400).json({
        success: false,
        message: "Ism, email yoki telefon va parol kerak",
      });
    }

    const pwCheck = validateRegistrationPassword(password);
    if (!pwCheck.ok) {
      return res.status(400).json({ success: false, message: pwCheck.message });
    }

    const trimmed = String(rawLogin).trim();
    const userPayload = {
      name: String(name).trim(),
      password: await bcrypt.hash(password, 10),
    };

    if (trimmed.includes("@")) {
      const email = trimmed.toLowerCase();
      const emailTaken = await User.findOne({ email });
      if (emailTaken) {
        return res.status(400).json({
          success: false,
          message: "Email band",
        });
      }
      userPayload.email = email;
    } else {
      const digits = trimmed.replace(/\D/g, "");
      if (digits.length < 9) {
        return res.status(400).json({
          success: false,
          message: "Telefon raqam noto‘g‘ri",
        });
      }
      const fullPhone = "+" + digits;
      const existingUser = await User.findOne({ phone: fullPhone });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "User mavjud",
        });
      }
      userPayload.phone = fullPhone;
    }

    let newUser;
    try {
      newUser = await User.create(userPayload);
    } catch (err) {
      if (err && err.code === 11000) {
        return res.status(400).json({
          success: false,
          message: "Email yoki telefon allaqachon ro‘yxatdan o‘tgan",
        });
      }
      throw err;
    }

    const userObj = newUser.toObject();
    delete userObj.password;
    userObj.favorites = await getFavoriteProductIds(newUser._id);

    return res.status(201).json({
      success: true,
      message: "User yaratildi",
      user: userObj,
    });

  } catch (error) {
    console.log("REGISTER ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
}
}

module.exports = new AuthController();