const mongoose = require("mongoose")

const employeeSchema = mongoose.Schema({
firstname:String,
lastname:String,
email:String,
department:String,// (Select Tag with Tech, Marketing, and Operations as options)
salary:Number
})

const EmployeeModel = mongoose.model("employee",employeeSchema)

module.exports = {EmployeeModel}