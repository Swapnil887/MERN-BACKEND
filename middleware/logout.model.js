const express = require("express")
const { default: mongoose } = require("mongoose")

const logoutSchema = mongoose.Schema({
    token:String
})

const LogoutModel = mongoose.model("logout",logoutSchema)

module.exports = {LogoutModel}