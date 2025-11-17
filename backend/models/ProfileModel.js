const mongoose = require('mongoose')

const Schema = mongoose.Schema

const profileSchema = new Schema({
  firstName: {
    type: String,
    required: true //enforces this field
  },

  lastName: {
    type: String,
    required: true,
  },

  username: {
    type: String,
    required: true,
    unique: true, //each user must have a unique username, but first/names can overlap
  },

<<<<<<< HEAD
=======
  savedPosts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
}],
>>>>>>> 5695a71 (Saved posts backend schema based on Gokul's impl)
  //do i need to ad a profileID, similar to postID from the example?

}, {timestamps: true})

<<<<<<< HEAD
module.exports = mongoose.model('Profile', profileSchema)
=======
module.exports = mongoose.model('Profile', profileSchema)
>>>>>>> 5695a71 (Saved posts backend schema based on Gokul's impl)
