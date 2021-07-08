const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// ****************** User
const userSchema = new mongoose.Schema( {
    avatarUrl: String,
    firstName: String,
    lastName: String,
    firebaseUid: String,
    email: String,
    password: String,
    bio: String,
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema);