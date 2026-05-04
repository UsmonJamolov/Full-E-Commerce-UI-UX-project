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
			default:
				'Quality fashion and footwear. Thousands of happy customers shop with us every day.',
			trim: true,
		},
		mapEmbedSrc: {
			type: String,
			default:
				'https://www.openstreetmap.org/export/embed.html?bbox=69.18%2C41.23%2C69.38%2C41.38&layer=mapnik',
			trim: true,
		},
		mapExternalUrl: {
			type: String,
			default: 'https://www.openstreetmap.org/?mlat=41.2995&mlon=69.2401#map=14/41.2995/69.2401',
			trim: true,
		},
		mapAddress: {
			type: String,
			default: '',
			trim: true,
		},
	},
	{ timestamps: true },
)

module.exports = model('FooterSetting', footerSettingsSchema)
