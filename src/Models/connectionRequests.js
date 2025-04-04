const mongoose = require("mongoose")

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      enum: {
        values: ["ign ored", "interested", "rejected", "accepted"],
        message: "{VALUE} is not of valid status type",
      },
    },
  },
  { timestamps: true }
)

connectionRequestSchema.pre("save", function (next) {
  const connectionRequest = this
  if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
    throw new Error ("You cannot send connect request ti your self")
  }
  next()
})

const ConnectionRequest = new mongoose.model(
  "ConnectionRequests",
  connectionRequestSchema
)

module.exports = ConnectionRequest
