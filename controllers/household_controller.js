const Household = require('../models/household')
const mongoose = require('mongoose');

// Gets the homepage with the adress for the currentUser
exports.getHome = (req,res) => {
    console.log(req.user._id)
    const currentUser = req.user._id;
    Household.find({'userID' : req.user._id}, function(err, houseHold){
        if(err){
            console.log(err);
        } else {
            res.render("home", {currentUser: req.user, households: houseHold});
            console.log(houseHold)
            console.log("1")
        }
    })
}

exports.createHousehold = (req,res) => {
    const currentUser = req.user._id;
    var household = new Household({
        _id: new mongoose.Types.ObjectId,
        address: req.body.address,
        userID: currentUser
    })

    console.log('debugging the object', JSON.stringify(household))

    household
    .save()
    .then(doc=>{
        const result = {
            ID: doc._id,
            address: doc.address,
            userID: doc.userID
        }
        
        return console.log('successfully created! Result: ',result)
    })
    .catch((err)=>{
        if(err){
            return console.log('address couldnt be added. Error message: ', err)
        }
    })
}