const mongoose = require('mongoose');

const commentsSchema = mongoose.Schema({
    username: String,
    comments: String
})

const postSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    photoUrl: String,
    caption: String,
    location: String,
    comments: [commentsSchema]
})