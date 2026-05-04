const { Schema, model } = require('mongoose')

const slideSchema = new Schema(
	{
		title: { type: String, required: true },
		text: { type: String, required: true },
		alt: { type: String, default: '' },
		image: { type: String, required: true },
		link: { type: String, required: true },
	},
	{ _id: false },
)

const homeSliderSettingsSchema = new Schema(
	{
		key: { type: String, default: 'main', unique: true },
		slides: { type: [slideSchema], default: [] },
	},
	{ timestamps: true },
)

module.exports = model('HomeSliderSetting', homeSliderSettingsSchema)
