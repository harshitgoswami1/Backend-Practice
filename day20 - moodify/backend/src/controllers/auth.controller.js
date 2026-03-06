const userModel = require("../models/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")





async function registerController(req, res) {

    try {
        const { email, username, password, bio, profileImage } = req.body;

        const isUserExists = await userModel.findOne({
            $or: [{ username }, { email }]
        });

        if (isUserExists) {
            return res.status(409).json({
                message: "User already exists"
            });
        }

        const hash = await bcrypt.hash(password, 10);

        const user = await userModel.create({
            username,
            email,
            bio,
            profileImage,
            password: hash
        });

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,  // true in production
        });

        res.status(201).json({
            message: "User registered successfully",
            user
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
}


async function loginController(req, res) {
    try {
        // console.log(req.body)
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                message: "Username and password are required"
            });
        }

        const user = await userModel.findOne({ username }).select("+password");

        if (!user) {
            return res.status(400).json({
                message: "Invalid credentials"
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({
                message: "Invalid credentials"
            });
        }

        const token = jwt.sign(
            { 
                id: user._id,
                username : user.username 
            },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: false, // true in production (HTTPS)
        });

        res.status(200).json({
            message: "Login successful",
            user
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
}




async function getMeController(req, res) {
    try {
        const token = req.cookies.token;

        if (!token) { 
            return res.status(401).json({
                message: "Unauthorized access"
            });
        }

        // Decode & verify token - this will give us the verified token.
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const username = decoded.username;

        const user = await userModel.findOne({ username });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        return res.status(200).json({
            message: "The user details are as follows",
            user
        });

    } catch (err) {
        return res.status(401).json({
            message: "Invalid or expired token",
            error: err.message
        });
    }
}

async function logoutController(req,res){
    const token = req.cookies.token

    res.clearCookie();
    
}




module.exports = {
    registerController,
    loginController,
    getMeController
}