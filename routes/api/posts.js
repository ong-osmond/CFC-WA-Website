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
    postText: req.body.postText,
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

// @route GET api/posts/manage 
// @desc Get posts for admin to manage
// @access Private
router.get("/posts/manage", (req, res) => {
  db.Post.aggregate(
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
  ).sort({ creationDate: -1 }).then(posts => {
    // Check if posts exist
    if (!posts) {
      return res.status(404).json({ postsNotFound: "No posts found." });
    } else res.send(posts);
  }
  );
}
);


// @route GET posts/current 
// @desc Get posts that have been approved but restrict to last 3 months
// @access Public
router.get("/posts/current", (req, res) => {
  db.Post.aggregate(
    [
      { $match: { postApproved: true } }
      ,
      {
        $lookup:
        {
          from: "users",
          localField: "creator_id",
          foreignField: "_id",
          as: "creator_details"
        }
      }
      ,

      {
        $project: {
          "creator_details.password": 0
          , "creator_details.date": 0
          , "creator_details.memberType": 0
        }
      }
      ,
      { $sort: { creationDate: -1 } }
    ]
  ).sort({ creationDate: -1 }).then(posts => {
    // Check if events exist
    if (!posts) {
      return res.status(404).json({ postsNotFound: "No posts found." });
    } else res.send(posts);
  }
  );
}
);


// @route PUT api/post/approve
// @desc PUT Approve a Post
// @access Private
router.put("/post/approve:id", (req, res) => {
  db.Post.findOneAndUpdate({ _id: req.params.id }, { $set: { postApproved: true } }).then(
    db.Post.find({}).sort({ creationDate: -1 }).then(posts => {
      // Check if posts exist
      if (!posts) {
        return res.status(404).json({ postsNotFound: "No posts found." });
      } else res.send(posts);
    }
    )
  )
}
);

// @route PUT api/post/unapprove
// @desc PUT Unapprove a Post
// @access Private
router.put("/post/unapprove:id", (req, res) => {
  db.Post.findOneAndUpdate({ _id: req.params.id }, { $set: { postApproved: false } }).then(
    db.Post.find({}).sort({ date: -1 }).then(posts => {
      // Check if events exist
      if (!posts) {
        return res.status(404).json({ postsNotFound: "No posts found." });
      } else res.send(posts);
    }
    )
  )
}
);



// @route PUT api/post/remove
// @desc PUT Remove post
// @access Private
router.put("/post/remove:id", (req, res) => {
  db.Post.remove({ _id: req.params.id }, { justOne: true }).then(
    db.Post.find({}).then(posts => {
      // Check if posts exist
      if (!posts) {
        return res.status(404).json({ postsNotFound: "No posts found." });
      } else res.send(posts);
    }
    )
  )
}
);

module.exports = router;