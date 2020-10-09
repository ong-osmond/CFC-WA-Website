const express = require("express");
const router = express.Router();

// Load Event model
const Event = require("../../models/Event");
const { isValidObjectId } = require("mongoose");

// @route POST api/events/create
// @desc Create event
// @access Private
router.post("/event/create", (req, res) => {
    // TODO: Validation

    const newEvent = new Event({
        creator_id: req.body.creator_id,
        eventTitle: req.body.eventTitle,
        eventDescription: req.body.eventDescription,
        eventDate: req.body.eventDate,
        eventVenue: {
            streetNumber: req.body.streetNumber,
            streetName: req.body.streetName,
            suburb: req.body.suburb,
            postCode: req.body.postCode,
            state: req.body.state
        },
        eventApproved: false,
        eventType: req.body.eventType
    });
    newEvent
        .save()
        .then(event => res.json(event))
        .catch(err => console.log(err));

}
)

// @route GET api/events/events
// @desc Get events
// @access Public
router.get("/events", (req, res) => {
    Event.find({ }).then(events => {
      // Check if users exist
      if (!events) {
        return res.status(404).json({ eventsNotFound: "No events found." });
      } else res.send(events);
    }
    );
  }
  );


module.exports = router;