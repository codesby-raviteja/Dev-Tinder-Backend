const express = require("express")

const app = express()

app.use("/test", (req, res) => res.send("HELLO FROM TEST ROUTE"))

app.use((req, res) => {
  res.send("Hello from serveesr")
})

app.listen(4000, () => {
  console.log("sucessfully initiated server")
})
