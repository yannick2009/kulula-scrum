const Project = require('../models/projectModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.createProject = catchAsync(async (req, res) => {
    const user = req.params.userId;
    const { nom, description } = req.body;
    const project = await Project.create({
        nom,
        description,
        user,
    });

    res.status(200).json({
        status: 'success',
        length: project.length,
        data: project,
    });
});

exports.getProject = catchAsync(async (req, res, next) => {
    const id = req.params.projectId;
    const currentProject = await Project.findById(id).populate(
        'backlog'
    );
    if (!currentProject)
        return next(
            new AppError(`ce projet là n'existe plus !`)
        );
    res.status(200).json({
        status: 'success',
        length: currentProject.length,
        data: currentProject,
    });
});

exports.deleteProject = catchAsync(async (req, res) => {
    const id = req.params.projectId;
    await Project.findByIdAndDelete(id);
    res.status(200).json({
        message: 'le projet a été supprimé avec success',
    });
});
