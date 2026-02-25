const postModel = require("../models/post.model")
const jwt = require("jsonwebtoken")
const imageKit = require("@imagekit/nodejs/index.js")
const { toFile } = require("@imagekit/nodejs/index.js")


const imagekit = new imageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})




async function createPostController(req, res) {

    const file = await imagekit.files.upload({
        file: await toFile(req.file.buffer, req.file.originalname), // ✅ real buffer with real name
        fileName: req.file.originalname, // ✅ original name with extension e.g. photo.jpg
    });

    const post = await postModel.create({
        caption: req.body.caption,
        imageUrl: file.url,
        user: decoded.id
    })

    res.status(201).json({
        message: "post created successfully",
        post
    })
}

async function getPostController(req, res) {
    const userId = req.userId
    const posts = await postModel.find({
        user: userId
    })

    res.status(200)
        .json({
            message: "Posts fetched successfully.",
            posts
        })

}

async function getPostDetailsController(req, res) {


    const postId = req.params.postId

    const post = await postModel.findById(postId)

    if (!post) {
        return res.status(404).json({
            message: "Post not found."
        })
    }

    const isValidUser = post.user.toString() === userId

    if (!isValidUser) {
        return res.status(403).json({
            message: "Forbidden Content."
        })
    }

    return res.status(200).json({
        message: "Post fetched  successfully.",
        post
    })

}

async function likePostController(req,res) {  
}


async function getFeedController(req, res) {
    try {
        const posts = await postModel
            .find()
            .populate("user")

        res.status(200).json({
            message: "Posts fetched successfully",
            posts
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch posts",
            error: error.message
        });
    }
}

module.exports = {
    createPostController,
    getPostController,
    getPostDetailsController,
    getFeedController
}