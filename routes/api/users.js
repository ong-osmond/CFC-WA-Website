const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
// Load User model
const User = require("../../models/User");

// Load all models
const db = require("../../models");

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ emailAddress: req.body.emailAddress }).then(user => {
    if (user) {
      return res.status(400).json({ emailAddress: "Email Address already exists" });
    } else {
      const newUser = new User({
        emailAddress: req.body.emailAddress,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password
      });
      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const emailAddress = req.body.emailAddress;
  const password = req.body.password;
  // Find user by emailAddress
  User.findOne({ emailAddress }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailAddressNotfound: "Email Address not found" });
    }
    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          memberType: user.memberType
        };
        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 6000 // 100 mins in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordIncorrect: "Password is incorrect" });
      }
    });
  });
});

// @route GET api/users/
// @desc Get all users
// @access Private
router.get("/users", (req, res) => {
  User.find({ }).then(users => {
    // Check if users exist
    if (!users) {
      return res.status(404).json({ usersNotFound: "No users found." });
    } else res.send(users);
  }
  );
}
);

// @route GET api/users/pending
// @desc Get all users pending approval
// @access Private
router.get("/pending", (req, res) => {
  User.find({ memberType : "guest" }).then(users => {
    // Check if users exist
    if (!users) {
      return res.status(404).json({ usersNotFound: "No users found." });
    } else res.send(users);
  }
  );
}
);

// @route PUT api/users/approve
// @desc PUT users
// @access Private
router.put("/users/approve:id", (req, res) => {
  User.findOneAndUpdate({_id : req.params.id}, { $set: { memberType : ["member"] } }).then(
    User.find({ } ).sort( { date : 1 } ).then(users => {
      // Check if users exist
      if (!users) {
        return res.status(404).json({ usersNotFound: "No users found." });
      } else res.send(users);
    }
    )
  )
}
);

// @route PUT api/users/unapprove
// @desc PUT users
// @access Private
router.put("/users/unapprove:id", (req, res) => {
  User.findOneAndUpdate({_id : req.params.id}, { $set: { memberType : ["guest"] } }, {useFindAndModify : false}).then(
    User.find({ }).then(users => {
      // Check if users exist
      if (!users) {
        return res.status(404).json({ usersNotFound: "No users found." });
      } else res.send(users);
    }
    )
  )
}
);


// @route PUT api/users/remove
// @desc PUT users
// @access Private
router.put("/users/remove:id", (req, res) => {
  User.remove({_id : req.params.id}, {justOne : true}).then(
    User.find({ }).then(users => {
      // Check if users exist
      if (!users) {
        return res.status(404).json({ usersNotFound: "No users found." });
      } else res.send(users);
    }
    )
  )
}
);

// @route GET api/users/user/info 
// @desc Get member details of user
// @access Private
router.get("/user/info:id", (req, res) => {
  console.log(req.params);


ObjectId = require('mongodb').ObjectID;

  db.User.aggregate([
   

    { $match : { _id : ObjectId(req.params.id) } },
    { 
        $lookup: { 
            from: "members", 
            localField: "_id", 
            foreignField: "user_id", 
            as: "member_info" 
        } 
    },
])

 .then(member => {
    // Check if events exist
    if (!member) {
      return res.status(404).json({ memberNotFound: "No member found." });
    } else res.send(member);
  }
  );
}
);

module.exports = router;