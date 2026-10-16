const rateLimitMap = new Map();

/**
 * Lightweight sliding window rate limiter middleware
 * Protects endpoints from automated spam and abuse without third-party dependencies.
 *
 * @param {object} options
 * @param {number} options.windowMs - Time window in milliseconds (default: 15 minutes)
 * @param {number} options.max - Maximum requests per window (default: 5)
 */
function rateLimiter({ windowMs = 15 * 60 * 1000, max = 5 } = {}) {
  return (req, res, next) => {
    const ip =
      req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
      req.socket.remoteAddress ||
      'unknown';
    const now = Date.now();

    const record = rateLimitMap.get(ip) || { count: 0, resetTime: now + windowMs };

    if (now > record.resetTime) {
      record.count = 1;
      record.resetTime = now + windowMs;
    } else {
      record.count += 1;
    }

    rateLimitMap.set(ip, record);

    if (record.count > max) {
      return res.status(429).json({
        success: false,
        message: 'Too many requests. Please wait a few minutes or email me directly at vasubhalara44@gmail.com.',
      });
    }

    next();
  };
}

module.exports = { rateLimiter };
