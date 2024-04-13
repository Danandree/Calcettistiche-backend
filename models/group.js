const mongoose = require('mongoose');
const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: {true: 'Group name is required'}
    },
    admins: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
    },
    players: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
    }
}, {
    timestamps: true
});

const Group = mongoose.model('Group', groupSchema);
module.exports = Group;