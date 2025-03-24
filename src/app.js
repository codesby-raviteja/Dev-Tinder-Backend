const express = require("express")
const connectDB = require("./config/database")
const User = require("./Models/user")
const { validateSignupData } = require("./utils/validations")
const bcrypt = require("bcrypt")
const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken")
const { userAuth } = require("./Middlewares/userAuth")

const app = express()

//to convert/parse the request Object into Js Object
app.use(express.json())
app.use(cookieParser())

//Signingup the user
app.post("/signup", async (req, res) => {
  //STEPS:
  //STEP-1) Validating the request object

  try {
    validateSignupData(req)
    const { firstName, lastName, password, emailId, age } = req.body

    //STEP-2) Encrypting the password

    const passwordHash = await bcrypt.hash(password, 10)

    //Creating a new Instance of User model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    })

    await user.save()
    res.send("User successfully signed up")
  } catch (err) {
    res.status(400).send("Error: " + err.message)
  }
})

app.post("/login", async (req, res) => {
  const { emailId, password } = req.body

  try {
    const user = await User.findOne({ emailId: emailId.toLowerCase() })
    if (!user) {
      throw new Error("Invalid Credentials")
    }

    const isPasswordValid = await user.validatePassword(password)

    if (isPasswordValid) {
      const token = await user.getJWT()

      res.cookie("token", token, { expires: new Date(Date.now() + 900000) })
      res.send("Login Successfull")
    } else {
      throw new Error("Invalid Credentials")
    }
  } catch (err) {
    res.status(404).send("Error: " + err.message)
  }
})

app.get("/profile", userAuth, async (req, res) => {
  const user = req.user
  res.send(user)
})

//Get user by emailId
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId

  try {
    const user = await User.findOne({ emailId: userEmail })
    if (!user) {
      res.send("user not found.")
    } else {
      res.send(user)
    }
  } catch (err) {
    res.status(404).send("Error in getting user data.")
  }
})

app.post("/sendconnectionrequest", userAuth, (req, res) => {
  const user = req.user
  res.send(user.firstName + " sending connection")
})

connectDB()
  .then(() => {
    console.log("Database connection was successfully established")
    app.listen(4000, () => {
      console.log("Serves has successfully established at 4000")
    })
  })
  .catch(() => {
    console.log("Databse Connection was not Successfull")
  })
