// const express = require("express");
// const router = express.Router();
// const { identifierToKeywordKind } = require("typescript");
const Comment = require("../models/CommentModel");

// creating a comment
const createComment = async (req, res) => {
    console.log("Incoming POST to /comments:", req.body); 
    try {
        const comment = await Comment.create(req.body);
        res.status(200).json(comment);
    } catch (err) {
        res.status(400).json({error: err.message });
    }
};

// get all comments for a post
const getCommentsForPost = async (req, res) => {
    try {
        const comments = await Comment.find({ postID: req.params.postID });
        res.status(200).json(comments);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// delete comment
const deleteComment = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Comment.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({error: "Comment not found"});
        }
        res.status(200).json({message: "Comment deleted: ", id})
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

module.exports = {
    createComment,
    getCommentsForPost, 
    deleteComment
};
