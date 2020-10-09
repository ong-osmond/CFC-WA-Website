const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateLoginInput(data) {
  let errors = {};
// Convert empty fields to an empty string so we can use validator functions
  data.emailAddress = !isEmpty(data.emailAddress) ? data.emailAddress : "";
  data.firstName = !isEmpty(data.firstName) ? data.firstName : "";
  data.lastName = !isEmpty(data.lastName) ? data.lastName : "";
  data.password = !isEmpty(data.password) ? data.password : "";
// emailAddress checks
  if (Validator.isEmpty(data.emailAddress)) {
    errors.emailAddress = "Email Address is required";
  } else if (!Validator.isEmail(data.emailAddress)) {
    errors.emailAddress = "Email Address is invalid";
  }
// Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }
return {
    errors,
    isValid: isEmpty(errors)
  };
};