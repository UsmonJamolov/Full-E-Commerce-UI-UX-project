const { Schema, model } = require('mongoose')

const headerSettingsSchema = new Schema(
	{
		key: { type: String, unique: true, default: 'main' },
		locationLabel: { type: String, default: 'Tashkent', trim: true },
	},
	{ timestamps: true },
)

module.exports = model('HeaderSetting', headerSettingsSchema)
