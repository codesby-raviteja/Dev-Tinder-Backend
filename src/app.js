const express = require("express")

const app = express()

app.get("/user/:userId/:test", (req, res) => {
  console.log(req.query)
  res.send({
    firstName: "teja",
    lastname: "Yellam",
  })
})

app.get(/.*fly$/, (req, res) => {
  console.log(req.query)
  res.send({
    firstName: "Raviteja",
    lastname: "Yellam",
  })
})

console.log("Hello")

const cb0 = function (req, res, next) {
  console.log('CB0')
  next()
}

const cb1 = function (req, res, next) {
  console.log('CB1')
  next()
}

app.get('/example/d', [cb0, cb1], (req, res, next) => {
  console.log('the response will be sent by the next function ...')
  next()
}, (req, res) => {
  res.send('Hello from D!')
}) 

// app.get("/user", (req, res) => {
//   res.send({
//     firstName: "Raviteja",
//     lastname: "Yellam",
//   })
// })

// app.post("/user", (req, res) => {
//   res.send("Data successfully sent to Database")
// })

// app.delete("/user", (req, res) => {
//   res.send("Data successfully deleted")
// })

// app.patch("/user", (req, res) => {
//   res.send("Data successfully patched")
// })

// app.use("/hell", (req, res) => res.send("HELLO 2 ROUTE"))

// app.use("/hello", (req, res) => res.send("HELLO HELLO  ROUTE"))
// app.use("/test/45", (req, res) => res.send("HELLO FROM FIRST TEST ROUTE"))

// app.use("/test", (req, res) => {
//   res.send("HELLO FROM TEST ROUTE")
// })

app.use("/user", (req, res) => {
  res.send("USER IS OUR DATA")
})

// app.use("/", (req, res) => {
//   res.send("Hello from server")
// })

app.listen(4000, () => {
  console.log("sucessfully initiated server")
})
