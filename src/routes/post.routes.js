const express = require('express')
const postRouter = express.Router()
const postController = require('../controllers/post.controller')
const multer = require("multer")
const upload = multer({storage:multer.memoryStorage() })
const identifyUser = require("../middlewares/auth.middleware")

postRouter.post("/",upload.single("image"),identifyUser.identifyUser,postController.createPostController)

postRouter.get("/",identifyUser.identifyUser,postController.getPostsController)

postRouter.get("/details/:postId", identifyUser.identifyUser, postController.getPostsDetailsController)

postRouter.post("/like/:postId",identifyUser.identifyUser,postController.likePostController)

module.exports = postRouter