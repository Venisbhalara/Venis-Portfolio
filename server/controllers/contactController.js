const ContactModel = require('../models/contactModel');
const { AppError } = require('../middlewares/errorHandler');

exports.submitContactForm = async (req, res, next) => {
  const { name, email, message } = req.body;

  // Validation
  if (!name || typeof name !== 'string' || !name.trim()) {
    return next(new AppError('Please provide a valid name', 400));
  }
  if (!email || typeof email !== 'string' || !email.trim()) {
    return next(new AppError('Please provide a valid email', 400));
  }
  if (!message || typeof message !== 'string' || !message.trim()) {
    return next(new AppError('Please provide a message', 400));
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return next(new AppError('Invalid email format', 400));
  }

  try {
    await ContactModel.create({ name, email, message });
    res.status(201).json({
      success: true,
      message: 'Message received. I will be in touch shortly.',
    });
  } catch (err) {
    next(new AppError('Failed to send message. Please try again later.', 500));
  }
};
