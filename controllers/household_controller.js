const Household = require('../models/household')
const Activity = require('../models/activity')
const mongoose = require('mongoose');
const User = require('../models/user');
const { response } = require('express');

// Gets the homepage for the currently logged in user

exports.getHome = (req,res) => {
    const currentUserID = req.user._id;
    console.log("current user ID: ", currentUserID)
    Household.find({userID : {$ne : currentUserID}} , function(err, houseHold){
        if(err){
            console.log(err);
        } else {
            res.render("home", {currentUser: req.user, households: houseHold});
            console.log("household: ",houseHold);
        }
    })
}

exports.joinHouseHold = (req,res) => {
    const currentAddress = req.params.id;
    const currentUser = req.user;
   // const currentUsername = req.user.username; 
    Household.findById(req.params.id).populate('userID')
     
     .exec(function(err, newUser){
         if(err){
             console.log("ADDDDDDDDDDRESA" + currentAddress)
             console.log("USERAAAAAAA" + currentUser._id)
            console.log("inasg hregshak: ", err)
         }  
        else{
            console.log('DURRENT USERBAE: ', currentUser.username);

            newUser.userID.push(currentUser._id), 
            newUser.username.push(currentUser.username)
            newUser.save();
            console.log("Idto na addresa " + currentAddress)
            console.log("Obekta " + newUser)
            console.log("Lognatiq user e " + currentUser)
        }
    });
}

exports.getUserAddresPage = (req,res) => {
    const currentUserId = req.user._id;
    const currentUser = req.user.address;
    Household.find({"userID" : currentUserId} , function(err, houseHold){
        if(err){
            console.log(err);
        } else {
            res.render("profile", {currentUser: req.user, usersHousehold: houseHold});
            console.log("household: ", houseHold);
        }
    })
}

exports.getAddressPage = (req, res) => {
    const household_id = req.params.id;
    Household.findById(household_id).exec(function(err, foundAddress){
        if(err){
            console.log(err);
        } else {
            var allActivities = [];
            Activity.find({'householdID': household_id})
            .select()
            .then(docs=>{
                const response = {
                    householdActivities: docs.map(doc=>{
                        const result = {
                        ActivityID: doc._id,
                        userID: doc.userID,
                        title: doc.title,
                        description: doc.description,
                        startDate: doc.startDate,
                        endDate: doc.endDate,
                        householdID: doc.householdID
                    }
                    allActivities.push(result);
                })
                }
                console.log('ALL HOUSEHOLD ACTIVITIES:   ', allActivities);
                return res.render("addresspage", {house: foundAddress, activities: allActivities});
            })
            .catch((err)=>{
                console.log('big problems: ', err)
            })
            console.log('ALL HOUSEHOLD ACTIVITIES:   ', response);
        }
    })
}

// creates a new household

exports.createHousehold = (req,res) => {
    const user = req.user;
    const currentUser = req.user._id;
    var household = new Household({
        _id: new mongoose.Types.ObjectId,
        address: req.body.address,
        city: req.body.city,
        postcode: req.body.postcode,
        userID: currentUser,
        username: req.user.username
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
            userID: doc.userID,
            username: req.user.username
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
        res.render("home", {allHouses: doc})
        res.send(notexistinghouseholds);
    })
    .catch((err)=>{
        if(err){
            console.log('error message: ', err)
            return console.log('couldnt get all household per user with ID: ', currentUser)
        }
    })
}

exports.getActivityPage = (req, res) => {
    const address = req.params.id;
    const currentUser = req.user;
    return res.render("activity", {user: currentUser, house: address});
}

exports.createActivity = (req, res) => {
    const user = req.user;
    const house = req.params.id;
    const currentUser = req.user._id;
    var activity = new Activity({
        _id: new mongoose.Types.ObjectId,
        title: req.body.title,
        description: req.body.description,
        startDate: new Date().toString(),
        endDate: req.body.enddate,
        userID: currentUser,
        householdID: house
    })

    console.log("HHOUSE: " + house)
    console.log("USERAA: " + user)
    console.log('debugging the object: ', JSON.stringify(activity))

    activity
    .save()
    .then(doc=>{
        const result = {
            ID: doc._id,
            title: doc.title,
            description: doc.description,
            startDate: doc.startDate,
            userID: doc.userID,
            householdID: doc.householdID
        }
        return res.redirect("/home")
    })
    .catch((err)=>{
        if(err){
            return console.log('activity couldnt be added. Error message: ', err)
        }
    })
    
}