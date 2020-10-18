const express = require("express");
const router = express.Router();

// Load models
const db = require("../../models");

// @route POST member/create
// @desc Create member
// @access Private
router.post("/member/create", (req, res) => {
  // TODO: Validation
  const newMember = new db.Member({
      user_id: [req.body.user_id],
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      birthDate: req.body.birthDate,
      sex: req.body.sex,
      contactNo: req.body.contactNo
  });
  newMember
      .save()
      .then(member => res.json(member))
      .catch(err => console.log(err));

}
)

// @route GET member:id
// @desc Get member info
// @access Private
router.get("/member:user_id", (req, res) => {
    db.Member.find({ user_id : req.params.user_id }).then(member => {
      // Check if members exist
      if (!member) {
        return res.status(404).json({ memberNotFound: "No member found." });
      } else res.send(member);
    }
    );
  }
  );


// @route PUT member/update:id
// @desc Update member info
// @access Private
router.put("/update:id", (req, res) => {
    db.Member.findOneAndUpdate({ _id : req.params.id }, { $set: req.body } 
        , { useFindAndModify : false })
    .then(member => {
      // Check if members exist
      if (!member) {
        return res.status(404).json({ memberNotFound: "No member found." });
      } else res.send(member);
    }
    );
  }
  );
  

module.exports = router;