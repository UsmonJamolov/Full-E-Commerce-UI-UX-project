const bcrypt = require("bcrypt");
const Otp = require("../models/otp.model");

const createOTP = async ({ phone, name, password, type }) => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  console.log("OTP:", otp);

  let hashedPassword = null;
  if (password) {
    hashedPassword = await bcrypt.hash(password, 10);
  }

  await Otp.findOneAndUpdate(
    { phone },
    {
      phone,
      otp,
      name,
      type,
      password: hashedPassword,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    },
    { upsert: true, returnDocument: "after" }
  );

  return otp;
};

module.exports = { createOTP };