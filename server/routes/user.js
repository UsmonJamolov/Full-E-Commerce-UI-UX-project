const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = require('express').Router();

// 🔒 Protected routes
router.get('/products', authMiddleware, userController.getProducts);
router.get('/product/:id', authMiddleware, userController.getProduct);

module.exports = router;