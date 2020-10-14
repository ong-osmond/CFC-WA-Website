const express = require("express");
const router = express.Router();

// Load models
const db = require("../../models");

// @route POST member/create
// @desc Create member
// @access Private
router.post("/member/create", (req, res) => {
  // TODO: Validation
  const newMember = new db.member({
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



  

module.exports = router;