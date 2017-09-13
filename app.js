var express = require("express"),
    app = express(),
    bodyparser = require("body-parser"),
    mongoose = require("mongoose");
    
mongoose.connect("mongodb://localhost/yelp_mobile");
app.use(bodyparser.urlencoded({extended:true}));
app.set("view engine","ejs");

var mobileSchema = new mongoose.Schema({
    name:String,
    image:String,
    description: String
});

var Mobile = mongoose.model("Mobile",mobileSchema);

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

app.get("/mobiles",function(req,res){
    Mobile.find({},function(err,mobiles){
        if(err){
            console.log(err);
        }else{
            res.render("index",{mobiles:mobiles});
        }
        
    });
   
 
});

app.get("/mobiles/new",function(req, res) {
   
    res.render("new");
});

app.get("/mobiles/:id",function(req, res) {
    Mobile.findById(req.params.id,function(err,mobile){
        if(err){
            console.log(err);
        }else{
            res.render("show",{mobile:mobile});
        }
    });
    
    
});

app.post("/mobiles",function(req,res){
     var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    //campgrounds.push({name:name,image:image});
    Mobile.create({
        name: name,
        image:image,
        description: description
    },function(err,newlyCreated){
        if(err){
            console.log(err);
        }else{
            res.redirect("/mobiles");
        }
    });
    
});

app.listen(process.env.PORT,process.env.IP,function(){
    console.log("YelpMobile server has started!")
});