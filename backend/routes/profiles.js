const express = require('express');
const {
  getUserInfo,
  getLoginInfo,
} = require('../controllers/profileController');

const router = express.Router();

//general routes
router.get('/login/:username', getLoginInfo)
router.get('/:username', getUserInfo);
module.exports = router;