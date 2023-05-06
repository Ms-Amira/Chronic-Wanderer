const Post = require('../models/post');

module.exports = {
    index 
}

async function index(req, res) {
    try {
        const posts = await Post.find({}).populate
        ('user').exec()
        res.status(200).json({posts:posts})
    } catch(err) {
        
    }
}