const User = require('../models/user');
const passport = require("passport");

exports.getRegisterPage = (req,res)=>{
    res.render("register");
}

exports.register = (req,res)=>{
    User.register(new User({username: req.body.name, email: req.body.email}), req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render('register');
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/home");
        })
    });
}

exports.getLoginPage = (req,res)=>{
    const errors = req.flash().error || [];
    res.render('login', {errors})
}

exports.logout = (req,res)=>{
    req.logout();
    res.redirect('/');
}

exports.isLoggedIn = (req,res,next)=>{
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/")
}

exports.login = (req, res)=> {
    passport.authenticate("local", {
        successRedirect: "/home",
        failureFlash: true,
        failureRedirect: "/"
    })
}