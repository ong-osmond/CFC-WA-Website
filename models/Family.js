const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// A family consists of members
// A family has one contact info and address
const familySchema = new Schema({
  member_details:
    [{
      type: Schema.Types.ObjectId,
      ref: "User"
    }
    ]
  ,
  contactNo: {
    type: Number
  },
  address: {
    streetNumber: { type: String },
    streetName: { type: String },
    suburb: { type: String },
    postCode: { type: Number },
    state: { type: String }
  },
  emergency_contact: {
    firstName: { type: String },
    lastName: { type: String },
    contactNo: { type: Number }
  }
});

const Family = mongoose.model("Family", familySchema);

module.exports = Family;
