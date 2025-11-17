const Profile = require('../models/ProfileModel.js')
const mongoose = require('mongoose')


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

const getSavedPosts = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ error: "User not found" });
    }

    const user = await Profile.findById(id).populate('savedPosts');

    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
        savedPosts: user.savedPosts,
    });
}

const deleteSavedPost = async (req, res) => {
    const { id, postId } = req.params; 
    
    if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(postId)) {
        return res.status(404).json({ error: "User or post not found." });
    }

    const user = await Profile.findByIdAndUpdate(
        id,
        { $pull: { savedPosts: postId } }, // Remove postId from savedPosts array
        { new: true }
    );

    if (!user) {
        return res.status(404).json({ error: "User not found." });
    }

    res.status(200).json({ 
        savedPosts: user.savedPosts
    });
}

const addToSavedPosts = async (req, res) => {
    const { username, postId } = req.params;

    const user = await Profile.findOneAndUpdate(
        { username: username },
        { $addToSet: { savedPosts: postId } }, // Add postId to savedPosts array if not already present
        { new: true }
    );
    if (!user) {
        return res.status(404).json({ error: "User not found." });
    }
    res.status(200).json({ 
        savedPosts: user.savedPosts
    });
}

module.exports = {
  getUserInfo,
  getSavedPosts,
  deleteSavedPost,
  addToSavedPosts
}