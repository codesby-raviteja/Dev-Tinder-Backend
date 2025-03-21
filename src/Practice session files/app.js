const express = require("express")
const {
  adminAuthMiddleware,
  userAuthMiddleware,
} = require("./Middlewares/authMiddleware")

const app = express()

//app.[get,post,delete,patch,etc...](rH1,[rH2,rH3],rH4,rH5)

/** app.post(
  "/route",
  (req, res, next) => {
    console.log("Route Handler 1")
    //res.send("ROUTE HANDLER 1")
    next()
  },
  [
    (req, res, next) => {
      console.log("Route Handler 2")
      //res.send("ROUTE HANDLER 2")
      next()
    },
    (req, res, next) => {
      console.log("Route Handler 3")
      //res.send("ROUTE HANDLER 3")
      next()
    },
    (req, res, next) => {
      console.log("Route Handler 4")
      res.send("ROUTE HANDLER 4")
      //next()
    },
  ],
  (req, res, next) => {
    console.log("Route Handler 5")
    res.send("ROUTE HANDLER 5")
    // next()
  }
)
*/

// app.use("/", (req, res, next) => {
//   next()
// })

// app.use("/", (req, res, next) => {
//   res.send("out the box")
// })

// app.get(
//   "/user",
//   (req, res, next) => {
//     console.log("Handling user route")
//     next()
//   },
//   (req, res, next) => {
//     console.log("MiddleWare - 1")
//     // res.send("Route Handing 1")
//     next()
//   },
//   (req, res, next) => {
//     console.log("MiddleWare - 2")
//     // res.send("Route Handing 2")
//     next()
//   },
//   (req, res, next) => {
//     console.log("Last Request Handler")
//     //res.send("Route Handing 3")
//     next()
//   }
// )

// app.use("/admin", adminAuthMiddleware)

// app.get("/admin/getAdminDetails", (req, res) => {
//   res.send("Admin Details are received")
// })

// app.get("/admin/deleteAdminDetails", (req, res) => {
//   res.send("Admin Details are Deleted")
// })

// app.use("/user", userAuthMiddleware)

// app.get("/user/login",(req,res)=>{

//   res.send("You have successfully logged in")
// })

// app.get("/user/userDetails", (req, res) => {
//   res.send("user Details are sent")
// })

// app.post("/user/message", (req, res) => {
//   res.send("Message successfully posted")
// })

// app.delete("/user/post", (req, res) => {
//   res.send("post successfully deleted")
// })

// app.use("/admin", (req, res,t) => {
//   console.log("############");
//  // res.send("ADMIN is logged IN")
//  t(1)
// })

// app.get("/admin/getDetails", (req, res,next) => {
//   res.send("ADMIN Details are sent")

// })

// app.get("/user", (req, res,next) => {
//   // res.send("user Details are sent")
//   next()
// })

// app.get("/user/message", (req, res) => {
//   res.send("Message successfully posted")
// })

// app.use("/user", (req, res, next) => {
//   throw Error("something went wrong")
//   res.send("got user data")
//   next()
// })


app.use("/user", ( req, res, next) => {
  throw Error("something went wrong")
  console.log('HELLO ###');
  res.send("gott user data")
  // next(err)
})

app.use("/", ( err,req, res, next) => {
  console.log("hello")
  // res.send("THIS IS THE ERROR HANDLING")
  // next(err)
})

// app.use("/", (err, req, res, next) => {
//   console.log("HELLOW ERRORs")
//   res.send(err.message)
// })

app.listen(4000, () => {
  console.log("sucessfully initiated server")
})
