// libraries and constants

const Household = require('../models/household')
const Activity = require('../models/activity')
const mongoose = require('mongoose');

// Gets the homepage for the currently logged in user

exports.getHome = (req,res) => {
    const currentUserID = req.user._id;
    Household.find({userID : {$ne : currentUserID}} , function(err, houseHold){
        if(err){
            console.log(err);
        } else {
            res.render("home", {currentUser: req.user, households: houseHold});
        }
    })
}

// A user joins a household (create/post request)

exports.joinHouseHold = (req,res) => {
    const currentAddress = req.params.id;
    const currentUser = req.user;
    Household.findById(req.params.id).populate('userID')
     
     .exec(function(err, newUser){
         if(err){
            console.log("you have an error, Log: ", err)
         }  
        else{
            newUser.userID.push(currentUser._id), 
            newUser.username.push(currentUser.username)
            newUser.save();
        }
    });
}

// get EJS addresspage (household)

exports.getUserAddresPage = (req,res) => {
    const currentUserId = req.user._id;
    Household.find({"userID" : currentUserId} , function(err, houseHold){
        if(err){
            console.log("Error while loading the addressPage (household). Log: ", err);
        } else {
            res.render("profile", {currentUser: req.user, usersHousehold: houseHold});
        }
    })
}

// get EJS household page, display all activities for that particular household

exports.getAddressPage = (req, res) => {
    const household_id = req.params.id;
    Household.findById(household_id).exec(function(err, foundAddress){
        if(err){
            console.log('Error finding a household on specified ID. Log: ', err);
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
                return res.render("addresspage", {house: foundAddress, activities: allActivities});
            })
            .catch((err)=>{
                console.log('Error fetching activities for household. Log: ', err)
            })
        }
    })
}

// creates a new household

exports.createHousehold = (req,res) => {
    const user = req.user;
    const errors = req.flash().error || [];
    const currentUser = req.user._id;
    var household = new Household({
        _id: new mongoose.Types.ObjectId,
        address: req.body.address,
        city: req.body.city,
        postcode: req.body.postcode,
        userID: currentUser,
        username: req.user.username
    })

    // save household to Mongo

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
            return console.log('Address couldnt be added. Error message: ', err)
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
            })
        }
    })
    .catch((err)=>{
        if(err){
            return console.log('Addresses couldnt be loaded. Error message: ', err)
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
        const response = {
            NEhouseholds: docs.map(doc=>{
                const result = {
                    HouseholdID: doc._id,
                    address: doc.address,
                    city: doc.city,
                    postcode: doc.postcode,
                    userID: doc.userID
                }
            })
        }
        return res.redirect('/profile')
    })
    .catch((err)=>{
        if(err){
            console.log('Error getting all household for user. Log: ', err)
        }
    })
}

// get all households the logged in user is NOT a part of

exports.getAllNEHouseholdsPerUser = (req,res) =>{
    const currentUser = req.user;
    Household.find({'userID': {$ne: currentUser._id}}) 
    .select()
    .then(docs=>{
        var notexistinghouseholds = [];
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
            })
        }
        res.render("home", {allHouses: doc})
        res.send(notexistinghouseholds);
    })
    .catch((err)=>{
        if(err){
            console.log('Error getting all households a user is NOT a part of. Log: ', err)
        }
    })
}

// get EJS create activity page

exports.getActivityPage = (req, res) => {
    const address = req.params.id;
    const currentUser = req.user;
    return res.render("activity", {user: currentUser, house: address});
}

// create an activity for a household

exports.createActivity = (req, res) => {
    const user = req.user;
    const house = req.params.id;
    const currentUser = req.user._id;
    var activity = new Activity({
        _id: new mongoose.Types.ObjectId,
        title: req.body.title,
        description: req.body.description,
        startDate: new Date().toISOString().replace('T',' ').replace('Z', '').replace(/(.*)\D\d+/, '$1').replace(/(.*)\D\d+/, '$1'),
        endDate: req.body.enddate.replace('T', ' '),
        userID: currentUser,
        householdID: house
    })
    if(activity.title === '' || activity.endDate === ''){
        console.log('Cannot create activity. Missing data')
    }
    else{
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
            return res.redirect("/profile")
        })
        .catch((err)=>{
            if(err){
                return console.log('Activity couldnt be created. Error message: ', err)
            }
        })
    }
}

// delete and activity (in production)

exports.deleteActivity = (req,res) =>{
    var activityID = req.body.ActivityID
    Activity.findByIdAndRemove(activityID, (err)=>{
        if(err){
            console.log('Oops could not delete activity. Error: ', err)
        }
        else{
            console.log('Deleted actiity wth id: ', activityID);
            return res.redirect('/home');
        }
    })
}