const Post = require('../models/PostModel')
const mongoose = require('mongoose')

// get all posts
const getAllPosts = async (req, res) => {
  const posts = await Post.find({}).sort({createdAt: -1})
  res.status(200).json(posts)
}

// get a single post
const getPost = async(req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({ error: "post not found" })
  }

  const post = await Post.findById(id)
  if (!post) {
    return res.status(404).json({ error: "post not found" })
  }

  res.status(200).json(post)
}

// create a new Post
const createPost = async (req, res) => {
  try {
    console.log('req.body', req.body)
    const post = await Post.create(req.body) 
    res.status(200).json(post)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// delete a post
const deletePost = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({ error: "post not found" })
  }

  const post = await Post.findOneAndDelete({ _id: id })
  
  if (!post) {
    return res.status(404).json({ error: "post not found" })
  }

  res.status(200).json(post)
}

//toggle like on a post 
const toggleLike = async (req, res) => {
  const { id } = req.params
  const userId = req.body && req.body.userId

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "post not found" })
  }

  if (!userId) {
    return res.status(400).json({ error: "userId is required in request body" })
  }
  
  const post = await Post.findById(id)
  if (!post) {
    return res.status(404).json({ error: "post not found" })
  }

  const isLiked = post.likedBy.includes(userId)
  const updatedPost = await Post.findByIdAndUpdate(
    id,
    isLiked
      ? { $pull: { likedBy: userId } }  // Unlike
      : { $addToSet: { likedBy: userId } }, // Like
    { new: true }
  )
  res.status(200).json(updatedPost)
}


module.exports = {
    getAllPosts,
    getPost,
    createPost,
    deletePost,
    toggleLike
}
