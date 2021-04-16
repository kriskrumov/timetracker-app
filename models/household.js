const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const HouseholdSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    address: String
});

module.exports = mongoose.Model('Household', HouseholdSchema);