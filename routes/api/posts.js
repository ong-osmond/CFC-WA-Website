const express = require("express");
const router = express.Router();

// Load all models
const db = require("../../models");

// @route POST post/create
// @desc Create post
// @access Private
router.post("/post/create", (req, res) => {
  // TODO: Validation
  const newPost = new db.Post({
    creator_id: [req.body.creator_id],
    postTitle: req.body.postTitle,
    postDescription: req.body.postDescription,
    postTags: [req.body.postTags],
    postImageURL: req.body.postImageURL,
    postApproved: false,
    postFeatured: false
  });
  newPost
    .save()
    .then(post => res.json(post))
    .catch(err => console.log(err));

}
)

// @route GET api/events/manage 
// @desc Get events for admin to manage
// @access Privage
router.get("/events/manage", (req, res) => {
  db.Event.aggregate(
    [
      {
        $lookup:
        {
          from: "users",
          localField: "creator_id",
          foreignField: "_id",
          as: "creator_details"
        }
      }
    ]
  ).sort({ eventDate: 1 }).then(events => {
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
  db.Event.find({ eventDate: { $gte: new Date() }, eventApproved: true }).sort({ eventDate: 1 }).then(events => {
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
  db.Event.findOneAndUpdate({ _id: req.params.id }, { $set: { eventApproved: true } }).then(
    db.Event.find({}).sort({ date: 1 }).then(events => {
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
  db.Event.findOneAndUpdate({ _id: req.params.id }, { $set: { eventApproved: false } }).then(
    db.Event.find({}).sort({ date: 1 }).then(events => {
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
  db.Event.findOneAndUpdate({ _id: req.params.id }, { $push: { eventParticipants: req.body.participant_id } }).then(events => {
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
  db.Event.findOneAndUpdate({ _id: req.params.id }, { $pull: { eventParticipants: req.body.participant_id } }).then(events => {
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
  db, Event.remove({ _id: req.params.id }, { justOne: true }).then(
    db.Event.find({}).then(events => {
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
  db.Event.aggregate(
    [
      {
        $lookup:
        {
          from: "users",
          localField: "creator_id",
          foreignField: "_id",
          as: "creator_details"
        }
        ,
        $project: { password: 0 }
        ,
        $sort: {eventDate : 1 }
      }
    ]
  )
    .then(events => {
      res.json(events);
    })
    .catch(err => {
      res.json(err);
    });
});



module.exports = router;