const express = require("express")
const { userAuth } = require("../Middlewares/userAuth")
const ConnectionRequest = require("../Models/connectionRequests")
const User = require("../Models/user")

const requestRoute = express.Router()

requestRoute.post(
  "/request/send/:status/:userId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id
      const toUserId = req.params.userId
      const status = req.params.status

      const allowedStatus = ["ignored", "interested"]
      if (!allowedStatus.includes(status)) {
        return res
          .status(400)
          .json({ message: "invalid status type: " + status })
      }

      const toUser = await User.findById(toUserId)
      if (!toUser) {
        throw new Error("User does not exists")
      }

      const existingConnection = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      })

      if (existingConnection) {
        return res.status(400).send({ message: "connection already exists" })
      }

      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      })

      const data = await connectionRequest.save()
      res.status(200).json({
        status: 200,
        message: "request successfully sent",
      })
    } catch (err) {
      console.log(err)
      res.status(400).json({
        status: 400,
        message: err.message,
      })
    }
  }
)

requestRoute.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const loggedInUser = req.user
      const { status, requestId } = req.params
      const allowedStatus = ["accepted", "rejected"]
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({ message: "Invalid Status type" })
      }
      const connectionRequest = await ConnectionRequest.findOne({
        fromUserId: requestId,
        toUserId: loggedInUser._id,
        status: "interested",
      })
      
      if (!connectionRequest) {
        return res
          .status(400)
          .json({ message: "connection request does not exists" })
      }

      connectionRequest.status = status
      const data = await connectionRequest.save()
      res.status(200).json({ message: "connection accepted", data })
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  }
)

module.exports = requestRoute
