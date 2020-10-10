const express = require("express");
const router = express.Router();

// Load Event model
const Event = require("../../models/Event");

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
        eventVenue: req.body.eventVenue,
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
    Event.find({ eventDate: { $gte: new Date() }}).sort( { eventDate : 1 } ).then(events => {
      // Check if events exist
      if (!events) {
        return res.status(404).json({ eventsNotFound: "No events found." });
      } else res.send(events);
    }
    );
  }
  );


// @route PUT api/events/join 
// @desc PUT events
// @access Private
router.put("/event/join:id", (req, res) => {
    Event.findOneAndUpdate({_id : req.params.id}, { $push: { eventParticipants : req.body.participant_id } }).then(events => {
      // Check if events exist
      if (!events) {
        return res.status(404).json({ eventsNotFound: "No such event found." });
      } else res.send(events);
    }
    );
  }
  );

  // @route PUT api/events/unjoin 
// @desc PUT events
// @access Private
router.put("/event/unjoin:id", (req, res) => {
  Event.findOneAndUpdate({_id : req.params.id}, { $pull: { eventParticipants : req.body.participant_id } }).then(events => {
    // Check if events exist
    if (!events) {
      return res.status(404).json({ eventsNotFound: "No such event found." });
    } else res.send(events);
  }
  );
}
);


module.exports = router;