const User = require("../models/user");
const Post = require("../models/post");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;

module.exports = {
  signup,
  login,
  profile,
};

const S3 = require("aws-sdk/clients/s3");
const s3 = new S3();
const { v4: uuidv4 } = require("uuid");
const BUCKET_NAME = process.env.BUCKET;

async function signup(req, res) {
  if (!req.file)
    return res.status(400).json({ error: "Please submit a photo" });
  const filePath = `chronicwanderer/${uuidv4()}-${req.file.originalname}`;
  const params = { Bucket: BUCKET_NAME, Key: filePath, Body: req.file.buffer };

  s3.upload(params, async function (err, data) {
    if (err) {
      console.log(
        err,
        "Either your bucket name is wrong or your keys arent correct"
      );
      res.status(400).json({ error: "Error from aws, check your terminal" });
    }
    const user = new User({ ...req.body, photoUrl: data.Location });
    try {
      await user.save();
      const token = createJWT(user);
      res.json({ token });
    } catch (err) {
      res.status(400).json({ error: err });
    }
  });
}

async function login(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) return res.status(401).json({ err: "bad credentials" });
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (isMatch) {
        const token = createJWT(user);
        res.json({ token });
      } else {
        return res.status(401).json({ err: "bad credentials" });
      }
    });
  } catch (err) {
    return res.status(401).json(err);
  }
}

async function profile(req, res) {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) return res.status(400).json({ error: "User not found" });

    const posts = await Post.find({ user: user._id }).populate("user").exec();
    res.status(200).json({ posts: posts, user: user });
  } catch (err) {
    console.log(err);
    res.status(400).json({ err });
  }
}

/*----- Helper Functions -----*/

function createJWT(user) {
  return jwt.sign(
    { user }, // data payload
    SECRET,
    { expiresIn: "24h" }
  );
}
