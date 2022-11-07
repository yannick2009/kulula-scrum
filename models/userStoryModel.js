const mongoose = require('mongoose');

const UserStorySchema = new mongoose.Schema(
    {
        description: {
            type: String,
            trim: true,
        },
        project: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Project',
        },
        inSprint: {
            type: Boolean,
            default: false,
        },
        Done: {
            type: Boolean,
            default: false,
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

const UserStory = mongoose.model('UserStory', UserStorySchema);

module.exports = UserStory;
