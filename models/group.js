const mongoose = require('mongoose');
const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: {true: 'Group name is required'}
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Field "createdBy" is required'],
        immutable: [true, 'Field "createdBy" is immutable']
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