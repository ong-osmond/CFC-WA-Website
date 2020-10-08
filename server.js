const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
//const routes = require("./routes");
const passport = require("passport");
const users = require("./routes/api/users");
const events = require("./routes/api/events");

const app = express();
const PORT = process.env.PORT || 3001;

// Define middleware here
// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);


// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view
//app.use(routes);
app.use("/api/users", users);
app.use("/api/events", events);

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/cfc-wa"),
{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
}
;

// Define any API routes before this runs
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
