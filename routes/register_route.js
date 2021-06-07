const express = require('express');
const router = express.Router();
const authController = require('../controllers/authentication_controller');

// get EJS registerpage 

router.get('/', authController.getRegisterPage);

// create a user

router.post('/', authController.register);

module.exports = router;