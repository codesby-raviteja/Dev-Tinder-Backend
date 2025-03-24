const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      require: true,
      minLength: 4,
      maxLength: 50,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    emailId: {
      type: String,
      require: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is not Valid")
        }
      },
    },
    password: {
      type: String,
      require: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Please make your password strong")
        }
      },
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error()
        }
      },
    },
    description: {
      type: String,
      default: "This is the default description about you.",
      maxLength: 500,
    },
    skills: [{ type: String }],
  },
  { timestamps: true }
)

userSchema.methods.getJWT = async function () {
  const token = await jwt.sign({ _id: this._id }, "DEV_tinder@532", {
    expiresIn: "7d",
  })

  return token
}

userSchema.methods.validatePassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}

const User = mongoose.model("User", userSchema)

module.exports = User
