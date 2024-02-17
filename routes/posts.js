let express = require("express");
const Post = require("../modules/Post");
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
    await newPost.save();
    console.log(user);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
