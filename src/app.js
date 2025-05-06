const express = require("express")
const connectDB = require("./config/database")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const authRoute = require("./routes/auth")
const profileRoute = require("./routes/profile")
const requestRoute = require("./routes/requests")
const userRouter = require("./routes/user")

const app = express()
const allowedOrigins = ["http://localhost:5173"]

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true) // allow non-browser clients like Postman
      if (allowedOrigins.includes(origin)) {
        return callback(null, true)
      } else {
        return callback(new Error("Not allowed by CORS"))
      }
    },
    credentials: true, // VERY IMPORTANT
  })
)
//   // cors({
//   //   credentials:true
//   // })
// )

app.use(express.json())
app.use(cookieParser())
app.use("/", authRoute)
app.use("/", profileRoute)
app.use("/", requestRoute)
app.use("/", userRouter)

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
