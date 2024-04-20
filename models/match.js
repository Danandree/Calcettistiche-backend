const mongoose = require('mongoose');
const matchSchema = new mongoose.Schema({
    team1: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
        required: true
    },
    team2: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
        required: true
    },
    goals: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Field "createdBy" is required'],
        immutable: [true, 'Field "createdBy" is immutable']
    },
    referee: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
    },
    group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group',
    },
    checked: {
        type: Boolean,
        default: false
    },
    note: {
        type: String,
    },
    date: {
        type: Date,
        required: [true, 'Field "date" is required']
    }
}, {
    timestamps: true
});

const Match = mongoose.model('Match', matchSchema);
module.exports = Match;