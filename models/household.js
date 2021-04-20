const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const HouseholdSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    address: String,
    city: String,
    postcode: String,
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('household', HouseholdSchema);