const SkillModel = require('../models/skillModel');
const { AppError } = require('../middlewares/errorHandler');

exports.getSkills = async (req, res, next) => {
  try {
    const skills = await SkillModel.findAll();
    res.status(200).json({
      success: true,
      count: skills.length,
      data: skills,
    });
  } catch (err) {
    next(new AppError('Failed to fetch skills from database', 500));
  }
};
