const express = require("express")
const { userAuth } = require("../Middlewares/userAuth")











const requestRoute = express.Router()

requestRoute.post("/sendconnectionrequest", userAuth, (req, res) => {
  const user = req.user
  res.send(user.firstName + " sending connection")
})

module.exports = requestRoute
