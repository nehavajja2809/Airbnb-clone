const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.isLoggedIn = async (req, res, next) => {
  try {
    let token;

    // Check cookie first
    if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    } 
    // If not in cookie, check Authorization header
    else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      token = req.headers.authorization.replace('Bearer ', '');
    }

    // If no token found
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Login first to access this page',
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    console.error('JWT verification error:', error);
    return res.status(401).json({
      success: false,
      message: 'Invalid Token',
    });
  }
};
