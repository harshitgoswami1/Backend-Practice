const mongoose = require("mongoose")

const postSchema = mongoose.Schema({
    caption : {
        type:String,
        default:""
    },
    imageUrl : {
        type:String,
        required:[ true, "Image url is required for creating a post"]
    },
    user : {
        ref : "User",
        type : mongoose.Schema.Types.ObjectId,
        required : [ true, "User id is required for creating a post"]
    }
})


const postModel = mongoose.model("Post",postSchema)
module.exports = postModel