const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profile_controller');
const householdController = require('../controllers/household_controller');

// router.get('/', profileController.getProfilePage);

router.get('/', householdController.getUserAddresPage);

module.exports = router;