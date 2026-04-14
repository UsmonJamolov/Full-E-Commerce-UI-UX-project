const userModel = require('../models/user.model')
const productModel = require('../models/product.model')

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
			const products = await productModel.find()
			return res.json({ products })
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
			const userId = this.userId
			const user = await userModel.findById(userId)
			if (!user) return res.json({ failure: 'User not found' })
			if (user.role !== 'admin') return res.json({ failure: 'User is not admin' })
			const updatedProduct = await productModel.findByIdAndUpdate(id, data)
			if (!updatedProduct) return res.json({ failure: 'Failed while updating product' })
			return res.json({ success: 'Product updated successfully' })
		} catch (error) {
			next(error)
		}
	}
	// [DELETE] /admin/delete-product/:id
	async deleteProduct(req, res, next) {
		try {
			const { id } = req.params
			const userId = this.userId
			const user = await userModel.findById(userId)
			if (!user) return res.json({ failure: 'User not found' })
			if (user.role !== 'admin') return res.json({ failure: 'User is not admin' })
			const deletedProduct = await productModel.findByIdAndDelete(id)
			if (!deletedProduct) return res.json({ failure: 'Failed while deleting product' })
			return res.json({ success: 'Product deleted successfully' })
		} catch (error) {
			next(error)
		}
	}
}

module.exports = new AdminController()