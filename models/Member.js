const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// A member is a person
// A user is a member
const memberSchema = new Schema({
  user_id: 
    [{
      type: Schema.Types.ObjectId,
      ref: "User"
    }
    ],
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  birthDate: {
    type: Date
  },
  sex: {
    type: String
  },
  contactNo: {
    type: Number
  }
});

const Member = mongoose.model("Member", memberSchema);

module.exports = Member;
