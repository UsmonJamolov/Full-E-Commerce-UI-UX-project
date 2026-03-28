const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    // 📧 Email login uchun
    email: {
      type: String,
      unique: true,
      sparse: true, // ❗ email bo‘lmasa ham saqlash mumkin
      trim: true,
      lowercase: true,
    },

    // 🔐 Parol (email login bo‘lsa)
    password: {
      type: String,
      select: false, // xavfsizlik uchun
    },

    // 📱 Telefon (OTP login uchun)
    phone: {
      type: String,
      unique: true,
      sparse: true, // ❗ phone bo‘lmasa ham saqlanadi
      index: true,
    },

    // 👤 Ism
    fullName: {
      type: String,
      default: null,
      trim: true,
    },

    // 👤 Qo‘shimcha name (optional)
    name: {
      type: String,
      default: null,
    },

    // 🎭 Role
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    // 🖼 Avatar
    avatar: {
      type: String,
    },

    avatarKey: {
      type: String,
    },

    // ❤️ Favorites
    favorites: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],

    // 💳 Stripe yoki boshqa payment
    customerId: {
      type: String,
    },

    // ❌ Soft delete
    isDeleted: {
      type: Boolean,
      default: false,
    },

    deletedAt: {
      type: Date,
    },
  },
  {
    timestamps: true, // createdAt, updatedAt avtomatik
  }
);

module.exports = mongoose.model("User", userSchema);