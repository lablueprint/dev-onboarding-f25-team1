// const express = require("express");
// const router = express.Router();
const Comment = require("../models/CommentModel");

// creating a comment
const createComment = async (req, res) => {
    console.log("Incoming POST to /comments:", req.body); 
    try {
        console.log("incoming comment post", req.body);
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

module.exports = {
    createComment,
    getCommentsForPost
};
