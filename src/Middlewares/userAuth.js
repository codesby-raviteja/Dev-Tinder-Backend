const jwt = require("jsonwebtoken")
const User = require("../Models/user")

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies 
    if (!token) {
      throw new Error("Invalid Token")
    }
    const decryptObj = await jwt.verify(token, "DEV_tinder@532")
    const userObj = await User.findById(decryptObj._id)
    if (!userObj) {
      throw new Error("User does not exits")
    }

    req.user = userObj
    next()
  } catch (err) {
    res.status(400).send("Error: " + err.message)
  }
}

module.exports = { userAuth }
