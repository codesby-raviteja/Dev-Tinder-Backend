const express = require("express")
const connectDB = require("./config/database")
const User = require("./Models/user")

const app = express()

app.post("/signup", async (req, res) => {
  //Creating a new Instance of User model

  const user = new User({
    firstName: "Jyothi",
    lastName: "Yellam",
    emailId: "jyothiyellam@email.com",
    password: "jyothi@321",
    age: 25,
    gender: "Female",
  })

  try {
    await user.save()
    res.send("User successfully signed up")
  } catch (err) {
    res.statusCode(400).send("Error in singin up the user" + err.message)
  }
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
