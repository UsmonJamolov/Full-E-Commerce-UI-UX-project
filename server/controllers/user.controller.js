const productModel = require('../models/product.model');
const userModel = require('../models/user.model');
const { validateRegistrationPassword } = require('../utils/passwordPolicy');
const favoriteModel = require('../models/favorite.model');
const { migrateLegacyFavorites, getFavoriteProductIds } = require('../services/favorite.service');
const bcrypt = require('bcrypt');
const { isValidObjectId } = require('mongoose');

class UserController {
	constructor() {
		this.addProductReview = this.addProductReview.bind(this)
	}
    
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
            next(error);
        }
    }

    async getProduct(req, res, next) {
        try {
            const product = await productModel.findById(req.params.id); // ✅ const qo‘shildi
            return res.json(product);
        } catch (error) {
            next(error);
        }
    }

	// [GET] /user/favorites
	async getFavorites(req, res, next) {
		try {
			const currentUser = req.user
			const {searchQuery, filter, page, pageSize, category} = req.query
			const skipAmount = (page - 1) * pageSize

			const favoriteProductIds = await getFavoriteProductIds(currentUser._id)
			const matchQuery = { _id: { $in: favoriteProductIds } }

			if (searchQuery) {
				const escapedSearchQuery = searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
				matchQuery.$or = [{title: {$regex: new RegExp(escapedSearchQuery, 'i')}}]
			}

			if (category === 'All') matchQuery.category = {$exists: true}
			else if (category !== 'All') {
				if (category) matchQuery.category = category
			}

			let sortOptions = {}
			if (filter === 'newest') sortOptions = {createdAt: -1}
			else if (filter === 'oldest') sortOptions = {createdAt: 1}

			const products = await productModel.find(matchQuery).sort(sortOptions).skip(skipAmount).limit(+pageSize)

			const totalProducts = await productModel.countDocuments(matchQuery)
			const isNext = totalProducts > skipAmount + +products.length

			return res.json({products, isNext})
		} catch (error) {
			next(error)
		}
	}

	// [POST] /user/product/:id/review
	async addProductReview(req, res, next) {
		try {
			const { id } = req.params
			const { rating, comment } = req.body
			const product = await productModel.findById(id)
			if (!product) return res.json({ failure: 'Product not found' })

			const parsedRating = Number(rating)
			if (!parsedRating || parsedRating < 1 || parsedRating > 5) {
				return res.json({ failure: 'Rating 1 dan 5 gacha bo‘lishi kerak' })
			}
			if (!comment || !String(comment).trim()) {
				return res.json({ failure: 'Comment kiriting' })
			}

			const existed = product.reviews.find(item => String(item.user) === String(req.user._id))
			if (existed) {
				existed.rating = parsedRating
				existed.comment = String(comment).trim()
				existed.userName = req.user.name
			} else {
				product.reviews.push({
					user: req.user._id,
					userName: req.user.name,
					rating: parsedRating,
					comment: String(comment).trim(),
				})
			}

			const totalRating = product.reviews.reduce((sum, item) => sum + item.rating, 0)
			product.reviewCount = product.reviews.length
			product.ratingAverage = product.reviewCount ? Number((totalRating / product.reviewCount).toFixed(1)) : 0

			await product.save()
			return res.json({ status: 200, product })
		} catch (error) {
			next(error)
		}
	}
    
    // [GET] /user/profile/:id
	async getProfile(req, res, next) {
        try {
            const user = await userModel.findById(req.params.id).select('-password').lean()
			if (!user) return res.json({ user })
			user.favorites = await getFavoriteProductIds(user._id)
			return res.json({ user })
		} catch (error) {
            next(error)
		}
    }

	// [GET] /user/statistics
	async getStatistics(req, res, next) {
		try {
			const userId = req.user._id
			const user = await userModel.findById(userId)

			if (!user) return res.json({failure: 'User not found'})
			await migrateLegacyFavorites(userId)
			const totalFavorites = await favoriteModel.countDocuments({ user: userId })
			
			const statistics = {totalFavorites}
			return res.json({statistics})
		} catch (error) {
			next(error)
		}
	}

	// [POST] /user/add-favorite
	async addFavorite(req, res, next) {
		try {
			const {productId} = req.body
			const userId = req.user._id
			if (!isValidObjectId(productId)) return res.json({failure: 'Product not found'})
			const product = await productModel.findById(productId)
			if (!product) return res.json({failure: 'Product not found'})
			await migrateLegacyFavorites(userId)
			const isExist = await favoriteModel.exists({ user: userId, product: productId })
			if (isExist) return res.json({failure: 'Product already in favorites'})
			try {
				await favoriteModel.create({ user: userId, product: productId })
			} catch (err) {
				if (err && err.code === 11000) return res.json({ failure: 'Product already in favorites' })
				throw err
			}
			return res.json({status: 200})
		} catch (error) {
			next(error)
		}
	}

    // [PUT] /user/update-profile
	async updateProfile(req, res, next) {
		try {
			const userId = req.user._id
			const user = await userModel.findById(userId)
			if (!user) return res.json({ failure: 'User nto found' })

			const $set = {}
			const $unset = {}

			if (req.body.fullName !== undefined) {
				const n = String(req.body.fullName || '').trim()
				if (n.length >= 2) $set.name = n
			}

			if (req.body.email !== undefined) {
				const raw = String(req.body.email || '').trim().toLowerCase()
				if (raw === '') {
					$unset.email = ''
				} else {
					const exists = await userModel.findOne({ email: raw, _id: { $ne: userId } })
					if (exists) return res.json({ failure: 'Bu email band' })
					$set.email = raw
				}
			}

			const updateDoc = {}
			if (Object.keys($set).length) updateDoc.$set = $set
			if (Object.keys($unset).length) updateDoc.$unset = $unset

			if (!Object.keys(updateDoc).length) {
				return res.json({ status: 200 })
			}

			try {
				await userModel.findByIdAndUpdate(userId, updateDoc)
			} catch (err) {
				if (err && err.code === 11000) {
					return res.json({ failure: 'Bu email band' })
				}
				throw err
			}
			return res.json({ status: 200 })
		} catch (error) {
			next(error)
		}
	}

    // [PUT] /user/update-password
	async updatePassword(req, res, next) {
		try {
			const { oldPassword, newPassword } = req.body
			const userId = req.user._id
			const user = await userModel.findById(userId)
			if (!user) return res.json({failure: 'User not found'})

			const isPasswordMatch = await bcrypt.compare(oldPassword, user.password)
			if (!isPasswordMatch) return res.json({ failure: 'Old password is incorrect' })

			const pwdCheck = validateRegistrationPassword(newPassword)
			if (!pwdCheck.ok) return res.json({ failure: pwdCheck.message })

			const hashedPassword = await bcrypt.hash(newPassword, 10)
			await userModel.findByIdAndUpdate(userId, { password: hashedPassword })

			res.json({ status: 200 })
		} catch (error) {
			next(error)
		}
	}

	// [DELETE] /user/delete-favorite/:id
	async deleteFavorite(req, res, next) {
		try {
			const { id } = req.params
			const userId = req.user._id
			await migrateLegacyFavorites(userId)
			await favoriteModel.deleteOne({ user: userId, product: id })
			await userModel.updateOne({ _id: userId }, { $pull: { favorites: id } })
			return res.json({ status: 200 })
		} catch (error) {
			next(error)
		}
	}
}

module.exports = new UserController();