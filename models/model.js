const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    time: {
        required: true,
        type: Number
    },
    link: {
        required: true,
        type: String
    },
    abyssVersion: {
        required: true,
        type: Number
    },
    chamber: {
        required: true,
        type: String
    },
    team: {
        required: true,
        type: [String]
    }
})

module.exports = mongoose.model('Data', dataSchema)