const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const app = express();
const Subscriber = require("./models.js");

// const connString =
//   "mongodb+srv://sugirayvan:GhostOfYvan@dbghost.igi9x.mongodb.net/dbGhost?retryWrites=true&w=majority";

const connString = "mongodb://localhost/";
mongoose
  .connect(connString)
  .then((response) => {
    console.log("Connection established successfully");
    // app.listen(7777, () => {
    //   console.log("Server up and running, listening for requests");
    // });
  })
  .catch((err) => {
    console.log("Unable to connect to Database");
    console.log("-------------------------------------------");
    console.log(err);
  });

app.listen(7777, () => {
  console.log("Server up and running, listening for requests");
});

app.set("view engine", "ejs");
app.set("views", "../views");
app.use(express.static("../Public"));

app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

app.get("/sermons", (req, res) => {
  res.send("Sermons");
});

app.get("/convos", (req, res) => {
  res.send("convos");
});

app.post("/intensive/subscribe", (req, res) => {
  const newSub = Subscriber({
    email: req.body.email,
  });
  newSub
    .save()
    .then((results) => {
      res.send(results);
    })
    .catch((err) => {
      res.send(err);
      console.log("-------------------------------------------------");
      console.log(Subscriber);
    });
});
app.use((req, res) => {
  res.send("404");
});
