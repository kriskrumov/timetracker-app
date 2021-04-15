const express               = require("express"),
      mongoose              = require("mongoose"),
      passport              = require("passport"),
      bodyParser            = require("body-parser"),
      LocalStrategy         = require("passport-local"),
      User                  = require("./models/user"),
      passportLocalMongoose = require("passport-local-mongoose")

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/time_tracker");

const flash = require('connect-flash');
const app = express();
const port = 3000;
app.set('view engine', 'ejs');
app.use(flash());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(require("express-session")({
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
// ROUTES


// AUTHENTICATION ROUTES

app.get("/register", function(req, res){
    res.render("register");
})

app.post("/register", function(req, res){
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render('register');
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/home");
        })
    });
})

// LOGIN ROUTES
app.get("/", function(req, res){
    const errors = req.flash().error || [];
    res.render("login", {errors});
})

// Login logic
app.post("/",passport.authenticate("local", {
    successRedirect: "/home",
    failureFlash: true,
    failureRedirect: "/"
}),function(req,res){
});

app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
})

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/")
}

app.get("/home",isLoggedIn, function(req, res){
    res.render("home");
})

app.listen(port, function(){
    console.log("Server started......");
})