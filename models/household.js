const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const HouseholdSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    address: [{type: String, required: true}],
    city: [{type: String, required: true}],
    postcode: [{type: String, required: true}],
    userID: [{type:mongoose.Schema.Types.ObjectId , ref : 'User'}],
    username: [String],
    activities:[{type:mongoose.Schema.Types.ObjectId , ref: "activity" }]
    
    // userID: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User'
    // }
});

module.exports = mongoose.model('household', HouseholdSchema);