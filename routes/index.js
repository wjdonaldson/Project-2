var express = require('express');
var router = express.Router();
const passport = require("passport");

// This app has no "home" page, but your projects should 😀
router.get('/', function(req, res, next) {
  res.render("index", {title: "Home Page"})
});

// Google OAuth Route login route
router.get("/auth/google", passport.authenticate(
  // which passport strategy
  "google",
  {
    // requesting the user's profile and email
    scope: ["profile", "email"],
    // optionally allow picking between different google accounts
    // uncomment if you want this
    prompt: "select_account"
  }
));

// Google OAuth callback route
router.get("/oauth2callback", passport.authenticate(
  "google",
  {
    successRedirect: "/",
    failureRedirect: "/"
  }
))

// OAuth logout route
router.get("/logout", function(req,res) {
  req.logout(function() {
    res.redirect("/")
  });
});

module.exports = router;