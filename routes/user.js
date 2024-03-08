let express = require("express");
const User = require("../modules/User");
const Post = require("../modules/Post");

let router = express.Router();

router.post("/:id/profile", async (req, res) => {
  let { id } = req.params;

  let { profile } = req.body;

  if (!id || !profile) {
    res.status(400).send("Please Make sure to change You Profile Proprly");
    return;
  }
  try {
    let user = await User.findById(id);
    user.profile = profile;
    await user.save();
    res.status(200).send("You Profile Has been Change Seccssfully");
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

router.get("/public/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ SERIAL_CODE: id }).populate({
      path: "posts",
      populate: {
        path: "user",
      },
    });
    res.send({ user });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/:id/saved", async (req, res) => {
  try {
    let { id } = req.params;
    let posts = await Post.find({ saver: id }).populate("user");

    res.send(posts);
  } catch (err) {
    res.status(500).send(err);
  }
});
router.get("/:id/posts", async (req, res) => {
  let { id } = req.params;
  try {
    let posts = await Post.find({ user: id }).populate("user");
    res.send(posts);
  } catch (err) {
    res.send(err);
  }
});

// FOLLOW
router.post("/:id/following/:targetId", async (req, res) => {
  let { id, targetId } = req.params;
  try {
    let currentUser = await User.findById(id);
    let targetUser = await User.findById(targetId);

    currentUser.following.push(targetId);
    targetUser.followers.push(id);

    await currentUser.save();
    await targetUser.save();
    res.send("Succss Prosscc");
  } catch (err) {
    res.send(err);
  }
});

// UNFOLLOW
router.delete("/:id/following/:targetId", async (req, res) => {
  let { id, targetId } = req.params;
  try {
    let currentUser = await User.findById(id);
    let targetUser = await User.findById(targetId);

    currentUser.following.splice(currentUser.following.indexOf(targetId), 1);
    targetUser.followers.splice(targetUser.followers.indexOf(id), 1);

    await currentUser.save();
    await targetUser.save();
    res.send("Succss Prosscc");
  } catch (err) {
    res.send(err);
  }
});
router.post("/:id/more-info", async (req, res) => {
  try {
    let { id } = req.params;
    let { gender, phoneNumber, birthDay, country, bio } = req.body;
    let user = await User.findById(id);
    user.gender = gender;
    user.phoneNumber = phoneNumber;
    user.birthDay = birthDay;
    user.country = country;
    user.bio = bio;
    await user.save();
    res.send("User INFO Added Succssfully");
  } catch (err) {
    res.send(err);
  }
});

router.get("/:id/more-info", async (req, res) => {
  try {
    let { id } = req.params;
    let user = await User.findById(id);
    let { gender, phoneNumber, birthDay, country, bio } = user;
    res.send({
      gender,
      phoneNumber,
      bio,
      country,
      birthDay: new Date(birthDay).toISOString().split("T")[0],
    });
  } catch (err) {
    res.send("Eoror");
  }
});

router.get("/:id", async (req, res) => {
  let { id } = req.params;
  try {
    let user = await User.findById(id);
    res.send({ user });
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
