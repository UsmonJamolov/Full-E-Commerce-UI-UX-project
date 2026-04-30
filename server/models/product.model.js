const { Schema, model } = require('mongoose')

const reviewSchema = new Schema(
	{
		user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
		userName: { type: String, required: true },
		rating: { type: Number, required: true, min: 1, max: 5 },
		comment: { type: String, required: true, trim: true },
		adminReply: { type: String, default: '' },
	},
	{ timestamps: true },
)

const productSchema = new Schema(
	{
		title: { type: String, required: true },
		category: { type: String, required: true },
		targetGroup: {
			type: String,
			enum: ['Erkak', 'Ayol', 'Bola'],
			default: 'Erkak',
		},
		price: { type: Number, required: true },
		description: { type: String, required: true },
		image: { type: String },
		imageKey: { type: String },
		stripePriceId: { type: String },
		stripeProductId: { type: String },
		isNew: { type: Boolean, default: true },
		ratingAverage: { type: Number, default: 0 },
		reviewCount: { type: Number, default: 0 },
		reviews: [reviewSchema],
	},
	{ timestamps: true }
)

module.exports = model('Product', productSchema)