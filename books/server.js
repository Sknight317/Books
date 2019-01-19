const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
var mongoose = require("mongoose");
mongoose.plugin(schema => { schema.options.usePushEach = true });

// Requiring axios and cheerios
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
var db = require("./models/Book");
// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/googlebooks";
console.log("connection url: " + MONGODB_URI)
console.log(MONGODB_URI)
mongoose.Promise = Promise;
// Connect to the Mongo DB
mongoose.connect(MONGODB_URI , { useNewUrlParser: true });

// Define API routes here
//Route to return all saved books as JSON
app.get("/api/books", function(req, res) {
    console.log("Get Books")
    // Grab every document in the Books collection
    db.Books.find({saved: true})
      .then(function(dbBooks) {
        // If we were able to successfully find Bookss, send them back to the client
        res.json(dbBooks);
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });

//Route to save a new book to the database
app.post("/api/books", function(req, res) {
  db.Book.create(req.body)
    .then(function(dbBooks) {
      res.json(dbBooks);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

//Used to delete a book from mongo database by id
app.delete("/articles/delete/:id", function (req, res) {
  db.Book.findOneAndRemove({ _id: req.params.id })
  .then(function (result) {
    console.log("This article has been deleted");
    res.json(result);
  })
  .catch(function (err) {
    res.json(err);
    console.log("Error deleting articles: " + err);
  });
});
  
  // app.get('/api/hello', (req, res) => {
  //   res.send({ express: 'Hello From Express' });
  // });


// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});