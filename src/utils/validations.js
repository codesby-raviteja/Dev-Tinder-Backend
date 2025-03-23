const validator = require("validator")

const validateSignupData = (req) => {
  const { firstName, lastName, password, emailId } = req.body

  if (!firstName || !lastName) {
    throw new Error("Name is not valid.")
  } else if (
    firstName.length < 4 ||
    firstName.length > 50 ||
    lastName.length < 4 ||
    lastName.length > 50
  ) {
    throw new Error("Name can only be between 4 to 50 characters")
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Please enter a Valid Email.")
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter a strong password.")
  }
}

module.exports = { validateSignupData }
