const userModel = require('../models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")

async function ragisterController(req, res){
    const{email,username,password,bio,ProfilePic} = req.body
    const isUserAlreadyExists = await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })
}
    if(isUserAlreadyExists){
        return res.status(409).json({
            message:"user already exists" + (isUserAlreadyExists.email === email ? " email already exists" : " username already exists")
        })
    }
    
    const hash = await bcrypt.hash(password, 10)
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
    async function loginController(req,res){
    const {username,email,password} = req.body
    const user = userModel.findOne({
        $or:[
            {username: username}
            {email: email}
        ]
    })
    is(!user){
        return res.status(404).json({
            message:"Invalid Credentials"
        })
    }
    const token = jwt.sign(
        {id:user._id},
        process.env.JWT_SECRET_KEY,
        {expressIn:"id"}
    )
    res.cookie("token",token)
    res.status(200).json({
        message:"User logged In Successfully"
        user:{
            username:user.username,
            email:user.email,
            bio:user.bio,
            ProfilePic:user.ProfilePic
        }
    })
    }
    module.exports = {ragisterController , loginController}