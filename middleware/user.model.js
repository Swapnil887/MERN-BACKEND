const mongoose = require("mongoose")


const userSchema = mongoose.Schema({
    confirmPassword:String,
    email:String,
    password:String
})


const UserModel =  mongoose.model("user",userSchema)

module.exports = {UserModel}