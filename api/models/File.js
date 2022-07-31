const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    fileName: {
        type: String
    },
    fileURL: {
        type: String,
    },
    metadata: {
        type: String,
    },

}, {
    timestamps: true,
});

module.exports = mongoose.model('file', FileSchema);