const jwt = require("jsonwebtoken")
const User = require("../Models/user")

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies
    if (!token) {
      return res.status(401).send("Please Login to your account")
    }
    const decryptObj = await jwt.verify(token, process.env.JWT_SECRET)
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
