var express = require("express"),
    app = express(),
    bodyparser = require("body-parser"),
    mongoose = require("mongoose");
    
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyparser.urlencoded({extended:true}));
app.set("view engine","ejs");

var campgroundSchema = new mongoose.Schema({
    name:String,
    image:String,
    description: String
});

var Campground = mongoose.model("Campground",campgroundSchema);

// Campground.create({
//         name:"Yosemite",
//         image:"https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg"
//     },function(err,campground){
//     if(err){
//     console.log(err);
//     }else{
//         console.log("NEW CAMPGROUND:");
//         console.log(campground);
//     }
    
// });

 

app.get("/",function(req,res){
    res.render("landing");
});

app.get("/campgrounds",function(req,res){
    Campground.find({},function(err,campgrounds){
        if(err){
            console.log(err);
        }else{
            res.render("index",{campgrounds:campgrounds});
        }
        
    });
   
  // res.render("campgrounds",{campgrounds:campgrounds}); 
});

app.get("/campgrounds/new",function(req, res) {
   
    res.render("new");
});

app.get("/campgrounds/:id",function(req, res) {
    Campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err);
        }else{
            res.render("show",{campground:campground});
        }
    });
    
    
});

app.post("/campgrounds",function(req,res){
     var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    //campgrounds.push({name:name,image:image});
    Campground.create({
        name: name,
        image:image,
        description: description
    },function(err,newlyCreated){
        if(err){
            console.log(err);
        }else{
            res.redirect("/campgrounds");
        }
    });
    
});

app.listen(process.env.PORT,process.env.IP,function(){
    console.log("YelpCamp server has started!")
});