const { Schema, model } = require('mongoose')

const otpSchema = new Schema({
  phone: { type: String, required: true }, 
  otp: { type: String, required: true },
  name: String,
  password: String,
  expiresAt: { type: Date },
});

module.exports = model('Otp', otpSchema)