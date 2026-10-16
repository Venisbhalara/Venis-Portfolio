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

  const trimmedName = name.trim();
  const trimmedEmail = email.trim();
  const trimmedMsg = message.trim();

  // Print formatted inquiry directly to server logs
  console.log('──────────────────────────────────────────────────────────');
  console.log('📬 NEW CONTACT INQUIRY RECEIVED');
  console.log(`👤 Name:    ${trimmedName}`);
  console.log(`✉️ Email:   ${trimmedEmail}`);
  console.log(`⏱️ Time:    ${new Date().toISOString()}`);
  console.log(`💬 Message: ${trimmedMsg}`);
  console.log('──────────────────────────────────────────────────────────');

  try {
    await ContactModel.create({
      name: trimmedName,
      email: trimmedEmail,
      message: trimmedMsg,
    });
    return res.status(201).json({
      success: true,
      message: 'Message received. I will be in touch shortly.',
    });
  } catch (err) {
    console.warn(
      '⚠️ MySQL storage unavailable, but inquiry logged to console:',
      err.message
    );
    // Respond successfully so user inquiry is acknowledged without broken UX
    return res.status(200).json({
      success: true,
      message: 'Message received. I will be in touch shortly.',
    });
  }
};
