const mongoose = require("mongoose");

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
 const BookSchema = new Schema({
  // `title` is required and of type String
  title: {
    type: String,
    required: true
  },
  // `link` is required and of type String
  authors: {
    type: String,
    required: false
  },
  
  description: {
    type: String,
    required: false
  },
  thumbnail: {
    type: String,
    required: false
  },
  link: {
    type: String,
    required: false
  },
  // Checks if article is saved; is required; automatically defaults to false
  saved: {
    type: Boolean,
    required: true,
    default: false
  },
  saved: {
    type: String,
    required: true,
  },
});

// This creates our model from the above schema, using mongoose's model method
const Book = mongoose.model("Book", BookSchema);

// Export the Article model
module.exports = Book;
