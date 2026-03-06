const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username :{
        type : String,
        required : [true, "username is required"],
        unique : [true, "username must be unique"],
    },
    email :{
        type : String,
        required : [true, "username is required"],
        unique : [true, "username must be unique"],        
    },
    password: {
        type: String,
        required: [ true, "Password is required" ],
        select: false
        // select false means do not return this field while fetching documents from the database. 
        // untill some route specifically selects > .select("+password")
    }
})

const userModel = mongoose.model("user",userSchema);

module.exports = userModel;
