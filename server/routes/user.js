const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = require('express').Router();

// 🔒 Protected routes
router.get('/products', authMiddleware, userController.getProducts);
router.get('/product/:id', authMiddleware, userController.getProduct);
router.get('/profile/:id', userController.getProfile)
// router.get('/orders', userController.getOrders)
// router.get('/transactions', userController.getTransactions)
// router.get('/favorites', userController.getFavorites)
// router.get('/statistics', userController.getStatistics)

// router.post('/add-favorite', userController.addFavorite)

// router.put('/update-profile', userController.updateProfile)
// router.put('/update-password', userController.updatePassword)

// router.delete('/delete-favorite/:id', userController.deleteFavorite)

module.exports = router;