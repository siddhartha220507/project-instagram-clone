const express = require('express')
const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const authRouter = express.Router()
const crypto = require("crypto")


authRouter.post('/register',async(req,res)=>{
    const{email,username,password,bio,ProfilePic} = req.body
    const isUserAlreadyExists = await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })
    if(isUserAlreadyExists){
        return res.status(409).json({
            message:"user already exists" + (isUserAlreadyExists.email === email ? " email already exists" : " username already exists")
        })
    }
    authRouter.post('/login',async(req,res)=>{
        const {email,password} = req.body
        const user = userModel.findOne({email})
        if(!user){
            return res.status(404).json({
                message:"user not found"
            })
        }
        const isPasswordMatched = user.password === crypto.createHash("md5").update(password).digest('hex')
        if(!isPasswordMatched){
            return res.status(401).json({
                message: "Invalid Password"
            })
        }
    })

   const hash = crypto.createHash("md5").update(password).digest("hex")

    
    const user = await userModel.create({
        username,
        email,
        bio,
        ProfilePic,
        password: hash
    })
    const token = jwt.sign ({
        id:user._id,
    },process.env.JWT_SECRET_KEY)
    
    res.cookie("token",token)
    res.status(201).json({
        message:"user registered successfully",
        user:{
            username:user.username,
            email:user.email,
            bio:user.bio,
            ProfilePic:user.ProfilePic
        }
    })
})

module.exports = authRouter