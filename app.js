// Libraries
const connectDB = require('./db/db');
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const bodyParser = require("body-parser");
const LocalStrategy = require("passport-local");
const User = require("./models/user");
const passportLocalMongoose = require("passport-local-mongoose");
const session = require('express-session');
const flash = require('connect-flash');


// Consts and variables
connectDB();
const app = express();

const port = process.env.PORT || 3000;

// Routes Consts 

const activityRoute = require('./routes/activity_route');
const householdRoute = require('./routes/household_route');
const loginRoute = require('./routes/login_route');
const logoutRoute = require('./routes/logout_route');
const profileRoute = require('./routes/profile_route');
const registerRoute = require('./routes/register_route');
const userRoute = require('./routes/user_route');
const { isLoggedIn } = require('./controllers/authentication_controller');


// Middleware

app.set('view engine', 'ejs');
app.use(flash());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use((session)({
    secret: "This is a secret message",
    resave: false,
    saveUninitialized: false
}));


app.use(passport.initialize());
app.use(passport.session());

// Responsible for reading the session, taking the data from the session.

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//=======
// Setting up the routes

app.use('/', loginRoute);

app.use('/home', isLoggedIn, householdRoute);

app.use('/register', registerRoute);

app.use('/logout', logoutRoute);

app.use('/profile', profileRoute)


// Starts server and start listening for connections on specified port


app.listen(port, function(){
    console.log("Server started...visit http://localhost:"+port);
})

module.exports = app;