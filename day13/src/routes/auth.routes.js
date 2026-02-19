const express = require("express");
const saltRounds = 10;
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const userModel = require("../models/user.model")

const authRouter = express.Router()

authRouter.post("/register", async (req,res) => {

    const {name, email, password } = req.body

    const userExists = await userModel.findOne({email})

    if (userExists){
        return res.status(409).json({
            message:"user already exists with this email id"
        })
    }

    const hashedPassword = bcrypt.hashSync(password, saltRounds);

    const user = await userModel.create(
        {name,email,password:hashedPassword}
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

authRouter.post("/login", async (req,res) =>{
    const {email , password} = req.body

    const user = await userModel.findOne({email})

    if(!user){
        return res.status(409).json({
            message:"this email id is not registered"
        })
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password)

    if(!isPasswordMatch){
        return res.status(401).json({
            message:"wrong password"
        })
    }

    const token = jwt.sign({
        id : user._id
    },process.env.JWT_SECRET)

    res.status(200).json({
        message:"logged in successfully",
        token
    })
})

module.exports = authRouter
