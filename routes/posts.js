let express = require("express");
const Post = require("../modules/Post");
const User = require("../modules/User");
let router = express.Router();

// Send all Posts
router.get("/", async (req, res) => {
  try {
    let posts = await Post.aggregate([{ $sample: { size: 5 } }]).then(
      (rondomData) => {
        Post.populate(rondomData, { path: "user" }).then((data) =>
          res.send(data)
        );
      }
    );
  } catch (err) {
    console.log(err);
  }
});

// Create Post
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

// Add Like
router.put("/likes/:postId/:userId", async (req, res) => {
  let { postId, userId } = req.params;
  try {
    let post = await Post.findById(postId);
    // post.likes++;
    post.howLikeIt.push(userId);

    await post.save();

    res.status(201).send("Likes LIKED Succssfully");
  } catch (err) {
    console.log(err);
  }
});

// Dislike
router.delete("/likes/:postId/:userId", async (req, res) => {
  let { postId, userId } = req.params;
  try {
    let post = await Post.findById(postId);
    // post.likes++;
    post.howLikeIt.splice(post.howLikeIt.indexOf(userId), 1);

    await post.save();

    res.status(201).send("Likes DISLIKED Succssfully");
  } catch (err) {
    console.log(err);
  }
});
// Add to Saved
router.post("/saved/:userId/:postId", async (req, res) => {
  let { userId, postId } = req.params;

  try {
    let post = await Post.findById(postId);
    post.saver.push(userId);
    await post.save();
    res.send("User Added To Saved Succssefully");
  } catch (err) {
    res.status("ERROE PLEASE REFRESH YOUR PAGE");
  }
});
router.delete("/saved/:userId/:postId", async (req, res) => {
  let { userId, postId } = req.params;

  try {
    let post = await Post.findById(postId);
    post.saver.splice(post.saver.indexOf(userId), 1);
    await post.save();
    res.send("User Removed From Saved Succssefully");
  } catch (err) {
    res.status("ERROE PLEASE REFRESH YOUR PAGE");
  }
});

module.exports = router;
