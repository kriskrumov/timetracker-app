const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: [{type: String, required: true}],
    description: String,
    startDate: String,
    endDate: [{type: String, required: true}],
    userID: [{type:mongoose.Schema.Types.ObjectId , ref : 'User'}],
    householdID: {type:mongoose.Schema.Types.ObjectId , ref : 'household'},
});

module.exports = mongoose.model('activity', ActivitySchema);