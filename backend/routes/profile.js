const express = require('express');
const {
  getUserInfo,
<<<<<<< HEAD
=======
  getSavedPosts,
  deleteSavedPost
>>>>>>> 5695a71 (Saved posts backend schema based on Gokul's impl)
} = require('../controllers/profileController');

const router = express.Router();

<<<<<<< HEAD

//general routes
router.get('/:username', getUserInfo);
=======
//general routes
router.get('/:username', getUserInfo);
router.get('/:username/saved', getSavedPosts);
router.post('/:username/saved/:postId', addToSavedPosts);
router.delete('/:username/saved/:postId', deleteSavedPost);
>>>>>>> 5695a71 (Saved posts backend schema based on Gokul's impl)

module.exports = router;