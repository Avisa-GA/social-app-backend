const mongoose = require('mongoose');
const commentShema = require('./comment');
const Schema = mongoose.Schema;

// **************** Post
const postSchema = new mongoose.Schema( {
    text: String,
    imageUrl: String,
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    comments: [commentShema],
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
}, { timestamps: true });

module.exports = mongoose.model("Post", postSchema);