const { Schema, model } = require('mongoose')

const otpSchema = new Schema({
  phone: { type: String, required: true },
  otp: { type: String, required: true },
  name: String,
  email: String,
  password: String,
  /** `register` — OTP `register` API gacha; `login` — kirishda tasdiqlangach o‘chiriladi. */
  type: { type: String, enum: ['register', 'login'], default: 'register' },
  expiresAt: { type: Date },
});

module.exports = model('Otp', otpSchema)