const followModel = require("../models/follow.model")
const userModel = require("../models/user.model")



async function followUserController(req,res) { 
    const followerUsername = req.user.username
    const followeeUsername = req.params.username


    if (followerUsername === followeeUsername) {
        return res.status(400).json({
            message: "You cannot follow yourself"
        })
    }
    const isFolloweeExist = await userModel.findOne({
        username : followeeUsername
    })

    if(!isFolloweeExist){
        return res.status(404).json({
            message : "user that you are trying to follow doesn't exist"
        })
    }

    const isAlreadyFollowing = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername,
        status: "accepted"
    })

    if (isAlreadyFollowing) {
        return res.status(200).json({
            message: `You are already following ${followeeUsername}`,
        })
    }



    const isAlreadyRequested = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername,
        status: "pending"
    })



    if (isAlreadyRequested) {
        return res.status(200).json({
            message: `You are already requested to follow ${followeeUsername}`,
            follow: isAlreadyRequested
        })
    }



    const followRecord = await followModel.create({
        follower: followerUsername,
        followee: followeeUsername,
        status : "pending"
    })

    res.status(201).json({
        message : `you have requested to follow ${followeeUsername}`
    })
   

}

async function unfollowUserController(req, res) {
    const followerUsername = req.user.username
    const followeeUsername = req.params.username

    const isUserFollowing = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername,
    })

    if (!isUserFollowing) {
        return res.status(200).json({
            message: `You are not following ${followeeUsername}`
        })
    }

    await followModel.findByIdAndDelete(isUserFollowing._id)

    res.status(200).json({
        message: `You have unfollowed ${followeeUsername}`
    })
}

async function acceptRequestController(req,res) {
    const followerUsername = req.params.username
    const followeeUsername = req.user.username

    const isAlreadyAccepted = await followModel.findOne({
        follower : followerUsername,
        followee : followeeUsername,
        status : "accepted"
    })

    if(isAlreadyAccepted){
        return res.status(409).json({
            message : "User already follows you "
        })
    }

    const isRequestExists = await followModel.findOne({
        follower : followerUsername,
        followee : followeeUsername,
        status : "pending"
    })

    if(!isRequestExists){
        return res.status(404).json({
            message : "user has not requested to follow you"
        })
    }

    await followModel.findOneAndUpdate(
        {
            follower : followerUsername,
            followee : followeeUsername
        },
        {
            $set : {
                status : "accepted"
            }
        }
    )

    return res.status(200).json({
        message : `${followerUsername} now follows you`
    })


}

// followee is the person who can accept or reject the request
async function rejectRequestController(req,res) {
    const followerUsername = req.params.username
    const followeeUsername = req.user.username

    const isAlreadyAccepted = await followModel.findOne({
        follower : followerUsername,
        followee : followeeUsername,
        status : "rejected"
    })

    if(isAlreadyAccepted){
        return res.status(409).json({
            message : "you have already rejected the request "
        })
    }

    const isRequestExists = await followModel.findOne({
        follower : followerUsername,
        followee : followeeUsername,
        status : "pending"
    })

    if(!isRequestExists){
        return res.status(404).json({
            message : "user has not requested to follow you"
        })
    }

    await followModel.findOneAndUpdate(
        {
            follower : followerUsername,
            followee : followeeUsername,
            status : "pending"
        },
        {
            $set : {
                status : "rejected"
            }
        }
    )

    return res.status(200).json({
        message : `you have rejected the request successfully`
    })


}




module.exports = {
    followUserController,
    unfollowUserController,
    acceptRequestController,
    rejectRequestController
}