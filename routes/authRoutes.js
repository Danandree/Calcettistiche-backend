const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { checkJwtCookie } = require('../middleware/authMiddleware');

router.post('/login', authController.login_user);
router.post('/signup', authController.signup_user);
router.post('/logout', checkJwtCookie, authController.logout_user);

module.exports = router;