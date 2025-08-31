const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  picture: {
    type: String,
    default: 'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg',
  },
});

// Encrypt password before saving (pre-save hook)
userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Generate JWT token
userSchema.methods.getJWTToken = function() {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  });
};

// Compare password
userSchema.methods.isValidatedPassword = async function(userSentPassword) {
  return await bcrypt.compare(userSentPassword, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
