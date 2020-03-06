const express = require("express");
const path = require("path");
const hbs = require("hbs");
const request = "request";
const app = express();
const root = path.join(__dirname, "../");
const viewsPath = path.join(__dirname + "/../../templates/views");
const partialssPath = path.join(__dirname + "/../../templates/partials");
const geocode = require("../utils/geocode");
const forecast = require("../utils/forecast");

// console.log(root+ 'templates/views');
// console.log();

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialssPath);
//app.use(express.static(root));

app.get("", (req, res) => {
  if (!req.query.address) {
    return res.render("",{
      error: "You must provide an address!"
    });
  }

  geocode(req.query.address, (error, { latitude, longitude, location }) => {
    if (error) {
      return res.send({ error });
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }

      res.render("",{
        forecast: `Current Forecast: ${forecastData}`,
        loc : `Location:  ${location}`
      });
    });
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    body: "A weather application built using Node.js and Handlebars.js"
  });
});

app.get("/about/*", (req, res) => {
  res.send("About article Not Found");
});

app.get("*", (req, res) => {
  res.render("error");
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
