const User = require('../models/SignupModel');

async function createUser(req, res) {
  try {
    const { firstName, lastName, username, password } = req.body;

    if (!firstName || !lastName || !username || !password) {
      return res.status(400).json({ error: 'Please fill out all fields.' });
    }

    const user = await User.create({
      firstName,
      lastName,
      username,
      password,
    });

    return res.status(201).json({
      message: 'User created.',
      user,
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error creating user.' });
  }
}

module.exports = { createUser };