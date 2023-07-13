const express = require("express")
const cors= require("cors")
const mongoose = require("mongoose")
const { connection } = require("./config.js/db")
const { userRoute } = require("./routes/user.route")
require("dotenv").config()
const app = express()

app.use(express.json())
app.use(cors())
app.use("/user",userRoute)

app.listen(process.env.port,async ()=>{
    await connection
    console.log("server running")
})