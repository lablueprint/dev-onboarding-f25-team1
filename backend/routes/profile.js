const express = require('express');
const {
  getUserInfo,
} = require('../controllers/profileController');

const router = express.Router();


//general routes
router.get('/:username', getUserInfo);

module.exports = router;