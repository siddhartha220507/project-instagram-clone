const mongoose = require('mongoose')

const followSchema = new mongoose.Schema({
    follower: {
        type: String,
        ref: "users",
        required: [true, "follower is required to follow a user"]
    },
    followee: {
        type: String,
        ref: "users",
        required: [true, "followee is required to follow a user"]
    }
}, {
    timestamps: true
})
followSchema.index({ follower: 1, followee: 1 }, { unique: true })
const followModel = mongoose.model("follows", followSchema)     

module.exports = followModel