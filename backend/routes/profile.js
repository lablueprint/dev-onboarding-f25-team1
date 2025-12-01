const express = require('express');
const {
  getUserInfo,
  getSavedPosts,
  deleteSavedPost,
  addToSavedPosts
} = require('../controllers/profileController');

const router = express.Router();


//general routes
router.get('/:username', getUserInfo);
router.get('/:username/saved-posts', getSavedPosts);
router.delete('/:username/saved-posts/:postId', deleteSavedPost);
router.post('/:username/saved-posts/:postId', addToSavedPosts);

module.exports = router;