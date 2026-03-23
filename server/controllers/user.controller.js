const productModel = require('../models/product.model')
const userModel = require('../models/user.model')
const bcrypt = require('bcrypt')

class UserController {
    async getProducts(req, res, next) {
        try {
            const products = await productModel.find()
            return res.json(products)
        } catch (error) {
            next(error)
        }
    }
    async getProduct(req, res, next) {
        try {
            product = await productModel.findById(req.params.id)
            return res.json(product)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new UserController()