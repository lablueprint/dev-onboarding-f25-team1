const express = require("express");
const router = express.Router();
const { createComment, getCommentsForPost, deleteComment } = require("../controllers/commentController")

// creating/posting a comment
router.post('/', createComment);

// get comments for a post
router.get('/:postID', getCommentsForPost);

// delete comment for a post
router.delete('/:id', deleteComment);

module.exports = router;
