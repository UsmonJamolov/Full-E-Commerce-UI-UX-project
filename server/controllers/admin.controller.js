const userModel = require('../models/user.model')
const productModel = require('../models/product.model')
const { DeleteObjectCommand } = require('@aws-sdk/client-s3')
const s3 = require('../config/s3') // agar alohida qilgan bo‘lsang

class AdminController {
	constructor() {
		this.userId = '69d53fdf1e5d45e09fa5d295'
		this.createProduct = this.createProduct.bind(this)
		this.updateProduct = this.updateProduct.bind(this)
		this.deleteProduct = this.deleteProduct.bind(this)
		this.getProducts = this.getProducts.bind(this)
	}
	// [GET] /admin/products
	async getProducts(req, res, next) {
		try {
			const { searchQuery, filter, category, page, pageSize } = req.query
			const skipAmount = (+page - 1) * +pageSize
			const query = {}

			if (searchQuery) {
				const escapedSearchQuery = searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
				query.$or = [{ title: { $regex: new RegExp(escapedSearchQuery, 'i') } }]
			}

			if (category === 'All') query.category = { $exists: true }
			else if (category !== 'All') {
				if (category) query.category = category
			}

			let sortOptions = { createdAt: -1 }
			if (filter === 'newest') sortOptions = { createdAt: -1 }
			else if (filter === 'oldest') sortOptions = { createdAt: 1 }

			const products = await productModel.find(query).sort(sortOptions).skip(skipAmount).limit(+pageSize)

			const totalProducts = await productModel.countDocuments(query)
			const isNext = totalProducts > skipAmount + +products.length

			return res.json({ products, isNext })
		} catch (error) {
			next(error)
		}
	}
	// [POST] /admin/create-product
	async createProduct(req, res, next) {
		try {
			const data = req.body

			console.log("REQ BODY:", req.body)
			
			const newProduct = await productModel.create(data)
			if (!newProduct) return res.json({ failure: 'Failed while creating product' })
			return res.json({ status: 201, product: newProduct })
		} catch (error) {
			next(error)
		}
	}
	// [PUT] /admin/update-product/:id
	async updateProduct(req, res, next) {
		try {
			const data = req.body
			const { id } = req.params
			
			const updatedProduct = await productModel.findByIdAndUpdate(id, data)
			if (!updatedProduct) return res.json({ failure: 'Failed while updating product' })
			return res.json({ status: 200 })
		} catch (error) {
			next(error)
		}
	}
	// [DELETE] /admin/delete-product/:id
	// async deleteProduct(req, res, next) {
	// 	try {
	// 		const { id } = req.params
	// 		const userId = this.userId
	// 		const user = await userModel.findById(userId)
	// 		if (!user) return res.json({ failure: 'User not found' })
	// 		if (user.role !== 'admin') return res.json({ failure: 'User is not admin' })
	// 		const deletedProduct = await productModel.findByIdAndDelete(id)
	// 		if (!deletedProduct) return res.json({ failure: 'Failed while deleting product' })
	// 		return res.json({ success: 'Product deleted successfully' })
	// 	} catch (error) {
	// 		next(error)
	// 	}
	// }

	async deleteProduct(req, res, next) {
	try {
		const { id } = req.params

		const product = await productModel.findById(id)

		if (!product) {
		return res.json({ failure: "Product not found" })
		}

		let key = product.image

		console.log("RAW KEY:", key)

		// URL → KEY ga o‘tkazamiz
		try {
		if (key.startsWith("http")) {
		const url = new URL(key)
		const parts = url.pathname.split("/")

		// ["", "e-commerce", "uploads", "file.webp"]
		key = parts.slice(2).join("/") 
		}
		} catch (err) {
		console.error("URL PARSE ERROR:", err)
		}

		console.log("FINAL KEY:", key)

		try {
		await s3.send(
			new DeleteObjectCommand({
			Bucket: process.env.S3_BUCKET_NAME,
			Key: key,
			})
		)

		console.log("✅ S3 deleted:", key)
		} catch (err) {
		console.error("❌ S3 DELETE ERROR:", err)
		}

		// 🔥 KEYIN DB
		await productModel.findByIdAndDelete(id)

		return res.json({ success: 'Product deleted successfully' })

	} catch (error) {
		next(error)
	}
	}
}

module.exports = new AdminController()