const express = require("express");
const router = express.Router();
const cloudinary = require('cloudinary');
var multipart = require('connect-multiparty');

cloudinary.config({
    cloud_name: 'dyhehgaim',
    api_key: '918141396444268',
    api_secret: '3iXl012wy8Yc2dDmz2kHTk6KVSM'
});

// @route POST image/upload
// @desc Create event
// @access Private
router.post("/image/upload", (req, res) => {
    // TODO: Validation
    const newEvent = new db.Event({
        creator_id: [req.body.creator_id],
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