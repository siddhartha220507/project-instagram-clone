const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    caption:{
        type:String,
        default:"",
    },
    imageUrl :{
        type:String,
        required:[true,"imageUrl is required for Creating a Post"]
    },
    user :{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:[true,"user is required for creating a post"]
    }
})

module.exports = postModel