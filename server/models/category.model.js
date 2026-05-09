const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema(
	{
		name: { type: String, required: true, trim: true },
		nameUz: { type: String, trim: true },
		nameRu: { type: String, trim: true },
		nameEn: { type: String, trim: true },
		isDefault: { type: Boolean, default: false },
	},
	{ timestamps: true },
)

categorySchema.index({ name: 1 }, { unique: true })

module.exports = mongoose.model('Category', categorySchema)
