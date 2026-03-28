// const { Schema, model } = require('mongoose')

// const userSchema = new Schema(
// 	{
// 		email: { type: String, required: true, unique: true },
// 		fullName: { type: String, required: true },
// 		password: { type: String, required: true },
// 		role: { type: String, required: true, default: 'user' },
// 		avatar: { type: String },
// 		avatarKey: { type: String },
// 		isDeleted: { type: Boolean, default: false },
// 		deletedAt: { type: Date },
// 		favorites: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
// 		customerId: { type: String },
// 	},
// 	{ timestamps: true }
// )

// module.exports = model('User', userSchema)

// models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  name: {
    type: String,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', UserSchema);