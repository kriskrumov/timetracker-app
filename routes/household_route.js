const express = require('express');
const router = express.Router();
const authController = require('../controllers/authentication_controller');
const householdController = require('../controllers/household_controller');
const Household = require('../models/household')

// get the homepage for households

router.get("/", householdController.getHome);

// get all households

router.get("/getall", householdController.getAllHouseholds);

// get all household for user

router.get("/households", householdController.getAllHouseholdsPerUser);

// get all households a user is NOT a part of

router.get('/nehouseholds', householdController.getAllNEHouseholdsPerUser);


// create household

router.post("/", householdController.createHousehold);

router.get("/:id", householdController.getAddressPage)

module.exports = router;