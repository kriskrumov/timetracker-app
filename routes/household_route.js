const express = require('express');
const router = express.Router();
const authController = require('../controllers/authentication_controller');

router.get("/", authController.getHome)

// NE bachka
router.get("/", authController.logout)

module.exports = router;