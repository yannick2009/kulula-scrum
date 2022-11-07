const mongoose = require('mongoose');

const sprintSchema = new mongoose.Schema({
    nom: String,
    dateStart: Date,
    dateEnd: Date,
    list: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'UserStory',
        },
    ],
    project: {
        type: mongoose.Schema.ObjectId,
        ref: 'Project',
    },
    createdDate: {
        type: Date,
        default: Date.now(),
    },
});

const Sprint = mongoose.model('Sprint', sprintSchema);

module.exports = Sprint;
