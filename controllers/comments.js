const Post = require('../models/post')

module.exports - {
    create,
    deleteComment
}

async function create(req, res) {

    try {
        const post = await Post.findById(req.params.id)
        post.comment.push({username: req.user.username, comments: req.body});

    } catch(err) {
        res.status(400).json({err})
    }
}