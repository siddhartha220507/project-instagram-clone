const postModel = require("../models/post.model")
const ImageKit = require("@imagekit/nodejs")
const { toFile } = require("@imagekit/nodejs")
const jwt = require("jsonwebtoken")

const imagekit = new ImageKit({
    
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
    
})

async function createPostController(req,res){
    console.log(req.body,req.file)

const token = req.cookies.token

if(!token){
    return res.status(401).json({
        message:"Token not Found, Unauthorized Access"
    })
}
let decoded = null
try{
    decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
} catch (error) {
    return res.status(401).json({
        message:"Invalid Token, Unauthorized Access"
    })
}

    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer),'file'),
        fileName:"Test",
        folder: "posts-images"
    })

    const post = await postModel.create({
        caption: req.body.caption,
        imageUrl: file.url,
        user: decoded.id
    })
    res.status(201).json({
        message:"Post Created Successfully",
        post
    })
}
async function getPostsController(req,res){
    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            message:"unauthorized access"
        })
    }
    
    let decoded = null
    try{
        decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
    } catch (error) {
        return res.status(401).json({
            message:"Invalid Token, Unauthorized Access"
        })
    }
    const userId = decoded.id

    const posts = await postModel.find({
        user:userId
    })
    res.status(200).json({
        message:"post fetched",
        posts
    })
       
}
async function getPostsDetailsController(req,res){
    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            message:"unauthorized access"
        })
    }
    let decoded = null;
    try{
        decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
    }
    catch (error) {
        return res.status(401).json({
            message:"Invalid Token, Unauthorized Access"
        })
    }
    const userId = decoded.id
    const postId = req.params.postId

    const post = await postModel.findById(postId)

    if(!post){
        return res.status(404).json({
            message:"post not found"
        })
    }

    const isValidUser = post.user.toString() === userId
    if(!isValidUser){
        return res.status(403).json({
            message:"forbidden content"
        })
    }
    return res.status(200).json({
        message:"post fetched",
        post
    })
}
module.exports = {
    createPostController,
    getPostsController,
    getPostsDetailsController
}
