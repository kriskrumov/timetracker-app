exports.getProfilePage = (req,res)=>{
    const currentUser = req.user;
    console.log("CURRENT USER PROFILE PAGE: ", currentUser);
    res.render('profile', {currentUser: req.user});
}

exports.updateProfile = (req,res)=>{
    
}

