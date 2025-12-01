const Profile = require('../models/ProfileModel')
const mongoose = require('mongoose')
const Post = require('../models/PostModel')


const getUserInfo = async (req, res) => { //will return fname, lname, and username upon username input
  //using usernmae as each user has a unique one
  const {username} = req.params

  const user = await Profile.findOne({ username : username })
  

  if (!user){
    return res.status(404).json({ error: "user not found"});
  }

  //return associated values
  res.status(200).json({
    firstName : user.firstName,
    lastName : user.lastName,
    username : user.username,
  });

}

// List saved posts for a user (by username)
const getSavedPosts = async (req, res) => {
  const { username } = req.params
  try {
    const user = await Profile.findOne({ username }).populate('savedPosts')
    if (!user) return res.status(404).json({ error: 'user not found' })
    return res.status(200).json({ savedPosts: user.savedPosts })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Failed to fetch saved posts' })
  }
}

// Remove a saved post from user's savedPosts (by username)
const deleteSavedPost = async (req, res) => {
  const { username, postId } = req.params
  if (!postId || !mongoose.Types.ObjectId.isValid(postId)) return res.status(400).json({ error: 'Invalid post id' })
  try {
    const user = await Profile.findOneAndUpdate({ username }, { $pull: { savedPosts: postId } }, { new: true })
    if (!user) return res.status(404).json({ error: 'user not found' })
    return res.status(200).json({ savedPosts: user.savedPosts })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Failed to remove saved post' })
  }
}

// Add a post to user's savedPosts (idempotent). Accepts postId in URL param or body.
const addToSavedPosts = async (req, res) => {
  const { username } = req.params
  const postId = req.params.postId || req.body.postId
  if (!postId || !mongoose.Types.ObjectId.isValid(postId)) return res.status(400).json({ error: 'Invalid post id' })

  try {
    const post = await Post.findById(postId)
    if (!post) return res.status(404).json({ error: 'post not found' })

    const user = await Profile.findOneAndUpdate({ username }, { $addToSet: { savedPosts: postId } }, { new: true, upsert: true }).populate('savedPosts')
    if (!user) return res.status(404).json({ error: 'user not found' })
    return res.status(200).json({ savedPosts: user.savedPosts })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Failed to save post to profile' })
  }
}

module.exports = {
  getUserInfo,
  getSavedPosts,
  deleteSavedPost,
  addToSavedPosts,
}
const addSavedPost = async (req, res) => {
    const { username } = req.params
    // accept postId either in body or as a path param (for clients that send it in the URL)
    const postId = req.body.postId || req.params.postId

    if (!postId || !mongoose.Types.ObjectId.isValid(postId)) return res.status(400).json({ error: 'Invalid post id' })

    const post = await Post.findById(postId)
    if (!post) return res.status(404).json({ error: 'post not found' })

    try {
        const user = await Profile.findOneAndUpdate(
            { username },
            { $addToSet: { savedPosts: postId } },
            { new: true }
        ).populate('savedPosts')

        if (!user) return res.status(404).json({ error: 'user not found' })
        return res.status(200).json({ savedPosts: user.savedPosts })
    } catch (err) {
        console.error(err)
        return res.status(500).json({ error: 'Failed to save post to profile' })
    }
}

module.exports = {
  getUserInfo,
  getSavedPosts,
  deleteSavedPost,
  addToSavedPosts
}