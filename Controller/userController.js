const users = require('../Model/userSchema')

const jwt = require('jsonwebtoken')


exports.registerController = async(req,res)=>{
    const {username,email,password}=req.body

    try {
       const existingUser = await users.findOne({email})
       if(existingUser){
        res.status(406).json('Account already exist')
       }else{
        const newUsers = new users({
            username,
            email,
            password
        })
        await newUsers.save()
        res.status(200).json(newUsers)
       }
    } catch (err) {
        res.status(401).json(err)
    }
}

exports.userLogin= async(req,res)=>{
   
    const{email,password}=req.body
     
    try {
        const existingUser = await users.findOne({email,password})
        if(existingUser){
        const token = jwt.sign({userId:existingUser._id},process.env.secretKey)
        res.status(200).json({existingUser,token})
        }else{
         res.status(406).json("Incorrect Email or Password")
        }
    } catch (error) {
        res.status(401).json(error)
    }
}