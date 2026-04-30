const categoryModel = require('../models/category.model')
const productModel = require('../models/product.model')

const HIDDEN_NAMES = ['Erkak', 'Ayol', 'Bola']
const DEFAULT_NAMES = ['Shoes', 'T-Shirts', 'Clothes', 'Books', 'Accessories', 'Universal']

function sortCategories(docs) {
	const visibleDocs = docs.filter((x) => !HIDDEN_NAMES.includes(x.name))
	const result = []
	for (const n of DEFAULT_NAMES) {
		const d = visibleDocs.find((x) => x.name === n)
		if (d) result.push(d)
	}
	const extras = visibleDocs
		.filter((x) => !DEFAULT_NAMES.includes(x.name))
		.sort((a, b) => a.name.localeCompare(b.name))
	return [...result, ...extras]
}

async function ensureDefaultCategories() {
	const docs = await categoryModel.find({}, { name: 1 }).lean()
	const existing = new Set(docs.map((d) => d.name))
	const missing = DEFAULT_NAMES.filter((name) => !existing.has(name))
	if (missing.length === 0) return
	await categoryModel.insertMany(
		missing.map((name) => ({
			name,
			isDefault: true,
		})),
	)
}

class CategoryController {
	constructor() {
		this.getCategories = this.getCategories.bind(this)
		this.createCategory = this.createCategory.bind(this)
		this.updateCategory = this.updateCategory.bind(this)
		this.deleteCategory = this.deleteCategory.bind(this)
	}

	async getCategories(req, res, next) {
		try {
			await ensureDefaultCategories()
			const docs = await categoryModel.find().lean()
			return res.json({ categories: sortCategories(docs) })
		} catch (error) {
			next(error)
		}
	}

	async createCategory(req, res, next) {
		try {
			await ensureDefaultCategories()
			const name = (req.body.name || '').trim()
			if (!name) return res.status(400).json({ failure: 'Kategoriya nomi kerak' })

			const exists = await categoryModel.findOne({
				name: { $regex: new RegExp(`^${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i') },
			})
			if (exists) return res.json({ failure: 'Bu nomdagi kategoriya allaqachon bor' })

			const doc = await categoryModel.create({ name, isDefault: false })
			return res.json({ status: 201, category: doc })
		} catch (error) {
			if (error.code === 11000) {
				return res.json({ failure: 'Bu nomdagi kategoriya allaqachon bor' })
			}
			next(error)
		}
	}

	async updateCategory(req, res, next) {
		try {
			const { id } = req.params
			const name = (req.body.name || '').trim()
			if (!name) return res.status(400).json({ failure: 'Kategoriya nomi kerak' })

			const doc = await categoryModel.findById(id)
			if (!doc) return res.json({ failure: 'Kategoriya topilmadi' })

			const dup = await categoryModel.findOne({
				name: { $regex: new RegExp(`^${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i') },
				_id: { $ne: id },
			})
			if (dup) return res.json({ failure: 'Bu nom band' })

			const oldName = doc.name
			doc.name = name
			await doc.save()

			if (oldName !== name) {
				await productModel.updateMany({ category: oldName }, { $set: { category: name } })
			}

			return res.json({ status: 200, category: doc })
		} catch (error) {
			next(error)
		}
	}

	async deleteCategory(req, res, next) {
		try {
			const { id } = req.params
			const doc = await categoryModel.findById(id)
			if (!doc) return res.json({ failure: 'Kategoriya topilmadi' })
			if (doc.isDefault) {
				return res.json({ failure: 'Standart kategoriyani o‘chirib bo‘lmaydi' })
			}

			await productModel.updateMany({ category: doc.name }, { $set: { category: 'Universal' } })
			await categoryModel.findByIdAndDelete(id)
			return res.json({ status: 200 })
		} catch (error) {
			next(error)
		}
	}
}

module.exports = new CategoryController()
