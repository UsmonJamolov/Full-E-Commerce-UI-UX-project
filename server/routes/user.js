const userController = require('../controllers/user.controller');
const buyNowController = require('../controllers/buy-now.controller')
const newArrivalController = require('../controllers/new-arrival.controller')
const headerSettingsController = require('../controllers/header-settings.controller')
const footerSettingsController = require('../controllers/footer-settings.controller')
const userMiddleware = require('../middlewares/user.middleware');

const router = require('express').Router();

// 🔒 Protected routes
router.get('/products', userController.getProducts);
router.get('/product/:id',  userController.getProduct);
router.get('/profile/:id', userController.getProfile)
// router.get('/orders', userController.getOrders)
// router.get('/transactions', userController.getTransactions)
router.get('/favorites', userMiddleware, userController.getFavorites)
router.get('/statistics', userMiddleware, userController.getStatistics)
router.get('/buy-now-settings', buyNowController.getSettings)
router.get('/new-arrival', newArrivalController.getSettings)
router.get('/header-settings', headerSettingsController.getSettings)
router.get('/footer-settings', footerSettingsController.getSettings)

router.post('/add-favorite', userMiddleware, userController.addFavorite)
router.post('/product/:id/review', userMiddleware, userController.addProductReview)

router.put('/update-profile', userMiddleware, userController.updateProfile)
router.put('/update-password', userMiddleware, userController.updatePassword)

router.delete('/delete-favorite/:id', userMiddleware, userController.deleteFavorite)

module.exports = router;