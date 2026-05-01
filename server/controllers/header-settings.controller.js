const headerSettingsModel = require('../models/header-settings.model')

class HeaderSettingsController {
	async getSettings(req, res, next) {
		try {
			let doc = await headerSettingsModel.findOne({ key: 'main' })
			if (!doc) {
				doc = await headerSettingsModel.create({ key: 'main', locationLabel: 'Tashkent' })
			}
			return res.json({ locationLabel: doc.locationLabel || 'Tashkent' })
		} catch (error) {
			next(error)
		}
	}

	async updateSettings(req, res, next) {
		try {
			const { locationLabel } = req.body
			const label =
				typeof locationLabel === 'string' && locationLabel.trim()
					? locationLabel.trim().slice(0, 120)
					: 'Tashkent'
			let doc = await headerSettingsModel.findOne({ key: 'main' })
			if (!doc) {
				doc = await headerSettingsModel.create({ key: 'main', locationLabel: label })
			} else {
				doc.locationLabel = label
				await doc.save()
			}
			return res.json({ status: 200, locationLabel: doc.locationLabel })
		} catch (error) {
			next(error)
		}
	}
}

module.exports = new HeaderSettingsController()
