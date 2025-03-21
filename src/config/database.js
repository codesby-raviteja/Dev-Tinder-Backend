const mongoose = require("mongoose")

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://raviteja:WM7Kvo1aPIwRqzLX@namasthenodejs.aoy92.mongodb.net/devTinder"
  )
}

module.exports = connectDB
