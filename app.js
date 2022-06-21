//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const lodash = require("lodash");

let posts = [];

const homeStartingContent = "Hello there, this is your daily journal to log all the exciting events that happened in your day! Head on over to Compose to get started. Happy journaling!";
const aboutContent = "This website was created by Evelyn to help herself and others to jot down their daily events in a journal-type format.";
const contactContent = "Email: evelynschao@gmail.com";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res) {
  res.render("home", {
    homeStartingContent: homeStartingContent,
    posts: posts
  });
});

app.get("/about", function(req, res) {
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res) {
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res) {
  res.render("compose");
});

app.post("/compose", function(req, res) {
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };
  posts.push(post);
  res.redirect("/");
});

app.get("/posts/:postName", function(req, res) {
  const requestedTitle = lodash.lowerCase(req.params.postName);
  posts.forEach(function(post) {
    const storedTitle = lodash.lowerCase(post.title);
    if (storedTitle === requestedTitle) {
      res.render("post", {
        storedTitle: post.title,
        postContent: post.content});
    }
  });
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
