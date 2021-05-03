const Household = require('../models/household')
const mongoose = require('mongoose');
const User = require('../models/user');

// Gets the homepage for the currently logged in user

exports.getHome = (req,res) => {
    const currentUserID = req.user._id;
    console.log("current user ID: ", currentUserID)
    Household.find({'userID' : currentUserID}, function(err, houseHold){
        if(err){
            console.log(err);
        } else {
            res.render("home", {currentUser: req.user, households: houseHold});
            console.log("household: ",houseHold);
        }
    })
}

exports.getAddressPage = (req, res) => {
    Household.findById(req.params.id).exec(function(err, foundAddress){
        if(err){
            console.log(err);
        } else {
            console.log(foundAddress)
            // res.send(req.params.id)
            res.render("addresspage", {house: foundAddress});
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

// get all households a user created

exports.getAllHouseholdsPerUser = (req,res) =>{
    const currentUser = req.user;
    console.log('current user')
    Household.find({'userID': currentUser._id}) 
    .select()
    .then(docs=>{
        console.log("Currently logged user ID: ", currentUser._id)
        const response = {
            NEhouseholds: docs.map(doc=>{
                const result = {
                    HouseholdID: doc._id,
                    address: doc.address,
                    city: doc.city,
                    postcode: doc.postcode,
                    userID: doc.userID
                }
                console.log('household data which '+currentUser.username+' is NOT a part of: ' , result);
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

// get all households the logged in user is NOT a part of

exports.getAllNEHouseholdsPerUser = (req,res) =>{
    const currentUser = req.user;
    console.log('current user')
    Household.find({'userID': {$ne: currentUser._id}}) 
    .select()
    .then(docs=>{
        var notexistinghouseholds = [];
        console.log("Currently logged user ID: ", currentUser._id)
        const response = {
            NEhouseholds: docs.map(doc=>{
                const result = {
                    HouseholdID: doc._id,
                    address: doc.address,
                    city: doc.city,
                    postcode: doc.postcode,
                    userID: doc.userID
                }
                notexistinghouseholds.push(result);
                console.log('household data which '+currentUser.username+' is NOT a part of: ' , result);
            })
        }
        res.send(notexistinghouseholds);
    })
    .catch((err)=>{
        if(err){
            console.log('error message: ', err)
            return console.log('couldnt get all household per user with ID: ', currentUser)
        }
    })
}