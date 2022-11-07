const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
    {
        nom: String,
        description: String,
        // backlog: [
        //     {
        //         type: mongoose.SchemaTypes.ObjectId,
        //         ref: 'UserStory',
        //     },
        // ],
        user: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Users',
        },
        created: {
            type: Date,
            default: Date.now(),
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

projectSchema.virtual('backlog', {
    ref: 'UserStory',
    localField: '_id',
    foreignField: 'project',
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
