const express = require('express');
const router = express.Router();
const authController = require('../controllers/authentication_controller')

router.get('/register', authController.getRegisterPage);

router.post('/register', authController.register);

router.get('/login', authController.getLoginPage);

router.post('/login', authController.login);



module.exports = router;