const slowDown = require('express-slow-down');

const speedLimiter = slowDown({
  windowMs: 5 * 60 * 1000,
  delayAfter: 200,
  delayMs: 500,

  maxDelayMs: 20000,
  skip: () => {
    const isDev = process.env.NODE_ENV !== 'production';
    return isDev;
  },
});

module.exports = speedLimiter;
