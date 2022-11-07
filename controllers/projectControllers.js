const Project = require('../models/projectModel');
const catchAsync = require('../utils/catchAsync');

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
