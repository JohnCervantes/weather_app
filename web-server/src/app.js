const express = require("express");
const path = require("path");
const hbs = require("hbs");
const request = "request";
const app = express();
const root = path.join(__dirname, "../");
const viewsPath = path.join(__dirname + "/../../templates/views");
const partialssPath = path.join(__dirname + "/../../templates/partials");
const url = "https://api.darksky.net/forecast/74bbdabdc35d2ebfc273693155571716/37.8267,-122.4233?units=si";
const geocodingUrl =  "https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1Ijoidm9jYWxpc3RzIiwiYSI6ImNrN2Y3eHpwMjAwNGEzZXA5eTA2MjZmY2MifQ.IvX-KOOEWTTIQ6n8xfGzEA";

// console.log(root+ 'templates/views');
// console.log();

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialssPath);
//app.use(express.static(root));


request({url:url, json:true},(error, response)=>{
  if(error){
    return res.send('Unable to connect to the weather service');
  }
  console.log(response.body.daily.data[0].summary);
});

app.get("", (req, res) => {
  if(req.query.address){
    return res.render('index',{title: "Homepage", address: req.query.address});
  }
  res.render("index", { title: "Homepage" });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    body: "A weather application built using Node.js and Handlebars.js"
  });
});

app.get('/about/*',(req,res)=>{
  res.send('About article Not Found');
  })

app.get('*',(req,res)=>{
res.render('error');
})

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
