const jwt = require("jsonwebtoken")
const { LogoutModel } = require("../middleware/logout.model")

async function authenticate(req,res,next){
    const token  = req.headers.authorization
    console.log("token",token)
    const x = await LogoutModel.findOne({token})
    if(x)
    {
      return  res.json("You have to login first")
    }
    try {
        if(token)
        {
            var {name,email}= await jwt.verify(token,"1234")
console.log("fine")
            req.body.loginN = name
            req.body.loginE = email
            next()
            
        }else{
            res.json("You have to login first")
        }
    } catch (error) {
        console.log(error)
        res.json("something went wrong in middweare")
    }
}



module.exports = {authenticate}