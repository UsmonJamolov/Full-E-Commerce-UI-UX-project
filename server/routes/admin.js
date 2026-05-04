const adminController = require('../controllers/admin.controller')
const categoryController = require('../controllers/category.controller')
const purchaseController = require('../controllers/purchase.controller')
const buyNowController = require('../controllers/buy-now.controller')
const newArrivalController = require('../controllers/new-arrival.controller')
const headerSettingsController = require('../controllers/header-settings.controller')
const footerSettingsController = require('../controllers/footer-settings.controller')
const homeSliderSettingsController = require('../controllers/home-slider-settings.controller')

const router = require('express').Router()

router.get('/categories', categoryController.getCategories)
router.post('/categories', categoryController.createCategory)
router.put('/categories/:id', categoryController.updateCategory)
router.delete('/categories/:id', categoryController.deleteCategory)

router.get('/products', adminController.getProducts)
router.post('/create-product', adminController.createProduct)
router.put('/update-product/:id', adminController.updateProduct)
router.delete('/delete-product/:id', adminController.deleteProduct)
router.get('/product-reviews', adminController.getProductReviews)
router.put('/product-reviews/:productId/:reviewId', adminController.updateProductReview)
router.delete('/product-reviews/:productId/:reviewId', adminController.deleteProductReview)

router.get('/purchase-items', purchaseController.getPurchaseItems)
router.post('/purchase-items', purchaseController.createPurchaseItem)
router.patch('/purchase-items/:id/approve', purchaseController.approvePurchaseItem)
router.put('/purchase-items/:id', purchaseController.updatePurchaseItem)
router.delete('/purchase-items/:id', purchaseController.deletePurchaseItem)
router.get('/buy-now-settings', buyNowController.getSettings)
router.put('/buy-now-settings', buyNowController.updateSettings)

router.get('/new-arrival', newArrivalController.getSettings)
router.put('/new-arrival', newArrivalController.updateSettings)

router.get('/header-settings', headerSettingsController.getSettings)
router.put('/header-settings', headerSettingsController.updateSettings)
router.get('/footer-settings', footerSettingsController.getSettings)
router.put('/footer-settings', footerSettingsController.updateSettings)
router.get('/home-slider-settings', homeSliderSettingsController.getSettings)
router.put('/home-slider-settings', homeSliderSettingsController.updateSettings)

module.exports = router