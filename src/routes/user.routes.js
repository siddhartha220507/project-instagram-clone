const express = require('express');
const userController = require("../controllers/user.controller")
const identifyUser = require("../middlewares/auth.middleware")

const userRouter = express.Router();



userRouter.post("/follow/:username", identifyUser.identifyUser, userController.followUserController)



userRouter.delete("/unfollow/:username", identifyUser.identifyUser, userController.unfollowUserController)




module.exports = userRouter;