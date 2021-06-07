const express = require('express');
const router = express.Router();
const authController = require('../controllers/authentication_controller');

// get request for logging out a user

router.get('/', authController.logout);

module.exports = router;