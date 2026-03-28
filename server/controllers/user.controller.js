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

    async getMe(req, res, next) {
        try {
            const token = req.cookies.token;

            if (!token) {
                return res.json({ user: null });
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            const user = await userModel.findById(decoded.id).select("-password"); // ✅ userModel

            console.log('User kelishi kerak', user);
            

            return res.json({ user });

        } catch (error) {
            next(error)
        }
    }
}

module.exports = new UserController();