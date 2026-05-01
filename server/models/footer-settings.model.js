const { Schema, model } = require('mongoose')

const footerSettingsSchema = new Schema(
	{
		key: { type: String, unique: true, default: 'main' },
		phonePrimary: { type: String, default: '+79210975576', trim: true },
		phoneSecondary: { type: String, default: '+79650015442', trim: true },
		supportHours: { type: String, default: '10:00 – 22:00', trim: true },
		email: { type: String, default: 'exclusive@gmail.com', trim: true },
		telegramUrl: { type: String, default: 'https://t.me/', trim: true },
		maxMessengerUrl: { type: String, default: 'https://max.ru/', trim: true },
		brandBlurb: {
			type: String,
			default: 'Exclusive — quality fashion & footwear. Join thousands of happy customers shopping with us every day.',
			trim: true,
		},
	},
	{ timestamps: true },
)

module.exports = model('FooterSetting', footerSettingsSchema)
