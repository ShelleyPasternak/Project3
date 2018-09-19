const mongoose = require("mongoose");

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Using the Schema constructor, create a new PetSchema object
// This is similar to a Sequelize model
const PetSchema = new Schema({
  // `name` must be of type String
  PetName: String
},
{
  dateOfBirth: Date
},
{  
  Notes: String
});

// This creates our model from the above schema, using mongoose's model method
const Pet = mongoose.model("Pet", PetSchema);

// Export the pet model
module.exports = Pet;