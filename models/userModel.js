const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
    {
        nom: String,
        prenom: String,
        email: {
            type: String,
            trim: true,
            unique: true,
            validate: [
                validator.isEmail,
                'SVP entrez un email valide !',
            ],
            required: [
                true,
                'nous avons besoin de votre e-mail !',
            ],
        },
        password: {
            type: String,
            trim: true,
            required: [
                true,
                "nous avons besoin d'un mot de passe !",
            ],
        },
        passwordConfirm: {
            type: String,
            trim: true,
            required: [
                true,
                'veillez confirmer votre mot de passe !',
            ],
            validate: {
                validator: function () {
                    return (
                        this.passwordConfirm === this.password
                    );
                },
            },
        },
        selfCode: String,
        createdDate: {
            type: Date,
            default: Date.now(),
        },
        // projectList: [
        //     {
        //         type: mongoose.Schema.ObjectId,
        //         ref: 'Project',
        //     },
        // ],
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

userSchema.virtual('projects', {
    ref: 'Project',
    localField: '_id',
    foreignField: 'user',
});

userSchema.pre('save', async function (next) {
    this.selfCode = `${this.nom.split('')[0]}${
        this.prenom.split('')[0]
    }${Date.now().toString().split('')[5]}${
        Date.now().toString().split('')[4]
    }${Date.now().toString().split('')[8]}${
        Date.now().toString().split('')[9]
    }`;
    let salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    this.passwordConfirm = undefined;
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
