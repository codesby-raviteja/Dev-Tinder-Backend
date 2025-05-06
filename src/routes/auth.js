const express = require("express")
const User = require("../Models/user")
const { validateSignupData } = require("../utils/validations")
const bcrypt = require("bcrypt")

const authRouter = express.Router()



authRouter.post("/signup", async (req, res) => {
  try {
    validateSignupData(req)

    const { firstName, lastName, emailId, password } = req.body

    const passwordHash = await bcrypt.hash(password, 10)

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    })

    const savedUser = await user.save()

    const token = await savedUser.getJWT()

    res.cookie("token", token, { expires: new Date(Date.now() + 8 * 900000) })

    res.json({ message: "User successfully signed up", data: savedUser })
  } catch (err) {
    res.status(400).send("ERROR: " + err.message)
  }
})



authRouter.post("/login", async (req, res) => {
  const { emailId, password } = req.body

  try {
    const user = await User.findOne({ emailId: emailId.toLowerCase() })
    if (!user) {
      throw new Error("Invalid Credentails")
    }
    const isPassworValid = await user.validatePassword(password)
    if (!isPassworValid) {
      throw new Error("Invalida Credentials ")
    } else {
      const token = await user.getJWT()
      res.cookie("token", token, { expires: new Date(Date.now() + 8 * 900000) })
      res.send(user)
    }
  } catch (err) {
    res.status(404).send("Error: " + err.message)
  }
})

authRouter.post("/logout", (req, res) => {
  res.cookie("token", null, { expires: new Date(Date.now()) })
  res.send("successfully loged out")
})

module.exports = authRouter
