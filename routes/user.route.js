const express = require("express")

const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const { UserModel } = require("../middleware/user.model")
const { authenticate } = require("../model/authenticate")
const { EmployeeModel } = require("../middleware/employee.model")
const { LogoutModel } = require("../middleware/logout.model")

const userRoute = express()


userRoute.post("/signup",async(req,res)=>{
    const {confirmPassword,email,password} = req.body
    try {
        var findData = await UserModel.findOne({email})

        if(findData)
        {
            res.json("user already registerd")
        }else{
            if(confirmPassword==password){
           const hashPass =  await bcrypt.hash(password,5)
           var obj = {confirmPassword,email,password:hashPass}
           var x = UserModel(obj)
           var t = await x.save()
           console.log(t)
           res.json("signup successfull")}
           else{
            res.json("match both password")
           }
        }
        
    } catch (error) {
        console.log(error)
        res.json("something went wrong in signup")
    }
})


userRoute.post("/login",async(req,res)=>{
    const {email,password} = req.body
    try {
        var findData = await UserModel.findOne({email})
        console.log(findData)
        if(!findData)
        {
            res.json("You have to register first")
        }else{
           var decryptPass = await bcrypt.compare(password,findData.password)
           
           if(decryptPass)
           {
            var token = jwt.sign({email,name:findData.name },"1234")
            res.json({token})
           }else{
            res.json("wrong password")
           }
           
           

        }
        
    } catch (error) {
        console.log(error)
        res.json("something went wrong in signup")
    }
})


userRoute.post("/logout",authenticate,async(req,res)=>{
    const token  = req.headers.authorization
    try {
        var data = LogoutModel({token})
        var x = await data.save()
        console.log(x)
        res.json("logout")
    } catch (error) {
        console.log(error)
        res.json("something went weong in logout")
    }
})
//Employee


userRoute.get("/dashboard",async(req,res)=>{
    try {
        var data = await EmployeeModel.find()
        console.log(data)
        res.json(data)
    } catch (error) {
        console.log(error)
        res.json("something went wrong in dashboard")
    }
})


userRoute.post("/addemployee",async (req,res)=>{
    const obj = req.body;
    try {
        var prevData = await EmployeeModel.findOne({email:obj.email})
        if(prevData)
        {
            res.json("employee already in database")
        }else{
            var x = EmployeeModel(obj)
            var y = await x.save()
            console.log(y)
            res.json("employee added")
        }
        
    } catch (error) {
        console.log(error)
        res.json("something went wrong in add employee")
    }
})

//edit


userRoute.patch("/editemployee",async (req,res)=>{
    const obj = req.body;
    try {
        console.log({...obj})
        
        var prevData = await EmployeeModel.updateOne({email:obj.email},{...obj})
        res.send(prevData)
        
    } catch (error) {
        console.log(error)
        res.json("something went wrong in add employee")
    }
})


//delete

userRoute.delete("/delete/:email",async(req,res)=>{
    const email = req.params.email;
    try {
        console.log(email)
        const data = await EmployeeModel.deleteOne({email:email})
        console.log(data)
        res.json({message:"data deleted"})
    } catch (error) {
        console.log(error)
        res.json("something went wrong in delete")
    }
})


//filter

userRoute.get("/filter/:department",async(req,res)=>{
    const department = req.params.department
    const data = await EmployeeModel.find({department})
    res.json(data)
})

//sort

userRoute.get("/sort/:order",async(req,res)=>{
    const order = req.params.order;

    const data = await EmployeeModel.find().sort({"salary":order})

    res.send(data)
})


// search name

userRoute.get("/search/:name",async(req,res)=>{
    const name = req.params.name;
    console.log(name)
    const data = await EmployeeModel.find({firstname:name})

    res.send(data)
})




module.exports = {userRoute}