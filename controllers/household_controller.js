const Household = require('../models/household')
const mongoose = require('mongoose');

exports.getHome = (req,res) => {
    res.render("home");
}

exports.createHousehold = (req,res) => {
    var household = new Household({
        _id: new mongoose.Types.ObjectId,
        address: req.body.address
    })

    console.log('debugging the object', JSON.stringify(household))

    household
    .save()
    .then(doc=>{
        const result = {
            ID: doc._id,
            address: doc.address
        }

        return console.log('successfully created! Result: ',result)
    })
    .catch((err)=>{
        if(err){
            return console.log('address couldnt be added. Error message: ', err)
        }
    })
}