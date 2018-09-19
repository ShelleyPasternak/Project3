const mongoose = require("mongoose");

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

//Password Encryption
const bcrypt = require("bcrypt");

// Using the Schema constructor, create a new OwnerSchema object
// This is similar to a Sequelize model
const OwnerSchema = new Schema({
  // `FirstName` does not need to be unique but must be a type String
  FirstName: {
    type: String
  },

  // `LastName` does not need to be unique but must be a type String
  LastName: {
    type: String,
  },

  // `Email` does need to be unique but must be a type String
  Email: {
    type: String,
    unique: true
  },

  password: {
    type: String,
  },
  // `Pet` is an array that stores ObjectIds
  // The ref property links these ObjectIds to the Note model
  // This allows us to populate the Owner with any associated Petss
  Pet: [
    {
      // Store ObjectIds in the array
      type: Schema.Types.ObjectId,
      // The ObjectIds will refer to the ids in the Pet model
      ref: "Pet"
    }
  ]
});

OwnerSchema.pre('save', function(next){
  if(this.isModified('password') || this.isNew){
    bcrypt.hash(this.password, 10, (err, hash) => {
      if(err){ return next(err); }
      this.password = hash;
      return next();
    })
  } else {
    return next();
  }
});

OwnerSchema.methods.comparePassword = function(pass, cb){
  bcrypt.compare(pass, this.password, (err, isMatch) => {
    if(err) {return cb(err)}
    cb(null, isMatch);
  });
};

// This creates our model from the above schema, using mongoose's model method
var Owner = mongoose.model("Owner", OwnerSchema);

// Export the User model
module.exports = Owner;