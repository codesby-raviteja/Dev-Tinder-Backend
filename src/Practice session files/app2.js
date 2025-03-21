const express = require("express")


const app = express()

const router = express.Router()


router.get("/",(req,res)=>{
    res.send("Hello from server 3000")
})


router.use("/user",(req,res)=>{

    res.send("USER IS SIGNED UP")
})







app.use("/",router)

app.listen(3000,()=>{
    console.log("started server at 3000");
})