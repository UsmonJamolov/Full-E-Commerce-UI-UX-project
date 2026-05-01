const footerSettingsModel = require('../models/footer-settings.model')

const DEFAULTS = {
	phonePrimary: '+79210975576',
	phoneSecondary: '+79650015442',
	supportHours: '10:00 – 22:00',
	email: 'exclusive@gmail.com',
	telegramUrl: 'https://t.me/',
	maxMessengerUrl: 'https://max.ru/',
	brandBlurb: 'Exclusive — quality fashion & footwear. Join thousands of happy customers shopping with us every day.',
}

class FooterSettingsController {
	async getSettings(req, res, next) {
		try {
			let doc = await footerSettingsModel.findOne({ key: 'main' })
			if (!doc) {
				doc = await footerSettingsModel.create({ key: 'main', ...DEFAULTS })
			}
			return res.json({
				phonePrimary: doc.phonePrimary || DEFAULTS.phonePrimary,
				phoneSecondary: doc.phoneSecondary || DEFAULTS.phoneSecondary,
				supportHours: doc.supportHours || DEFAULTS.supportHours,
				email: doc.email || DEFAULTS.email,
				telegramUrl: doc.telegramUrl || DEFAULTS.telegramUrl,
				maxMessengerUrl: doc.maxMessengerUrl || DEFAULTS.maxMessengerUrl,
				brandBlurb: doc.brandBlurb || DEFAULTS.brandBlurb,
			})
		} catch (error) {
			next(error)
		}
	}

	async updateSettings(req, res, next) {
		try {
			const {
				phonePrimary,
				phoneSecondary,
				supportHours,
				email,
				telegramUrl,
				maxMessengerUrl,
				brandBlurb,
			} = req.body

			let doc = await footerSettingsModel.findOne({ key: 'main' })
			if (!doc) {
				doc = await footerSettingsModel.create({ key: 'main', ...DEFAULTS })
			}

			if (typeof phonePrimary === 'string' && phonePrimary.trim()) doc.phonePrimary = phonePrimary.trim().slice(0, 30)
			if (typeof phoneSecondary === 'string' && phoneSecondary.trim()) doc.phoneSecondary = phoneSecondary.trim().slice(0, 30)
			if (typeof supportHours === 'string' && supportHours.trim()) doc.supportHours = supportHours.trim().slice(0, 80)
			if (typeof email === 'string' && email.trim()) doc.email = email.trim().slice(0, 120)
			if (typeof telegramUrl === 'string' && telegramUrl.trim()) doc.telegramUrl = telegramUrl.trim().slice(0, 240)
			if (typeof maxMessengerUrl === 'string' && maxMessengerUrl.trim()) doc.maxMessengerUrl = maxMessengerUrl.trim().slice(0, 240)
			if (typeof brandBlurb === 'string' && brandBlurb.trim()) doc.brandBlurb = brandBlurb.trim().slice(0, 500)

			await doc.save()

			return res.json({
				status: 200,
				phonePrimary: doc.phonePrimary,
				phoneSecondary: doc.phoneSecondary,
				supportHours: doc.supportHours,
				email: doc.email,
				telegramUrl: doc.telegramUrl,
				maxMessengerUrl: doc.maxMessengerUrl,
				brandBlurb: doc.brandBlurb,
			})
		} catch (error) {
			next(error)
		}
	}
}

module.exports = new FooterSettingsController()
