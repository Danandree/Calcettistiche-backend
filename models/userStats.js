const mongoose = require('mongoose');
const userStatsSchema = new mongoose.Schema({
    team1: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Match',
    },
    team2: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Match',
    },
    goals: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Match',
    },
    wins: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Match',
    },
    draws: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Match',
    },
    username: {
        type: String
    },
    totalMatch: {
        type: Number
    },
    img: {
        type: String
    }
});

const UserStats = mongoose.model('UserStats', userStatsSchema);
module.exports = UserStats;