const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');
const { authRequired } = require('../middlewares/authMiddleware');

router.post('/login', AuthController.login);
router.post('/cadastro', AuthController.cadastro);
router.get('/usuario', authRequired, AuthController.getMe);

module.exports = router;
