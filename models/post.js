const mongoose = require('mongoose');

const commentsSchema = mongoose.Schema({
    username: String,
    comments: String
})

const postSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    photoUrl: String,
    body: String,
    location: String,
    comments: [commentsSchema]
})

module.exports = mongoose.model('Post', postSchema);