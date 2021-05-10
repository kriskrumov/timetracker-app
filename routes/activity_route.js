const express = require('express');
const router = express.Router({mergeParams: true});
const householdController = require('../controllers/household_controller');

router.get('/:id/activities', householdController.getActivityPage);

router.post('/:id', householdController.createActivity);

module.exports = router;