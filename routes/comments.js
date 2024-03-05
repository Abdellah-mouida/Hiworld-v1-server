let express = require("express");
const Comment = require("../modules/Comment");
const Post = require("../modules/Post");
const User = require("../modules/User");
let router = express.Router();

router.get("/:postId", async (req, res) => {
  try {
    let comments = await Comment.find({ post: req.params.postId })
      .populate("user")
      .populate("post");
    res.send(comments);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server ERROR");
  }
});

router.post("/", async (req, res) => {
  let { content, user, post } = req.body;
  try {
    let newComment = new Comment({
      user: user,
      post: post,
      content: content,
    });
    await newComment.save();

    res.send("Comment Added");
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
