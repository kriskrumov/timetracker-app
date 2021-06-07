const express = require('express');
const router = express.Router();
const householdController = require('../controllers/household_controller');

// get profile page for a user

router.get('/', householdController.getUserAddresPage);

module.exports = router;