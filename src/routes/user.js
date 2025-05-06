const express = require("express")
const { userAuth } = require("../Middlewares/userAuth")
const ConnectionRequest = require("../Models/connectionRequests")
const User = require("../Models/user")

const userRouter = express.Router()

const USER_SAFE_DETAILS = "firstName lastName age skills imageUrl description gender"

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user

    const connectRequests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", USER_SAFE_DETAILS)

    res
      .status(200)
      .json({ message: "Data successfully fetched", data: connectRequests })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user

    const connectRequests = await ConnectionRequest.find({
      $or: [
        { fromUserId: loggedInUser._id, status: "accepted" },
        { toUserId: loggedInUser, status: "accepted" },
      ],
    })
      .populate("fromUserId", USER_SAFE_DETAILS)
      .populate("toUserId", USER_SAFE_DETAILS)

    const data = connectRequests.map((req) => {
      if (req.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return req.toUserId
      }
      return req.fromUserId
    })
    res.json({ data })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    const user = req.user
    const page = req.query.page || 1
    let limit = req.query.limit || 2
    limit = limit > 50 ? 50 : limit

    const skip = (page - 1) * limit

    const connectionRequests = await ConnectionRequest.find({
      $or: [{ fromUserId: user._id }, { toUserId: user._id }],
    }).select("fromUserId toUserId")
    const hideUsersFromFeed = new Set()
    connectionRequests.forEach((req) => {
      hideUsersFromFeed.add(req.fromUserId.toString())
      hideUsersFromFeed.add(req.toUserId.toString())
    })

    const feedUsers = await User.find({
      $and: [
        {
          _id: { $nin: Array.from(hideUsersFromFeed) },
        },
        {
          _id: { $ne: user._id },
        },
      ],
    })
      .select(USER_SAFE_DETAILS)
      .skip(skip)
      .limit(limit)

    res.send(feedUsers)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

module.exports = userRouter
