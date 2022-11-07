const User = require('../models/UserModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

// CREATION D'UN UTILISATEUR
exports.signup = catchAsync(async (req, res) => {
    const { nom, prenom, email, password, passwordConfirm } =
        req.body;
    const users = await User.create({
        nom,
        email,
        prenom,
        password,
        passwordConfirm,
    });

    res.status(200).json({
        status: 'success',
        length: users.length,
        data: users,
    });
});

// TOUS LES UTILISATEURS

exports.allUsers = catchAsync(async (req, res) => {
    const users = await User.find({});
    res.status(200).json({
        status: 'success',
        length: User.length,
        data: users,
    });
});

// UN UTILISATEUR

exports.oneUser = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const currentUser = await User.findById(id).populate({
        path: 'projects',
    });
    if (!currentUser)
        return next(
            new AppError('utilisateur introuvable', 404)
        );
    res.status(200).json({
        status: 'success',
        length: currentUser.length,
        data: currentUser,
    });
});

// SUPPRESSION D'UN UTILISATEUR

exports.deleteUser = catchAsync(async (req, res) => {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(200).json({
        message: 'utilisateur supprimé avec succès',
    });
});
