const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:[true,"username already exists"]
    },
   email:{
    type:String,
    required:true,
    unique:[true,"email already exists"]
},
password:{
    type:String,
    required:true
},
bio:{
    type:String,
    default: ""
},
ProfilePic:{
    type:String,
    default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
}
})

const userModel = mongoose.model("users",userSchema)

module.exports = userModel