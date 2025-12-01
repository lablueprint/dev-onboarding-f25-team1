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

// check if a post is liked by a user
const getIsLiked = async (req, res) => {
  const { id } = req.params
  const userId = req.query && req.query.userId

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "post not found" })
  }

  if (!userId) {
    return res.status(400).json({ error: "userId is required as query param" })
  }
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: "invalid userId" })
  }

  const post = await Post.findById(id)
  if (!post) {
    return res.status(404).json({ error: "post not found" })
  }

  const userObjectId = new mongoose.Types.ObjectId(userId)
  const likedBy = Array.isArray(post.likedBy) ? post.likedBy : []
  const isLiked = likedBy.some((u) => u.equals(userObjectId))
  return res.status(200).json({ isLiked })
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
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: "invalid userId" })
  }
  
  const post = await Post.findById(id)
  if (!post) {
    return res.status(404).json({ error: "post not found" })
  }
  //MongoDB stores id fields as ObjectId type, so we need to convert the userId string to ObjectId for comparison
  const userObjectId = new mongoose.Types.ObjectId(userId)
  const isLiked = post.likedBy.some((u) => u.equals(userObjectId))
  const updatedPost = await Post.findByIdAndUpdate(
    id,
    isLiked
      ? { $pull: { likedBy: userObjectId } }  // Unlike
      : { $addToSet: { likedBy: userObjectId } }, // Like
    { new: true }
  )
  res.status(200).json(updatedPost)
}


module.exports = {
    getAllPosts,
    getPost,
    createPost,
    deletePost,
  getIsLiked,
  toggleLike
}
