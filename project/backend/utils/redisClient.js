// backend/utils/redisClient.js

const Redis = require('ioredis');

// You can customize the config here if needed (e.g., for Docker or production)
const redis = new Redis(); // Defaults to localhost:6379

redis.on('connect', () => {
  console.log('✅ Redis client connected');
});

redis.on('error', (err) => {
  console.error('❌ Redis error:', err);
});

module.exports = redis;
