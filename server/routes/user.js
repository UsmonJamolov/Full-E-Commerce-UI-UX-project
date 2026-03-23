const userController = require('../controllers/user.controller')

const router = require('express').Router()

router.get('/products', userController.getProducts)
router.get('/product/:id', userController.getProduct)

module.exports = router