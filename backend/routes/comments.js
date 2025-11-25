const express = require("express");
const router = express.Router();
const { createComment, getCommentsForPost } = require("../controllers/commentController")

// creating/posting a comment
router.post('/', createComment);

// get comments for a post
router.get('/:postID', getCommentsForPost);

module.exports = router;
