// libraries and constants

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

// get EJS addresspage (household)

router.get("/:id", householdController.getAddressPage);

// join a household 

router.post('/:id', householdController.joinHouseHold);

// get activities for a household

router.get('/:id/activities', householdController.getActivityPage);

// create activity for household

router.post('/:id/activities', householdController.createActivity);

// delete a household (in production)

router.delete('/:id/', householdController.deleteActivity);

module.exports = router;