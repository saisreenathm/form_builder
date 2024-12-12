const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
    formId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Form', // Reference the Form model
        required: true,
    },
    responses: [
        {
            questionId: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
            },
            answer: {
                type: mongoose.Schema.Types.Mixed, // Can be a string, array, or object
            },
        },
    ],
    submittedAt: {
        type: Date,
        default: Date.now,
    },
});

const Response = mongoose.model('Response', responseSchema);

module.exports = Response;
