const postModel = require("../models/post.model")
const ImageKit = require("@imagekit/nodejs")
const { toFile } = require("@imagekit/nodejs")
const jwt = require("jsonwebtoken")
const likeModel = require("../models/like.model")


const imagekit = new ImageKit({})

async function createPostController(req,res){
   

    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer),'file'),
        fileName:"Test",
        folder: "posts-images"
    })

    const post = await postModel.create({
        caption: req.body.caption,
        imageUrl: file.url,
        user: req.user.id
    })
    res.status(201).json({
        message:"Post Created Successfully",
        post
    })
}
async function getPostsController(req,res){
    
    const userId = req.user.id

    const posts = await postModel.find({
        user:userId
    })
    res.status(200).json({
        message:"post fetched",
        posts
    })
       
}
async function getPostsDetailsController(req,res){
    
    const userId = req.user.id
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
async function likePostController(req, res) {

    const userId = req.user.id
    const postId = req.params.postId

    const post = await postModel.findById(postId)

    if (!post) {
        return res.status(404).json({
            message: "Post not found."
        })
    }

    const like = await likeModel.create({
        post: postId,
        user: userId
    })

    res.status(200).json({
        message: "Post liked successfully.",
        like
    })

}

module.exports = {
    createPostController,
    getPostsController,
    getPostsDetailsController,
    likePostController
}
