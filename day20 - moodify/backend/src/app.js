const express = require("express");
const cookieParser = require("cookie-parser")
const connectDB = require("./config/database")




const authRoutes = require("./routes/auth.routes")



connectDB();
const app = express();
app.use(express.json());
app.use(cookieParser());




app.use("/api/auth",authRoutes)




module.exports = app;
