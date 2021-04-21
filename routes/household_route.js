const express = require('express');
const router = express.Router();
const authController = require('../controllers/authentication_controller');
const householdController = require('../controllers/household_controller');

// get the homepage for households

router.get("/", householdController.getHome);

// get all households

router.get("/getall", householdController.getAllHouseholds);

// get all household for user

router.get("/households", householdController.getAllHouseholdPerUser);

// create household

router.post("/", householdController.createHousehold);

module.exports = router;