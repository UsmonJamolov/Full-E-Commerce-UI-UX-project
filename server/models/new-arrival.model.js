const { Schema, model } = require('mongoose')

const newArrivalCardSchema = new Schema(
	{
		title: { type: String, required: true, trim: true },
		desc: { type: String, required: true, trim: true },
		image: { type: String, default: '' },
		imageKey: { type: String, default: '' },
	},
	{ _id: false },
)

const newArrivalSchema = new Schema(
	{
		key: { type: String, unique: true, default: 'main' },
		cards: { type: [newArrivalCardSchema], default: [] },
	},
	{ timestamps: true },
)

module.exports = model('NewArrivalSetting', newArrivalSchema)
