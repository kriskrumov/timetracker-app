const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    description: String,
    startDate: String,
    endDate: String,
    userID: [{type:mongoose.Schema.Types.ObjectId , ref : 'User'}],
    householdID: {type:mongoose.Schema.Types.ObjectId , ref : 'household'},
    
    // userID: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User'
    // }
});

module.exports = mongoose.model('activity', ActivitySchema);