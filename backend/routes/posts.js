const express = require('express');
const {
    getAllPosts, 
    getPost,
    createPost,
    deletePost,
    getIsLiked,
    toggleLike
} = require('../controllers/postController');

const router = express.Router();

// general routes
router.get('/', getAllPosts);
router.get('/:id', getPost);
router.get('/:id/liked', getIsLiked);
router.post('/', createPost);
router.delete('/:id', deletePost);
router.post('/:id/like', toggleLike);
module.exports = router;
