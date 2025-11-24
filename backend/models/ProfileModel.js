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

  //do i need to ad a profileID, similar to postID from the example?

}, {timestamps: true})

module.exports = mongoose.model('Profile', profileSchema)
