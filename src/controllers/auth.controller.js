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

    if (isUserAlreadyExists) {
        return res.status(409).json({
                message: " " + (isUserAlreadyExists.email == email ? "Email already exists" : "Username already exists")
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
        id:user._id
    },
    process.env.JWT_SECRET_KEY,{ expiresIn: "1d" })
    
    res.cookie("token",token)
    res.status(201).json({
        message:"user registered successfully",
        user:{
            email:user.email,
            username:user.username,
            bio:user.bio,
            ProfilePic:user.ProfilePic
        }
    })
}
    async function loginController(req,res){
    const {username,email,password} = req.body
    const user = await userModel.findOne({
        $or:[
            {username: username},
            {email: email}
        ]
    })
    if(!user){
        return res.status(404).json({
            message:"Invalid Credentials"
        })
    }
    const isPasswordMatched = await bcrypt.compare(password, user.password)
    if(!isPasswordMatched){
        return res.status(401).json({
            message:"Invalid Credentials"
        })
    }
    const token = jwt.sign(
        {id:user._id},
        process.env.JWT_SECRET_KEY,
        {expiresIn:"1d"}
    )
    res.cookie("token",token)
    res.status(200).json({
        message:"User logged In Successfully",
        user:{
            username:user.username,
            email:user.email,
            bio:user.bio,
            ProfilePic:user.ProfilePic
        }
    })
    }
    module.exports = {ragisterController , loginController}