let express = require("express");
const User = require("../modules/User");
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

router.get("/:id", async (req, res) => {
  let { id } = req.params;
  try {
    let user = await User.findById(id).populate("posts");
    res.send(user);
  } catch (err) {
    res.send("Internal Server Error");
  }
});

module.exports = router;
