const express = require("express")
const connectDB = require("./config/database")
const User = require("./Models/user")
const { validateSignupData } = require("./utils/validations")
const bcrypt = require("bcrypt")

const app = express()

//to convert/parse the request Object into Js Object
app.use(express.json())

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
    const user = await User.findOne({ emailId })
    if (!user) {
      throw new Error("Invalid Credentials")
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password)
    if (isPasswordMatched) {
      res.send("Login Successfull")
    } else {
      res.send("Invalid Credentials")
    }
  } catch (err) {
    res.status(404).send("Error: " + err.message)
  }
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

//Feed Api to get all the users of matching emailId,firstName,etc...
app.get("/feed", async (req, res) => {
  const userEmail = req.body.emailId

  try {
    const users = await User.find({ emailId: userEmail })
    if (!users.length > 0) {
      //  res.send(users)
      res.send("No user found")
    } else {
      res.send(users)
    }
  } catch (err) {
    res.status(400).sent
  }
})

//get user by Id
app.get("/getuserbyId", async (req, res) => {
  const userId = req.body.userId

  try {
    const user = await User.findById(userId)
    console.log(user)
    if (!user) {
      res.send("No user found")
    } else {
      res.send(user)
    }
  } catch (err) {
    console.log(err)
    res.status(404).send("Error in getting user data.")
  }
})

//Delete the user
app.delete("/user", async (req, res) => {
  const userId = req.body.userId

  try {
    const a = await User.findByIdAndDelete(userId)
    console.log(a)
    res.send("user successfully deleted")
  } catch (err) {
    res.status(400).send("Something went wrong")
  }
})

//Update the user by Id
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params.userId
  const updateObj = req.body

  try {
    const UPDATE_OPTIONS = ["skills", "age", "description", "gender"]

    const isUpdatable = Object.keys(updateObj).every((key) =>
      UPDATE_OPTIONS.includes(key)
    )
    if (!isUpdatable) {
      throw new Error("You cannot update the details")
    }
    if (updateObj.skills.length > 10) {
      throw new Error("Skills cannot be more than 10")
    }

    // const a = await User.findByIdAndUpdate(userId, updateObj)
    const a = await User.findByIdAndUpdate({ _id: userId }, updateObj)

    //  by default returned the previous document (before update)
    // console.log(a)

    res.send("user successfully updated")
  } catch (err) {
    res.status(404).send("Something went wrong." + err.message)
  }
})

//Update the user by Email id
// app.patch("/updateuserbyemailld", async (req, res) => {
//   const userEmail = req.body.emailId
//   const userObj = req.body

//   try {
//     const a = await User.findOneAndUpdate({ emailId: userEmail }, userObj, {
//       returnDocument: "after",
//       lean: true,
//     })
//     console.log(a)
//     res.send("user updated successfully")
//   } catch (err) {
//     res.status(404).send("Something went wrong.")
//   }
// })

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
