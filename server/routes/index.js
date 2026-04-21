const adminMiddleware = require('../middlewares/admin.middleware');
const router = require("express").Router();

router.use('/auth', require('./auth'));
router.use('/otp', require('./otp'));
router.use('/user', require('./user'));
router.use('/admin', adminMiddleware, require('./admin'))
router.use("/files", require('./file'));

module.exports = router;