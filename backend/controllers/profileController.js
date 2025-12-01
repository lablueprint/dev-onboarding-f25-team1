const Profile = require('../models/ProfileModel')


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

const getLoginInfo = async (req, res) => { 
  const {username} = req.params
  const password = req.query.password;
  try {
    const user = await Profile.findOne({ username : username })
    
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    if (user.password === password) {
      return res.json({success: true});
    }
    else {
      return res.json({success: false, message: "Incorrect password"});
    }
  }
  catch {
    return res.json({
      success: false,})
  }


}
module.exports = {
  getUserInfo,
  getLoginInfo
}