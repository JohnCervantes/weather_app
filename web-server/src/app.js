const express = require("express");
const path = require("path");
const hbs = require("hbs");
const app = express();
const root = path.join(__dirname, "../");
const viewsPath = path.join(__dirname + "/../../templates/views");
const partialssPath = path.join(__dirname + "/../../templates/partials");

// console.log(root+ 'templates/views');
// console.log();

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialssPath);
//app.use(express.static(root));

app.get("", (req, res) => {
  res.render("index", { title: "Homepage" });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    body: "A weather application built using Node.js"
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
