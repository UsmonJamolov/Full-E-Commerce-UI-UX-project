const { Schema, model } = require('mongoose')

const buyNowSchema = new Schema(
	{
		key: { type: String, unique: true, default: 'main' },
		targetDate: { type: Date, required: true },
		image: { type: String, default: '' },
		imageKey: { type: String, default: '' },
		isTimerVisible: { type: Boolean, default: true },
		isTimerPaused: { type: Boolean, default: false },
		pausedRemainingSeconds: { type: Number, default: 0 },
	},
	{ timestamps: true },
)

module.exports = model('BuyNowSetting', buyNowSchema)
