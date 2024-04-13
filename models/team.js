const mongoose = require('mongoose');
const teamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    coach: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
        required: true
    },
    players: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
    },
    img:{
        type: String,
        default: "https://img.freepik.com/free-vector/abstract-geometric-shapes-background_23-2148733560.jpg?w=2000"
    }
}, { timestamps: true });