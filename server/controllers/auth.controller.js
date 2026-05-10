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

async registerWithRole(req, res, role = 'user', requireAdminKey = false) {
  try {
    const { name, login, password, phone, adminKey } = req.body;
    const rawLogin = login ?? phone;

    if (requireAdminKey) {
      if (!process.env.ADMIN_SIGNUP_KEY) {
        return res.status(503).json({
          success: false,
          message: "Admin ro‘yxatdan o‘tish vaqtincha o‘chiq",
        });
      }
      if (adminKey !== process.env.ADMIN_SIGNUP_KEY) {
        return res.status(403).json({
          success: false,
          message: "Admin kalit noto‘g‘ri",
        });
      }
    }

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
      role,
    };

    if (trimmed.includes("@")) {
      const email = trimmed.toLowerCase();
      const emailUser = await User.findOne({ email });
      if (emailUser) {
        if (emailUser.isDeleted) {
          emailUser.name = String(name).trim();
          emailUser.password = await bcrypt.hash(password, 10);
          emailUser.isDeleted = false;
          emailUser.deletedAt = undefined;
          emailUser.role = role;
          if (role === 'admin' && requireAdminKey) emailUser.adminCreatedBy = null;
          await emailUser.save();
          const userObj = emailUser.toObject();
          delete userObj.password;
          userObj.favorites = await getFavoriteProductIds(emailUser._id);
          return res.status(200).json({
            success: true,
            message: "Akkaunt tiklandi",
            user: userObj,
          });
        }
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
        if (existingUser.isDeleted) {
          existingUser.name = String(name).trim();
          existingUser.password = await bcrypt.hash(password, 10);
          existingUser.isDeleted = false;
          existingUser.deletedAt = undefined;
          existingUser.role = role;
          if (role === 'admin' && requireAdminKey) existingUser.adminCreatedBy = null;
          await existingUser.save();
          const userObj = existingUser.toObject();
          delete userObj.password;
          userObj.favorites = await getFavoriteProductIds(existingUser._id);
          return res.status(200).json({
            success: true,
            message: "Akkaunt tiklandi",
            user: userObj,
          });
        }
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

async register(req, res) {
  return this.registerWithRole(req, res, 'user', false);
}

async registerAdmin(req, res) {
  return this.registerWithRole(req, res, 'admin', true);
}

/** Faqat admin-sign-up orqali yaratilgan admin (adminCreatedBy yo‘q) chaqira oladi. */
async createDelegatedAdmin(req, res, next) {
  try {
    const creator = req.user
    if (!creator || creator.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Ruxsat yo‘q' })
    }
    if (creator.adminCreatedBy) {
      return res.status(403).json({
        success: false,
        message: 'Faqat asosiy admin boshqa admin yarata oladi',
      })
    }

    const { name, login, password, phone } = req.body
    const rawLogin = login ?? phone
    if (!name || !String(name).trim() || !rawLogin || !password) {
      return res.status(400).json({
        success: false,
        message: 'Ism, email yoki telefon va parol kerak',
      })
    }

    const pwCheck = validateRegistrationPassword(password)
    if (!pwCheck.ok) {
      return res.status(400).json({ success: false, message: pwCheck.message })
    }

    const trimmed = String(rawLogin).trim()
    const userPayload = {
      name: String(name).trim(),
      password: await bcrypt.hash(password, 10),
      role: 'admin',
      adminCreatedBy: creator._id,
    }

    if (trimmed.includes('@')) {
      const email = trimmed.toLowerCase()
      const emailUser = await User.findOne({ email })
      if (emailUser) {
        if (emailUser.isDeleted) {
          emailUser.name = String(name).trim()
          emailUser.password = await bcrypt.hash(password, 10)
          emailUser.isDeleted = false
          emailUser.deletedAt = undefined
          emailUser.role = 'admin'
          emailUser.adminCreatedBy = creator._id
          await emailUser.save()
          const userObj = emailUser.toObject()
          delete userObj.password
          userObj.favorites = await getFavoriteProductIds(emailUser._id)
          return res.status(200).json({
            success: true,
            message: 'Admin tiklandi',
            user: userObj,
          })
        }
        return res.status(400).json({ success: false, message: 'Email band' })
      }
      userPayload.email = email
    } else {
      const digits = trimmed.replace(/\D/g, '')
      if (digits.length < 9) {
        return res.status(400).json({
          success: false,
          message: 'Telefon raqam noto‘g‘ri',
        })
      }
      const fullPhone = '+' + digits
      const existingUser = await User.findOne({ phone: fullPhone })
      if (existingUser) {
        if (existingUser.isDeleted) {
          existingUser.name = String(name).trim()
          existingUser.password = await bcrypt.hash(password, 10)
          existingUser.isDeleted = false
          existingUser.deletedAt = undefined
          existingUser.role = 'admin'
          existingUser.adminCreatedBy = creator._id
          await existingUser.save()
          const userObj = existingUser.toObject()
          delete userObj.password
          userObj.favorites = await getFavoriteProductIds(existingUser._id)
          return res.status(200).json({
            success: true,
            message: 'Admin tiklandi',
            user: userObj,
          })
        }
        return res.status(400).json({ success: false, message: 'User mavjud' })
      }
      userPayload.phone = fullPhone
    }

    let newUser
    try {
      newUser = await User.create(userPayload)
    } catch (err) {
      if (err && err.code === 11000) {
        return res.status(400).json({
          success: false,
          message: 'Email yoki telefon allaqachon ro‘yxatdan o‘tgan',
        })
      }
      throw err
    }

    const userObj = newUser.toObject()
    delete userObj.password
    userObj.favorites = await getFavoriteProductIds(newUser._id)

    return res.status(201).json({
      success: true,
      message: 'Admin yaratildi',
      user: userObj,
    })
  } catch (error) {
    next(error)
  }
}

  async listDelegatedAdmins(req, res, next) {
    try {
      if (req.user.adminCreatedBy) {
        return res.status(403).json({ success: false, message: 'Ruxsat yo‘q' })
      }
      const admins = await User.find(
        {
          role: 'admin',
          adminCreatedBy: { $exists: true, $ne: null },
          isDeleted: { $ne: true },
        },
        { password: 0 },
      )
        .sort({ createdAt: -1 })
        .lean()

      const list = admins.map((u) => ({
        _id: u._id,
        name: u.name,
        email: u.email || null,
        phone: u.phone || null,
        createdAt: u.createdAt,
      }))
      return res.json({ admins: list })
    } catch (error) {
      next(error)
    }
  }

  async deleteDelegatedAdmin(req, res, next) {
    try {
      if (req.user.adminCreatedBy) {
        return res.status(403).json({ success: false, message: 'Ruxsat yo‘q' })
      }
      const { id } = req.params
      if (String(id) === String(req.user._id)) {
        return res.status(400).json({ success: false, message: 'O‘zingizni o‘chira olmaysiz' })
      }
      const target = await User.findById(id)
      if (!target || target.role !== 'admin') {
        return res.status(404).json({ success: false, message: 'Topilmadi' })
      }
      if (!target.adminCreatedBy) {
        return res.status(400).json({
          success: false,
          message: 'Asosiy adminni bu yerda o‘chirib bo‘lmaydi',
        })
      }
      target.isDeleted = true
      target.deletedAt = new Date()
      await target.save()
      return res.json({ status: 200, success: true })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new AuthController();