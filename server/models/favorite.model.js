const { Schema, model } = require('mongoose')

const favoriteSchema = new Schema(
	{
		user: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
		product: { type: Schema.Types.ObjectId, ref: 'Product', required: true, index: true },
	},
	{ timestamps: true },
)

favoriteSchema.index({ user: 1, product: 1 }, { unique: true })

module.exports = model('Favorite', favoriteSchema)
