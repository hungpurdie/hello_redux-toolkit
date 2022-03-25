const Redis = require('ioredis');

const redisClient = new Redis({
  port: process.env.REDIS_PORT,
  host: process.env.REDIS_HOST,
  password: process.env.REDIS_PASSWORD,
});

redisClient.on('error', function (err) {
  if (err.code == 'ECONNREFUSED') {
    redisClient.disconnect();
    return;
  } else console.log('Redis error: ' + err.message);
});

redisClient.on('connect', () => {
  console.log('Redis client connected');
});

redisClient.on('ready', () => {
  console.log('Redis client is ready');
});

redisClient.on('error', (error) => {
  console.log('Redis client has error: ' + error);
});

module.exports = redisClient;
