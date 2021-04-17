const express = require('express');
const router = express.Router();
const authController = require('../controllers/authentication_controller');

router.get('/', authController.getLoginPage);

router.post('/', authController.login);

module.exports = router;