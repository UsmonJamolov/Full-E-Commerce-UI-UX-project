const { Schema, model } = require('mongoose')

const userSchema = new Schema(
  {
    phone: {
      type: String,
      unique: true,
      sparse: true,
      index: true,
    },
    password: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, required: true, default: 'user' },
    avatar: {
      type: String,
    },

    avatarKey: {
      type: String,
    },
    favorites: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    customerId: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },

    deletedAt: {
      type: Date,
    },
    customerId: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", userSchema);