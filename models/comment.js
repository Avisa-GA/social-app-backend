const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// ***************** Comment
module.exports = new mongoose.Schema( {
    text: String,
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true });