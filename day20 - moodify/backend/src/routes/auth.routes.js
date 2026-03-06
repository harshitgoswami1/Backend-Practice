const { Router } = require("express")
const authController = require("../controllers/auth.controller")



const authRouter = Router();

/**
 * @POST /api/auth/login
 */
authRouter.post("/login",authController.loginController)


/**
 * @POST /api/auth/register
 * @description register a new user into the database
 */
authRouter.post("/register",authController.registerController)



/**
 * @GET /api/auth/getme
 */
authRouter.get("/getme",authController.getMeController)


module.exports = authRouter