const mongoose = require('mongoose')

const purchaseItemSchema = new mongoose.Schema(
	{
		name: { type: String, required: true, trim: true },
		image: { type: String, default: '' },
		imageKey: { type: String, default: '' },
		status: {
			type: String,
			enum: ['pending', 'approved'],
			default: 'pending',
		},
	},
	{ timestamps: true },
)

module.exports = mongoose.model('PurchaseItem', purchaseItemSchema)
