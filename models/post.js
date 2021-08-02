const mongoose = require('mongoose');
const commentShema = require('./comment');
const Schema = mongoose.Schema;

// **************** Post
const postSchema = new mongoose.Schema( {
    text: String,
    imageUrl: String,
}, { timestamps: true });

module.exports = mongoose.model("Post", postSchema);