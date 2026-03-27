class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.success = false;
    Error.captureStackTrace(this, this.constructor);
  }
}

const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  
  if (process.env.NODE_ENV === 'development') {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      stack: err.stack,
    });
  } else {
    // Production: Don't leak error details
    res.status(err.statusCode).json({
      success: false,
      message: err.statusCode === 500 ? 'Something went wrong' : err.message,
    });
  }
};

module.exports = { AppError, errorHandler };
