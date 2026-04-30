const purchaseItemModel = require('../models/purchase-item.model')

class PurchaseController {
	constructor() {
		this.getPurchaseItems = this.getPurchaseItems.bind(this)
		this.createPurchaseItem = this.createPurchaseItem.bind(this)
		this.approvePurchaseItem = this.approvePurchaseItem.bind(this)
		this.updatePurchaseItem = this.updatePurchaseItem.bind(this)
		this.deletePurchaseItem = this.deletePurchaseItem.bind(this)
	}

	// [GET] /admin/purchase-items
	async getPurchaseItems(req, res, next) {
		try {
			const status = req.query.status || 'pending'
			const query = {}
			if (status === 'pending' || status === 'approved') {
				query.status = status
			}

			const items = await purchaseItemModel.find(query).sort({ createdAt: -1 })
			return res.json({ items })
		} catch (error) {
			next(error)
		}
	}

	// [POST] /admin/purchase-items
	async createPurchaseItem(req, res, next) {
		try {
			const name = (req.body.name || '').trim()
			if (!name) return res.status(400).json({ failure: 'Tovar nomini kiriting' })

			const item = await purchaseItemModel.create({ name, status: 'pending' })
			return res.json({ status: 201, item })
		} catch (error) {
			next(error)
		}
	}

	// [PATCH] /admin/purchase-items/:id/approve
	async approvePurchaseItem(req, res, next) {
		try {
			const { id } = req.params
			const item = await purchaseItemModel.findById(id)
			if (!item) return res.json({ failure: 'Tovar topilmadi' })

			item.status = 'approved'
			await item.save()

			return res.json({ status: 200, item })
		} catch (error) {
			next(error)
		}
	}

	// [PUT] /admin/purchase-items/:id
	async updatePurchaseItem(req, res, next) {
		try {
			const { id } = req.params
			const name = (req.body.name || '').trim()
			if (!name) return res.status(400).json({ failure: 'Tovar nomini kiriting' })

			const item = await purchaseItemModel.findById(id)
			if (!item) return res.json({ failure: 'Tovar topilmadi' })

			item.name = name
			await item.save()

			return res.json({ status: 200, item })
		} catch (error) {
			next(error)
		}
	}

	// [DELETE] /admin/purchase-items/:id
	async deletePurchaseItem(req, res, next) {
		try {
			const { id } = req.params
			const item = await purchaseItemModel.findByIdAndDelete(id)
			if (!item) return res.json({ failure: 'Tovar topilmadi' })
			return res.json({ status: 200 })
		} catch (error) {
			next(error)
		}
	}
}

module.exports = new PurchaseController()
