// middleware/auth.js
const jwt = require('jsonwebtoken');
const prisma = require('../config/db'); // ✅ Prisma client
const redisClient = require('../utils/redisClient'); // ✅ Redis for blacklist

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // ✅ Check Redis blacklist
    const isBlacklisted = await redisClient.get(`bl_${token}`);
    if (isBlacklisted) {
      return res.status(401).json({ message: 'Token is blacklisted. Please login again.' });
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // ✅ Use Prisma to fetch user (excluding password)
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true
      }
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error('Token verification error:', err);
    return res.status(403).json({ message: 'Forbidden: Invalid or expired token' });
  }
};

module.exports = verifyToken;
