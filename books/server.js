const express = require("express");
const mongoose = require("mongoose");
// mongoose.plugin(schema => { schema.options.usePushEach = true });
const routes = require("./routes");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3001;
// require('./models');

const URI = require("./config/index");



mongoose.connect(process.env.MONGODB_URI || URI, { useNewUrlParser: true });

// When successfully connected
mongoose.connection.on('connected', () => {
	console.log('Established Mongoose Default Connection');
});

// When connection throws an error
mongoose.connection.on('error', err => {
	console.log('Mongoose Default Connection Error : ' + err);
});
// Requiring axios and cheerios
// var axios = require("axios");
// var cheerio = require("cheerio");

// Require all models
// const db = require("./models/Book");
// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view

app.use(routes);
// var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/googlebooks";
// console.log("connection url: " + MONGODB_URI)
// console.log(MONGODB_URI)
// mongoose.Promise = Promise;
// Connect to the Mongo DB
// mongoose.connect(MONGODB_URI , { useNewUrlParser: true });


// app.get('/', (req, res) => {
// 	res.send('Hello');
// });
// Define API routes here
//Route to return all saved books as JSON
// app.get("/api/books", function(req, res) {
//     console.log("Get Books")
    
//     db.Books.find({saved: true})
//       .then(function(dbBooks) {
      
//         res.json(dbBooks);
//       })
//       .catch(function(err) {
       
//         res.json(err);
//       });
//   });

//Route to save a new book to the database
// app.post("/api/books",(req, res) => {
//   db.Book.create(req.body)
//   // myData.save()
//   .then(item => {
//     res.send("item saved to database");
//   })
//     .catch(err => {
//       res.json(err);
//     });
// });

//Used to delete a book from mongo database by id
// app.delete("/articles/delete/:id", function (req, res) {
//   db.Book.findOneAndRemove({ _id: req.params.id })
//   .then(function (result) {
//     console.log("This article has been deleted");
//     res.json(result);
//   })
//   .catch(function (err) {
//     res.json(err);
//     console.log("Error deleting articles: " + err);
//   });
// });
  
// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});