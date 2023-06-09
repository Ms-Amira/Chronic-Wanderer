const Post = require("../models/post");

module.exports = {
  index,
  create,
  deletePost,
};

async function index(req, res) {
  try {
    const posts = await Post.find({}).populate("user").exec();
    res.status(200).json({ posts: posts });
  } catch (err) {}
}

const S3 = require("aws-sdk/clients/s3");
const s3 = new S3();
const { v4: uuidv4 } = require("uuid");
const BUCKET_NAME = process.env.BUCKET;

function create(req, res) {
  console.log(req.body, req.file, req.user);

  const filePath = `chronicwanderer/posts/${uuidv4()}-${req.file.originalname}`;
  const params = { Bucket: BUCKET_NAME, Key: filePath, Body: req.file.buffer };

  s3.upload(params, async function (err, data) {
    if (err) {
      console.log(
        err,
        "Either your bucket name is wrong or your keys arent correct"
      );
      res.status(400).json({ error: "Error from aws, check your terminal" });
    }

    try {
      const post = await Post.create({
        body: req.body.body,
        user: req.user,
        photoUrl: data.Location,
        location: req.body.location,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
      });
      await post.populate("user");
      res.status(201).json({ data: post });
    } catch (err) {
      res.status(400).json({ error: err });
    }
  });
}

async function deletePost(req, res) {
  try {
    const data = await Post.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });
    res.json({ data: "post removed" });
  } catch (err) {
    res.status(400).json({ error: err });
  }
}
