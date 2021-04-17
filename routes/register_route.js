const express = require('express');
const router = express.Router();
const authController = require('../controllers/authentication_controller');

router.get('/', authController.getRegisterPage);

router.post('/', authController.register);

module.exports = router;