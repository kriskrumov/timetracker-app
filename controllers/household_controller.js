const Household = require('../models/household')
const mongoose = require('mongoose');

// Gets the homepage for the currently logged in user

exports.getHome = (req,res) => {
    console.log("current user ID: ", req.user._id)
    const currentUser = req.user._id;
    Household.find({'userID' : req.user._id}, function(err, houseHold){
        if(err){
            console.log(err);
        } else {
            res.render("home", {currentUser: req.user, households: houseHold});
            console.log("household: ",houseHold);
        }
    })
    Household.find('households address city postcode')
    .then(docs=>{
        const response = {
            
        }
    })
}

// creates a new household

exports.createHousehold = (req,res) => {
    const currentUser = req.user._id;
    var household = new Household({
        _id: new mongoose.Types.ObjectId,
        address: req.body.address,
        city: req.body.city,
        postcode: req.body.postcode,
        userID: currentUser
    })

    console.log('debugging the object', JSON.stringify(household))

    household
    .save()
    .then(doc=>{
        const result = {
            ID: doc._id,
            address: doc.address,
            city: doc.city,
            postcode: doc.postcode,
            userID: doc.userID
        }
        
        return res.redirect("/home")
        
    })
    .catch((err)=>{
        if(err){
            return console.log('address couldnt be added. Error message: ', err)
        }
    })
}

// gets all households

exports.getAllHouseholds = (req,res)=>{
    const currentUser = req.user._id;
    Household.find()
    .select('households address city postcode')
    .then(docs=>{
        const response = {
            households: docs.map(doc=>{ 
                const household = {
                    address: doc.address,
                    city: doc.city,
                    postcode: doc.postcode
                }
                console.log('HOUSEHOOOOLD: ', household)
            })
        }
        return res.redirect("/home")
    })
    .catch((err)=>{
        if(err){
            return console.log('addresses couldnt be loaded. Error message: ', err)
        }
    })
}

// get all households per user

exports.getAllHouseholdPerUser = (req,res) =>{
    const currentUser = req.user._id;
    Household.find({'userID': currentUser}) 
    .select()
    .then(docs=>{
        console.log("Currently logged user ID: ", currentUser)
        const response = {
            housholds: docs.map(doc=>{
                const result = {
                    HouseholdID: doc._id,
                    address: doc.address,
                    city: doc.city,
                    postcode: doc.postcode,
                    userID: doc.userID
                }
                console.log('households per user with id: ',currentUser, ' household data: ' , result);
            })
        }
        return res.redirect('/profile')
    })
    .catch((err)=>{
        if(err){
            console.log('error message: ', err)
            return console.log('couldnt get all household per user with ID: ', currentUser)
        }
    })
}