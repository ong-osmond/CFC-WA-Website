const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const moment = require('moment-timezone');
const datePerth = moment.tz(Date.now(), "Australia/Perth");

// Create Schema
const EventSchema = new Schema({
  creator_id: {
    type: String,
    required: true
  },
  eventTitle: {
    type: String,
    required: true
  },
  eventDescription: {
    type: String,
    required: true
  },
  eventDate: {
    type: Date,
    required: true
  },
  creationDate: {
    type: Date,
    default: datePerth,
  },
  eventVenue: {
    type: String
  },
  eventParticipants: {
    type: Array
  },
  eventZoomID: {
    type: String
  },
  eventType: {
    type: String,
    required: true
  },
  eventApproved: {
    type: Boolean
  }

});
module.exports = Event = mongoose.model("events", EventSchema);
