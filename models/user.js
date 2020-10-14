const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const moment = require('moment-timezone');
const datePerth = moment.tz(Date.now(), "Australia/Perth");

// Create Schema
const UserSchema = new Schema({
  emailAddress: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: datePerth,
  },
  memberType: {
    type: Array,
    default: "guest",
  },
  
});
module.exports = User = mongoose.model("User", UserSchema);
