var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user");
var Campground = require("../models/campground")


//index route
router.get("/", function(req, res){
    res.render("landing");
});


//=====================
//AUTHENTICATION
//=======================

//show register form
router.get("/register",function(req,res){
    res.render("register")
});

//handle signup logic
router.post("/register",function(req,res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err,user){
        if(err){
            return res.render("register", {"error":err.message})
        }
        passport.authenticate("local")(req,res,function(){
           req.flash("success", "You have been successfully signed up, "+user.username)
           res.redirect("campgrounds") 
           
        });
    }) ;
});

//show login form
router.get("/login",function(req,res){
    res.render("login");
});

//handling login route
router.post("/login", passport.authenticate("local",
    {
    successRedirect:"/campgrounds",
    failureRedirect:"/login",
    failureFlash: true,
    successFlash: 'Welcome!'
    }), function(req,res){
    
})

//logout route
router.get("/logout",function(req,res){
   req.logout();
   req.flash("success", "You have successfully logged out");
   res.redirect("/campgrounds");
});


module.exports = router;
