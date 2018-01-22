var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");
    mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static("public"));

// schema connection starts here;
var campgroundSchema =new mongoose.Schema({
    name: String,
    image : String,
    description: String
});
var Campground= mongoose.model("Campground",campgroundSchema);
// Campground.create({
//     name: "Greenery",
//     image: "https://farm9.staticflickr.com/8307/8008754016_3dd8fd265c.jpg",
//     description:"Green green, everywhere green "
//
//
// },function(err,Campground){
//     if(err){
//         console.log(err);
//     }else{
//         console.log("Newly created campground");
//         console.log(Campground);
//     }
// });

app.get("/", function(req, res) {
  res.render("landing");
});

app.get("/campgrounds", function(req, res) {
Campground.find({},function(err,allCampgrounds){
    if(err){
        console.log(err);
    }else{
        res.render("index",{camps:allCampgrounds});
    }
});

});
app.post("/campgrounds",function(req,res){
    var name= req.body.name;
    var url=req.body.url;
    var description= req.body.description;
    var newCampground={name:name,image:url,description:description};
    Campground.create(newCampground,function(err,campground){
        if(err){
            console.log(err);
        }else{
                res.redirect("/campgrounds");
        }
    });


});

app.get("/campgrounds/new", function(req, res) {
  res.render("new");
});
app.get("/campgrounds/:id",function(req,res){
    Campground.findById(req.params.id,function(err,foundCampground){
        if(err){
            console.log(err);
        }else{
        res.render("show",{campground:foundCampground});
        }
    });

});

app.listen(8080, function() {
  console.log("The server has started");
});
