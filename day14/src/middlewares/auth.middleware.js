const jwt = require("jsonwebtoken")

async function identifyUser(req,res,next) {
    const token = req.cookies.token

    if(!token){
        return res.status(400).json({
            message:"token not found, unauthorized access"
        })
    }

    try {
        decoded = jwt.verify(token,process.env.JWT_SECRET)
    } catch (error) {
        return res.status(401).json({
            message:"user not authorized"
        })
    }

    req.user = decoded

    next()
}

module.exports = identifyUser