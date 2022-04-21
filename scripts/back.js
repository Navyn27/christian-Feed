const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const app = express();
const { Scripture, Subscriber, Sermon, Convos } = require("./models.js");
const res = require("express/lib/response");

// const connString =
// "mongodb+srv://sugirayvan:GhostOfYvan@dbghost.igi9x.mongodb.net/dbGhost?retryWrites=true&w=majority";

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
    res.render("error", { title: "Error" });
  });

app.listen(7777, () => {
  console.log("Server up and running, listening for requests");
});

app.set("view engine", "ejs");
app.set("views", "../views");
app.use(express.static("../Public"));

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  Scripture.find()
    .sort({ createdAt: -1 })
    .limit(1)
    .then((results) => {
      res.render("index", { title: "Home", data: results });
    })
    .catch((err) => {
      res.render("error", { title: "Error" });
    });
});

app.get("/sermons", (req, res) => {
  Sermon.find()
    .sort({ createdAt: -1 })
    .then((results) => {
      res.render("sermons", { title: "Sermons", data: results });
    })
    .catch((err) => {
      res.render("error", { title: "Error" });
    });
});

app.post("/searchSermon", (req, res) => {
  Sermon.find({ title: req.body.title })
    .then((results) => {
      res.render("sermons", {
        title: "Sermons - title:" + req.body.title,
        data: results,
      });
    })
    .catch((err) => {
      res.render("error", { title: "Error" });
    });
});

app.post("/searchConvo", (req, res) => {
  Convos.find({ title: req.body.title })
    .then((results) => {
      res.render("Convos", {
        title: "Convo - title:" + req.body.title,
        data: results,
      });
    })
    .catch((err) => {
      res.render("error", { title: "Error" });
    });
});

app.get("/newSermon", (req, res) => {
  res.render("newSermon", { title: "New Sermon" });
});

app.get("/convos", (req, res) => {
  Convos.find()
    .then((results) => {
      res.render("convos", { title: "Conversations", data: results });
    })
    .catch((err) => {
      res.render("error", { title: "Error" });
    });
});

app.get("/newConvo", (req, res) => {
  res.render("newconvo", { title: "New Conversation" });
});

app.post("/convo/addContribution", (req, res) => {
  Convos.updateOne(
    { _id: req.body.id },
    {
      $push: {
        contribution: {
          author: req.body.contribauthor,
          idea: req.body.idea,
        },
      },
    }
  )
    .then((results) => {
      res.redirect("/convos");
    })
    .catch((err) => {
      res.render("error", { title: "Error" });
    });
});

app.get("/sermon/:id", (req, res) => {
  Sermon.find({ _id: req.params.id })
    .then((results) => {
      res.render("sermon", {
        title: "Sermon : " + results[0].title,
        data: results,
      });
    })
    .catch((err) => {
      res.render("error", { title: "Error" });
    });
});

app.get("/convo/:id", (req, res) => {
  Convos.find({ _id: req.params.id })
    .then((results) => {
      res.render("convo", {
        title: "Conversation : " + results[0].title,
        data: results,
      });
    })
    .catch((err) => {
      res.render("error", { title: "Error" });
    });
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
      res.render("error", { title: "Error" });
    });
});

app.post("/newSermon", (req, res) => {
  const newSermon = new Sermon({
    title: req.body.title,
    email: req.body.email,
    author: req.body.author,
    snippet: req.body.snippet,
    content: req.body.content,
  });
  newSermon
    .save()
    .then((results) => {
      res.redirect("/sermons");
    })
    .catch((err) => {
      res.render("error", { title: "Error" });
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
      res.render("error", { title: "Error" });
    });
});

app.use((req, res) => {
  res.render("404", { title: "404 - Page Unavailable" });
});
