const ProjectModel = require('../models/projectModel');
const { AppError } = require('../middlewares/errorHandler');

exports.getProjects = async (req, res, next) => {
  try {
    const projects = await ProjectModel.findAll();
    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (err) {
    next(new AppError('Failed to fetch projects database', 500));
  }
};
