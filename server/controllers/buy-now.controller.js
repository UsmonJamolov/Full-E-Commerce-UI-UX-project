const buyNowModel = require('../models/buy-now.model')

class BuyNowController {
	async getSettings(req, res, next) {
		try {
			let setting = await buyNowModel.findOne({ key: 'main' })
			if (!setting) {
				setting = await buyNowModel.create({
					key: 'main',
					targetDate: new Date(Date.now() + (5 * 86400 + 23 * 3600 + 59 * 60 + 35) * 1000),
					image: '/images/krosovkalar1.png',
					imageKey: '',
					isTimerVisible: true,
					isTimerPaused: false,
					pausedRemainingSeconds: 0,
				})
			}

			return res.json({
				targetDate: setting.targetDate,
				image: setting.image,
				imageKey: setting.imageKey,
				isTimerVisible: setting.isTimerVisible,
				isTimerPaused: setting.isTimerPaused,
				pausedRemainingSeconds: setting.pausedRemainingSeconds,
			})
		} catch (error) {
			next(error)
		}
	}

	async updateSettings(req, res, next) {
		try {
			const { targetDate, image, imageKey, isTimerVisible, isTimerPaused } = req.body
			let setting = await buyNowModel.findOne({ key: 'main' })
			if (!setting) {
				setting = await buyNowModel.create({
					key: 'main',
					targetDate: new Date(Date.now() + (5 * 86400 + 23 * 3600 + 59 * 60 + 35) * 1000),
					image: '/images/krosovkalar1.png',
					imageKey: '',
					isTimerVisible: true,
					isTimerPaused: false,
					pausedRemainingSeconds: 0,
				})
			}

			if (targetDate) {
				const parsed = new Date(targetDate)
				if (Number.isNaN(parsed.getTime())) {
					return res.json({ failure: 'Invalid targetDate' })
				}
				setting.targetDate = parsed
				if (!setting.isTimerPaused) {
					setting.pausedRemainingSeconds = 0
				}
			}

			if (typeof image === 'string') setting.image = image
			if (typeof imageKey === 'string') setting.imageKey = imageKey
			if (typeof isTimerVisible === 'boolean') setting.isTimerVisible = isTimerVisible

			if (typeof isTimerPaused === 'boolean') {
				if (isTimerPaused && !setting.isTimerPaused) {
					const remain = Math.max(0, Math.floor((new Date(setting.targetDate).getTime() - Date.now()) / 1000))
					setting.pausedRemainingSeconds = remain
					setting.isTimerPaused = true
				}
				if (!isTimerPaused && setting.isTimerPaused) {
					const remain = Math.max(0, Number(setting.pausedRemainingSeconds || 0))
					setting.targetDate = new Date(Date.now() + remain * 1000)
					setting.pausedRemainingSeconds = 0
					setting.isTimerPaused = false
				}
			}

			await setting.save()

			return res.json({
				status: 200,
				targetDate: setting.targetDate,
				image: setting.image,
				imageKey: setting.imageKey,
				isTimerVisible: setting.isTimerVisible,
				isTimerPaused: setting.isTimerPaused,
				pausedRemainingSeconds: setting.pausedRemainingSeconds,
			})
		} catch (error) {
			next(error)
		}
	}
}

module.exports = new BuyNowController()
