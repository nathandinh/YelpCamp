var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment   = require("./models/comment");


var data = [
    // {
    //     name:"Lake", 
    //     image:"https://farm5.staticflickr.com/4081/4753265986_61aef197a0.jpg",
    //     description:"VERY VERY NICE PLACE"
    // },
    
    // {
    //     name:"Cloud",
    //     image:"https://farm8.staticflickr.com/7289/16354308072_689d0d1a57.jpg",
    //     description:"COld but fun"
    // },
    
    // {
    //     name:"Snow",
    //     image:"https://farm1.staticflickr.com/112/316612921_f23683ca9d.jpg",
    //     description:"COZY place"
    // }
    
    
]

function seedDB(){
//   Remove all campgrounds
  Comment.remove({},function(err){
      if(err){
          console.log(err)
      } else {
          console.log("removed comment")
      }
  })
  Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
        data.forEach(function(seed){
          Campground.create(seed, function(err,campground){
              if (err) {
                  console.log(err)
              } else {
                  console.log("added")
                  //create comment
                  Comment.create(
                      {
                        text:"i love this place",
                        author:"Nathan"
                  }, function(err,comment){
                      if(err){
                          console.log(err)
                      } else {
                        campground.comments.push(comment);
                        campground.save();
                        console.log("comments created")
                      }
                      
                  });
              }
          }) 
        });
    //add few camp grounds
        

    }); 
   
}

module.exports = seedDB;
