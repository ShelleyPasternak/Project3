const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const Owner = require("./Models/Owner");
const Pet = require("./Models/Pet");
const jwt = require("jsonwebtoken");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

const passport = require("passport");
const { Strategy:JwtStrategy, ExtractJwt } = require("passport-jwt");

const passportOpts = {
  //Set Extraction method to pull it out from our header
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  //Our secrt
  secretOrKey: process.env.JWT_SECRET
};

passport.use(new JwtStrategy(
  passportOpts,
  (jwt_payload, done) => {
    console.log(jwt_payload);
    Owner.findOne({_id: jwt_payload._id}, (err, Owner) => {
      if(err){ return done (err, false); } //if we have a problem, remove it
      console.log("Owner", Owner);
      if(Owner) {
        done(null, Owner)
      } else { 
        done(null, false);
      }
    });
  }
));

const PORT = process.env.PORT || 3001;

const app = express();

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/Petpholiodb")

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
};

app.use(express.static(__dirname + '/client/public/'));

app.use(logger("dev"));
/*app.path(path.static("public"));*/

//HTML Routes
  //Landing Page, which is static
  app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "./client/public/index.html"));
  });
  
    //Register
    app.get("/register", function(req, res){
      res.sendFile(path.join(__dirname, "../public/register.html"));
    });
    //Sign In
    app.get("/signin", function(req, res){
      res.sendFile(path.join(__dirname, "../public/signin.html"));
    });
  
    //Dashboard
    app.get("/dashboard", function(req, res){
      res.sendFile(path.join(__dirname, "../public/dashboard.html"));
    });
  
    //View All Pets
    app.get("/pet/all", function(req, res){
      res.sendFile(path.join(__dirname, "../public/pet/all.html"));
    });
  
    //Create a Pet Profile
    app.get("/pet/create", function(req, res){
      res.sendFile(path.join(__dirname, "../public/pet/create.html"));
    });
  
    //Update a Pet Profile
    app.get("/pet/update", function(req, res){
      res.sendFile(path.join(__dirname, "../public/pet/update.html"));
    });
   
  //API Routes
  // When the server starts, create and save a new Owner document to the db
  // The "unique" rule in the Owner model's schema will prevent duplicate users from being added to the server
  
    //Register Owner
    app.post("/api/register", function(req, res){
      db.Owner.create(
        {FirstName: "", 
        LastName: "",
        Email: "",
        password: ""
      }).then(function(dbOwner) {
        res.json(dbOwner);
      })
      .catch(function(err) {
        res.json(err);
      });
    });
  
    //Sign In Owner
    app.post("/api/signin", function(req, res){
      db.Owner.find(
      {Email: "",
      password: ""
    }).then(function(dbOwner) {
      res.json(dbOwner);
    })
    .catch(function(err) {
      res.json(err);
    });
  });
  
  //Get Owner
  app.get("/api/owner", function(req, res){
    db.Owner.find(
      {FirstName: "", 
        LastName: "",
        Email: "",
        password: ""
      }).then(function(dbOwner) {
        res.json(dbOwner);
      })
      .catch(function(err) {
        res.json(err);
      });
    });
  
  //Create Pet
  app.post("/api/pet/new", function(req, res){
    db.Pet.create(
      {PetName: "", 
      dateOfBirth: "",
      Notes: ""
    }).then(function(dbPet) {
      res.json(dbPet);
    })
    .catch(function(err) {
      res.json(err);
    });
  });
  
  // Route for Pet by ID from the db
  app.get("/pet/:id", function(req, res) {
    // Find all Pets
    db.Pet.find(
      {PetName: "",
      dateOfBirth: "",
      Notes: ""
    })
      .then(function(dbPet) {
        // If all Pets are successfully found, send them back to the client
        res.json(dbPet);
      })
      .catch(function(err) {
        // If an error occurs, send the error back to the client
        res.json(err);
      });
  });
  
  // Route for retrieving all Users from the db
  app.get("/owner", function(req, res) {
    // Find all Owners
    db.Owner.find({})
      .then(function(dbOwner) {
        // If all Owners are successfully found, send them back to the client
        res.json(dbOwner);
      })
      .catch(function(err) {
        // If an error occurs, send the error back to the client
        res.json(err);
      });
  });

//start server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!")});
  