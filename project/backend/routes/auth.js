const express = require('express');
const router = express.Router();

// ✅ Import controllers
const {
  registerUser,
  loginUser,
  logoutUser
} = require('../controllers/authController');

// ✅ Import JWT middleware
const verifyToken = require('../middleware/auth'); // not isAuthenticated

// ✅ Register a new user
router.post('/register', registerUser);

// ✅ Login
router.post('/login', loginUser);

// ✅ Protected profile route — uses JWT verification
router.get('/profile', verifyToken, (req, res) => {
  res.status(200).json({
    message: 'Welcome to your profile',
    user: req.user,
  });
});

// ✅ Logout — blacklist access token + clear cookie
router.post('/logout', logoutUser);

module.exports = router;
