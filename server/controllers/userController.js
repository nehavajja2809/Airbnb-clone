const User = require('../models/User');
const cookieToken = require('../utils/cookieToken');
const bcrypt = require('bcryptjs');
const cloudinary = require('cloudinary').v2;

// ------------------------ REGISTER USER ------------------------
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already registered!' });
    }

    // Store plain password; pre-save hook will hash it
    user = await User.create({ name, email, password });

    cookieToken(user, res);
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ message: 'Internal server error', error: err });
  }
};

// ------------------------ LOGIN USER ------------------------
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User does not exist!' });
    }

    // Compare plain password with hashed password
    const isPasswordCorrect = await user.isValidatedPassword(password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Email or password is incorrect!' });
    }

    cookieToken(user, res);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error', error: err });
  }
};

// ------------------------ GOOGLE LOGIN ------------------------
exports.googleLogin = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required' });
    }

    let user = await User.findOne({ email });

    if (!user) {
      const randomPassword = Math.random().toString(36).slice(-8);

      // pre-save hook will hash this password
      user = await User.create({ name, email, password: randomPassword });
    }

    cookieToken(user, res);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error', error: err });
  }
};

// ------------------------ UPDATE USER ------------------------
exports.updateUserDetails = async (req, res) => {
  try {
    const { name, password, email, picture } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (name) user.name = name;
    if (picture) user.picture = picture;
    if (password) user.password = password; // pre-save hook will hash

    const updatedUser = await user.save();
    cookieToken(updatedUser, res);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error', error: err });
  }
};

// ------------------------ UPLOAD PICTURE ------------------------
exports.uploadPicture = async (req, res) => {
  try {
    const { path } = req.file;

    const result = await cloudinary.uploader.upload(path, { folder: 'Airbnb/Users' });

    res.status(200).json({ url: result.secure_url });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error', error: err });
  }
};

// ------------------------ LOGOUT USER ------------------------
exports.logout = async (req, res) => {
  res.cookie('token', null, {
    expires: new Date(Date.now()),
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
  });

  res.status(200).json({ success: true, message: 'Logged out' });
};
