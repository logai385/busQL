const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");
const Post = require("../model/Post");

// @route DELTE api/posts
// @desc Delete post
// @access Private
router.put("/:id", verifyToken, async (req, res) => {
    try{
        const postDeleteCondition = {_id: req.params.id, user: req.userId};
        const deletedPost = await Post.findOneAndDelete(postDeleteCondition);
        if(!deletedPost){
            return res.status(404).json({success: false, message: "Post not found or user not authorized"});
        }
        res.json({success: true, message: "Post deleted successfully", deletedPost});
    }catch(err){
        console.error(err.message);
        return res.status(500).json({success:false, message: "server error"});
    }
})
// @route POST api/posts
// @desc Update a post
// @access Private

router.put("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  const { title, description, url, status } = req.body;
  if (!title) {
    return res
      .status(400)
      .json({ success: false, message: "Please enter title" });
  }
  try {
    let updatedPost = {
      title,
      description: description || "",
      url: (url.startsWith("http://") ? url : `http://${url}`) || "",
      status: status || "TO LEARN",
    };
    const postUpdateCondition = { _id: id, user: req.userId };
    updatedPost = await Post.findOneAndUpdate(
      postUpdateCondition,
      updatedPost,
      { new: true }
    );
    // User not authorized to update post
    if(!updatedPost) {
        return res.status(401).json({ success: false, message: "post not found or user not authorized" });
    }
    return res.json({ success: true, message: "update post seccessfully" , updatedPost });
  } catch (err) {
    return res.status(500).json({ success: false, message: "server error" });
  }
});

// @route GET api/posts
// @desc Get all posts
// @access private
router.get("/", verifyToken, async (req, res) => {
  try {
    const posts = await Post.find({ user: req.userId }).populate("user", [
      "username",
    ]);
    res.json({ succcess: true, posts });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route POST api/posts
// @desc Create a post
// @access private
router.post("/", verifyToken, async (req, res) => {
  let { title, description, url, status } = req.body;

  // Simple validation
  if (!title) {
    return res
      .status(400)
      .json({ success: false, message: "Please enter a title" });
  }
  try {
    const newPost = new Post({
      title,
      description,
      url: url.startsWith("http://") ? url : `http://${url}`,
      status: status || "TO LEARN",
      user: req.userId,
    });
    await newPost.save();
    res
      .status(200)
      .json({ success: true, message: "Happy learning", data: newPost });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
