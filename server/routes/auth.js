const authController = require('../controllers/auth.controller')

const router = require('express').Router()

router.post('/login', authController.login)
/** register / register-admin ichida this.registerWithRole — Express alohida chaqirganda this yo‘qoladi */
router.post('/register', authController.register.bind(authController))
router.post('/register-admin', authController.registerAdmin.bind(authController))

module.exports = router