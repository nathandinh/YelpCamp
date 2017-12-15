var middlewareObj = {};
var Campground  = require("../models/campground");
var Comment = require("../models/comment")

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect("/login")
}

middlewareObj.checkCampgroundOwnership  = function(req, res, next) {
 if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
           if(err){
               req.flash("error", "Campground now found");
               res.redirect("back");
           }  else {
               // does user own the campground?
            if(foundCampground.author.id.equals(req.user._id)) {
                next();
            } else {
                req.flash("error", "You don't have permission");
                res.redirect("/campgrounds/"+req.params.id);
            }
           }
        });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwenership    = function(req,res,next){
     if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
           if(err){
               res.redirect("back");
           }  else {
               // does user own the comment?
               //req.user returns the current user --- passport method
            if(foundComment.author.id.equals(req.user._id)) {
                next();
            } else {
                res.redirect("/campgrounds/"+req.params.id);
            }
           }
        });
    } else {
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn    = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that");
    res.redirect("/login")
}

module.exports = middlewareObj;
