const express = require('express');
const router = express.Router();
const authController = require('../controllers/authentication_controller');
const householdController = require('../controllers/household_controller');
const Household = require('../models/household')

router.get("/", householdController.getHome)

// NE bachka
router.get("/", authController.logout)

router.post("/", householdController.createHousehold)

router.get("/:id", householdController.getAddressPage)

module.exports = router;