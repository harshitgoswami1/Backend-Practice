const express = require("express")
const userController = require("../controllers/user.controller")
const identifyUser = require("../middlewares/auth.middleware")

const userRouter = express.Router()

/**
 * @route POST /api/users/follow/:userid
 * @description follow a user
 * @access private
 */
userRouter.post("/follow/:username", identifyUser, userController.followUserController);


/**
 * @route POST /api/users/unfollow/id
 * @description unfollow a user
 * @access private
 */
userRouter.post("/unfollow/:username",identifyUser,userController.unfollowUserController)


/**
 * @route POST /api/users/accept 
 * @description this will be made by the followee jisko request recieve hui hai
 */
userRouter.post("/acceptrequest/:username",identifyUser,userController.acceptRequestController)






/**
 * @route POST /api/users/reject 
 * @description this will be made by the followee jisko request recieve hui hai
 */
userRouter.post("/rejectrequest/:username",identifyUser,userController.acceptRequestController)




module.exports = userRouter