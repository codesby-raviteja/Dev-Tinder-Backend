const express = require("express")
const { userAuth } = require("../Middlewares/userAuth")
const {
  validateEditData,
  validatePasswordEdit,
} = require("../utils/validations")
const bcrypt = require("bcrypt")

const profileRoute = express.Router()

profileRoute.get("/profile/view", userAuth, async (req, res) => {
  const user = req.user
  res.send(user)
})

profileRoute.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditData(req)) {
      throw new Error("cannot update the field's please check.")
    }

    const loggedInUser = req.user

    Object.keys(req.body).forEach(
      (filed) => (loggedInUser[filed] = req.body[filed])
    )

    loggedInUser.save()

    res.json({
      status: 200,
      message: `${loggedInUser.firstName}, your profile is updated`,
      data: loggedInUser,
    })
  } catch (err) {
    res.status(400).json({ status: "404", message: err.message })
  }
})

profileRoute.patch("/profile/password", userAuth, async (req, res) => {
  const { password, newPassword } = req.body
  const user = req.user
  try {
    if (!validatePasswordEdit(req)) {
      throw new Error("Please enter a strong password")
    }
    const isOldPasswordMatched = await bcrypt.compare(password, user.password)
    if (!isOldPasswordMatched) {
      throw new Error("Your password does not match with the account password")
    }

    const newPasswordHash = await bcrypt.hash(newPassword, 10)
    user.password = newPasswordHash
    user.save()
    res.send("password successfully updated")
  } catch (err) {
    res.status(404).json({
      status: 404,
      messsage: err.message,
    })
  }
})

module.exports = profileRoute
