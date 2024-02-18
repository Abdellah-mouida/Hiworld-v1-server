let express = require("express");
const Post = require("../modules/Post");
const User = require("../modules/User");
let router = express.Router();

router.get("/", async (req, res) => {
  try {
    let posts = await Post.find().populate("user");
    res.send(posts);
  } catch (err) {
    console.log(err);
  }
});

router.post("/", async (req, res) => {
  let { description, image, user } = req.body;

  if (!description && !image) {
    res
      .status(400)
      .send("Please Make Sure to field out either image or Description");
    return;
  }

  try {
    let newPost = new Post({
      description: description,
      image: image,
      user: user,
    });
    let post = await newPost.save();
    let current = await User.findById(user);
    current.posts.push(post._id);
    await current.save();
    res.status(201).send("Post Created Succssfully");
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
