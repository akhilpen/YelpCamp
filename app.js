var express = require("express");
var app = express();

app.set("view engine","ejs");

app.get("/",function(req,res){
    res.render("landing");
});

app.get("/campgrounds",function(req,res){
    var campgrounds = [
    {
        name:"salmon creek",
        image:"https://farm5.staticflickr.com/4016/4369518024_0f64300987.jpg"
    },
    {
        name:"Yosemite",
        image:"https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg"
    },
    {
        name:"niagara",
        image:"https://farm3.staticflickr.com/2580/3942698066_9157ac5123.jpg"
    }
    ];
   res.render("campgrounds",{campgrounds:campgrounds}); 
});


app.listen(process.env.PORT,process.env.IP,function(){
    console.log("YelpCamp server has started!")
});