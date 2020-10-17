const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const moment = require('moment-timezone');
const datePerth = moment.tz(Date.now(), "Australia/Perth");

// Create Schema
const PostSchema = new Schema({
  creator_id:
    [{
      type: Schema.Types.ObjectId,
      ref: "User"
    }
    ]
  ,
  postTitle: {
    type: String,
    required: true
  },
  postDescription: {
    type: String,
    required: true
  },
  creationDate: {
    type: Date,
    default: datePerth,
  },
  postTags: [{
    type: String
  }
  ],
  postImageURL: {
    type: String
  },
  postApproved: {
    type: Boolean
  },
  postFeatured: {
    type: Boolean
  }
});
module.exports = Post = mongoose.model("Post", PostSchema);
