const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const app = express();
const { Subscriber, Sermon, Convos } = require("./models.js");

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
  Sermon.find()
    .then((results) => {
      res.render("sermons", { title: "Sermon", data: results });
    })
    .catch((err) => {
      res.send(err);
    });
});

app.get("/sermon", (req, res) => {
  Sermon.find(req.body.sermonTitle)
    .then((results) => {
      res.render("sermon", { title: "Sermon", data: results });
    })
    .catch((err) => {
      res.send(err);
    });
});

app.get("/newSermon", (req, res) => {
  res.render("newSermon", { title: "New Sermon" });
});

app.get("/convos", (req, res) => {
  Convos.find()
    .then((results) => {
      res.render("convos", { title: "Conversation", data: results });
    })
    .catch((err) => {
      res.send(err);
    });
});

app.get("/convo", (req, res) => {
  res.render("convo", { title: "Conversation" });
});

app.get("/newConvo", (req, res) => {
  res.render("newconvo", { title: "New Conversation" });
});

app.post("/newConvo", (req, res) => {
  const conversation = new Convos({
    title: req.body.title,
    email: req.body.email,
    author: req.body.author,
    content: req.body.content,
  });
  conversation
    .save()
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      res.send(err);
    });
});

app.post("/newSermon", (req, res) => {
  const newSermon = new Sermon({
    title: req.body.title,
    email: req.body.email,
    author: req.body.author,
    content: req.body.content,
  });
  newSermon
    .save()
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      res.send(err);
    });
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
