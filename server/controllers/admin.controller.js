const userModel = require('../models/user.model')
const productModel = require('../models/product.model')
const favoriteModel = require('../models/favorite.model')
const { DeleteObjectCommand } = require('@aws-sdk/client-s3')
const s3 = require('../config/s3') // agar alohida qilgan bo‘lsang

class AdminController {
	constructor() {
		this.userId = '69d53fdf1e5d45e09fa5d295'
		this.createProduct = this.createProduct.bind(this)
		this.updateProduct = this.updateProduct.bind(this)
		this.deleteProduct = this.deleteProduct.bind(this)
		this.getProducts = this.getProducts.bind(this)
		this.getProductReviews = this.getProductReviews.bind(this)
		this.updateProductReview = this.updateProductReview.bind(this)
		this.deleteProductReview = this.deleteProductReview.bind(this)
	}
	// [GET] /admin/products
	async getProducts(req, res, next) {
		try {
			const { searchQuery, filter, category, targetGroup, page, pageSize } = req.query
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
			if (targetGroup) query.targetGroup = targetGroup

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
			
			const newProduct = await productModel.create({
				...data,
				isNew: typeof data.isNew === 'boolean' ? data.isNew : true,
			})
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
		await favoriteModel.deleteMany({ product: id })
		await userModel.updateMany({ favorites: id }, { $pull: { favorites: id } })

		return res.json({ success: 'Product deleted successfully' })

	} catch (error) {
		next(error)
	}
	}

	// [GET] /admin/product-reviews
	async getProductReviews(req, res, next) {
		try {
			const products = await productModel.find({ 'reviews.0': { $exists: true } }).select('title reviews')
			const reviews = []
			products.forEach(product => {
				product.reviews.forEach(review => {
					reviews.push({
						productId: product._id,
						productTitle: product.title,
						reviewId: review._id,
						userName: review.userName,
						rating: review.rating,
						comment: review.comment,
						adminReply: review.adminReply || '',
						createdAt: review.createdAt,
					})
				})
			})
			return res.json({ reviews })
		} catch (error) {
			next(error)
		}
	}

	// [PUT] /admin/product-reviews/:productId/:reviewId
	async updateProductReview(req, res, next) {
		try {
			const { productId, reviewId } = req.params
			const { comment, rating, adminReply } = req.body
			const product = await productModel.findById(productId)
			if (!product) return res.json({ failure: 'Product not found' })
			const review = product.reviews.id(reviewId)
			if (!review) return res.json({ failure: 'Review not found' })

			if (typeof comment === 'string') review.comment = comment.trim() || review.comment
			if (typeof adminReply === 'string') review.adminReply = adminReply.trim()
			if (rating) {
				const parsed = Number(rating)
				if (parsed >= 1 && parsed <= 5) review.rating = parsed
			}

			const totalRating = product.reviews.reduce((sum, item) => sum + item.rating, 0)
			product.reviewCount = product.reviews.length
			product.ratingAverage = product.reviewCount ? Number((totalRating / product.reviewCount).toFixed(1)) : 0

			await product.save()
			return res.json({ status: 200 })
		} catch (error) {
			next(error)
		}
	}

	// [DELETE] /admin/product-reviews/:productId/:reviewId
	async deleteProductReview(req, res, next) {
		try {
			const { productId, reviewId } = req.params
			const product = await productModel.findById(productId)
			if (!product) return res.json({ failure: 'Product not found' })
			const review = product.reviews.id(reviewId)
			if (!review) return res.json({ failure: 'Review not found' })

			review.deleteOne()
			const totalRating = product.reviews.reduce((sum, item) => sum + item.rating, 0)
			product.reviewCount = product.reviews.length
			product.ratingAverage = product.reviewCount ? Number((totalRating / product.reviewCount).toFixed(1)) : 0

			await product.save()
			return res.json({ status: 200 })
		} catch (error) {
			next(error)
		}
	}
}

module.exports = new AdminController()