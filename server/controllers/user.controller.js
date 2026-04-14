const productModel = require('../models/product.model');
const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // ✅ qo‘shildi

class UserController {
    
    async getProducts(req, res, next) {
        try {
            const products = await productModel.find();
            return res.json(products);
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
    
    // [GET] /user/profile/:id
	async getProfile(req, res, next) {
        try {
            const user = await userModel.findById(req.params.id).select('-password')
			return res.json({ user })
		} catch (error) {
            next(error)
		}
    }

    // [PUT] /user/update-profile
	async updateProfile(req, res, next) {
		try {
			const userId = '67420187ce7f12bf6ec22428'
			const user = await userModel.findById(userId)
			user.set(req.body)
			await user.save()
			return res.json(user)
		} catch (error) {
			next(error)
		}
	}

    // [PUT] /user/update-password
	async updatePassword(req, res, next) {
		try {
			const { oldPassword, newPassword } = req.body
			const userId = '67420187ce7f12bf6ec22428'
			const user = await userModel.findById(userId)

			const isPasswordMatch = await bcrypt.compare(oldPassword, user.password)
			if (!isPasswordMatch) return res.json({ failure: 'Old password is incorrect' })

			const hashedPassword = await bcrypt.hash(newPassword, 10)
			await userModel.findByIdAndUpdate(userId, { password: hashedPassword })
			res.json({ success: 'Password updated successfully' })
		} catch (error) {
			next(error)
		}
	}
}

module.exports = new UserController();