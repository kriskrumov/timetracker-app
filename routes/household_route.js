const express = require('express');
const router = express.Router();
const authController = require('../controllers/authentication_controller');
const householdController = require('../controllers/household_controller');

router.get("/", householdController.getHome)

// NE bachka
router.get("/", authController.logout)

router.post("/", householdController.createHousehold)

module.exports = router;