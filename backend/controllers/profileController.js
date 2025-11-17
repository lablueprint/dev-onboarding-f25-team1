const Profile = require('../models/ProfileModel')
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

module.exports = {
  getUserInfo,
}