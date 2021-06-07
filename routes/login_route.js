const express = require('express');
const router = express.Router();
const authController = require('../controllers/authentication_controller');

// get EJS login page

router.get('/', authController.getLoginPage);

// post request for login

router.post('/', authController.login);

module.exports = router;