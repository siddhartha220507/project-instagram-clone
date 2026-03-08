const express = require('express')
const postRouter = express.Router()
const postController = require('../controllers/post.controller')
const multer = require("multer")
const upload = multer({storage:multer.memoryStorage() })

postRouter.post("/",upload.single("image"),postController.createPostController)

postRouter.get("/",postController.getPostsController)

postRouter.get("/details/:postId",postController.getPostsDetailsController)

module.exports = postRouter