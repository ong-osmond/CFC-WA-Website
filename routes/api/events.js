const express = require("express");
const router = express.Router();

// Load Event model
const Event = require("../../models/Event");
const User = require("../../models/User");

// @route POST event/create
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

// @route GET api/events/manage 
// @desc Get events for admin to manage
// @access Privage
router.get("/events/manage", (req, res) => {
  Event.find({}).sort( { eventDate : 1 } ).then(events => {
    // Check if events exist
    if (!events) {
      return res.status(404).json({ eventsNotFound: "No events found." });
    } else res.send(events);
  }
  );
}
);


// @route GET events/upcoming 
// @desc Get events that have been approved
// @access Public
router.get("/events/upcoming", (req, res) => {
    Event.find({ eventDate: { $gte: new Date() } , eventApproved : true }).sort( { eventDate : 1 } ).then(events => {
      // Check if events exist
      if (!events) {
        return res.status(404).json({ eventsNotFound: "No events found." });
      } else res.send(events);
    }
    );
  }
  );


// @route PUT api/event/approve
// @desc PUT Approve an Event
// @access Private
router.put("/event/approve:id", (req, res) => {
  Event.findOneAndUpdate({_id : req.params.id}, { $set: { eventApproved : true } }).then(
    Event.find({ } ).sort( { date : 1 } ).then(events => {
      // Check if events exist
      if (!events) {
        return res.status(404).json({ eventsNotFound: "No events found." });
      } else res.send(events);
    }
    )
  )
}
);

// @route PUT api/event/unapprove
// @desc PUT Unapprove an Event
// @access Private
router.put("/event/unapprove:id", (req, res) => {
  Event.findOneAndUpdate({_id : req.params.id}, { $set: { eventApproved : false } }).then(
    Event.find({ } ).sort( { date : 1 } ).then(events => {
      // Check if events exist
      if (!events) {
        return res.status(404).json({ eventsNotFound: "No events found." });
      } else res.send(events);
    }
    )
  )
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

// @route PUT api/events/remove
// @desc PUT Remove event
// @access Private
router.put("/event/remove:id", (req, res) => {
  Event.remove({_id : req.params.id}, {justOne : true}).then(
    Event.find({ }).then(events => {
      // Check if events exist
      if (!events) {
        return res.status(404).json({ eventsNotFound: "No events found." });
      } else res.send(events);
    }
    )
  )
}
);



// @route GET api/events/eventsFull 
// @desc Get events with Creator details
// @access Private
router.get("/eventsFull", (req, res) => {
  Event.aggregate([
    { $lookup:
       {
         from: User,
         localField: 'creator_id',
         foreignField: '_id',
         as: 'userDetails'
       }
     }
    ]
  )
  .sort( { eventDate : 1 }  
    
    ).then(events => {
    // Check if events exist
    if (!events) {
      return res.status(404).json({ eventsNotFound: "No events found." });
    } else res.send(events);
  }
  );
}
);


module.exports = router;