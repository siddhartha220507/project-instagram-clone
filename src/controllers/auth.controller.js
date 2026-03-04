const userModel = require('../models/user.model')
const crypto = require('crypto')
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