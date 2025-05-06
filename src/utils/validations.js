const validator = require("validator")

const  validateSignupData = (req) => {
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

const validateEditData = (req) => {
  const { firstName, lastName, age, description, skills, imageUrl } = req.body

  let allFieldsSatisfied = true

  const editableFields = [
    "firstName",
    "lastName",
    "skills",
    "description",
    "age",
    "imageUrl",
    "gender"
  ]

  const isEditable = Object.keys(req.body).every((field) =>
    editableFields.includes(field)
  )
  if (
    (firstName && firstName.length < 4) ||
    (lastName && lastName.length < 4)
  ) {
    allFieldsSatisfied = false
  } else if (imageUrl && !validator.isURL(imageUrl)) {
    allFieldsSatisfied = false
  } else if (skills && skills.length > 10) {
    allFieldsSatisfied = false
  } else if (description && description.length > 500) {
    allFieldsSatisfied = false
  }

  return isEditable && allFieldsSatisfied
}

const validatePasswordEdit = (req) => {
  const { password, newPassword } = req.body

  if (!password || !newPassword) {
    throw new Error("Please enter  password")
  }
  const isPasswordStrong = validator.isStrongPassword(newPassword)
  return isPasswordStrong
}

module.exports = { validateSignupData, validateEditData, validatePasswordEdit }
