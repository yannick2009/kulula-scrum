const UserStory = require('../models/userStoryModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.createUs = catchAsync(async (req, res) => {
    const project = req.params.projectId;
    const { description } = req.body;
    const us = await UserStory.create({
        description,
        project,
    });

    res.status(200).json({
        status: 'success',
        length: us.length,
        data: us,
    });
});

exports.getUs = catchAsync(async (req, res, next) => {
    const id = req.params.usId;
    const currentUs = await UserStory.findById(id);
    if (!currentUs)
        return next(
            new AppError(`ce projet là n'existe plus !`)
        );
    res.status(200).json({
        status: 'success',
        length: currentUs.length,
        data: currentUs,
    });
});

exports.modifyUs = catchAsync(async (req, res) => {
    const id = req.params.usId;
    const { description } = req.body;

    const us = await UserStory.findByIdAndUpdate(
        id,
        { description },
        { new: true }
    );
    res.status(200).json({
        status: 'success',
        length: us.length,
        data: us,
    });
});

exports.deleteUs = catchAsync(async (req, res) => {
    const id = req.params.usId;
    await UserStory.findByIdAndDelete(id);
    res.status(200).json({
        message: 'le projet a été supprimé avec success',
    });
});
