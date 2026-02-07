const express = require("express");
const jwt = require("jsonwebtoken")
const userModel = require("../models/user.model")

const authRouter = express.Router()

authRouter.post("/register", async (req,res) => {

    const {name, email, password } = req.body

    const userExists = await userModel.findOne({email})

    if (userExists){
        return res.status(400).json({
            message:"user already exists with this email id"
        })
    }


    


    const user = await userModel.create(
        {name,email,password}
    )

    const token = jwt.sign(
        {
            id: user._id,
            email: user.email
        },
        process.env.JWT_SECRET
    )

    res.cookie("jwt_token", token)

    res.status(201).json({
        message:"user registered",
        user,
        token
    })
})

module.exports = authRouter