const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { isEmail } = require('validator');
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [8, 'Minimum password length is 8 characters'],
        // maxlength: [40, 'Maximum password length is 32 characters']
    },
    role: {
        type: [String],
        enum: ['admin', 'user', 'player', 'coach', 'referee'],
        default: ['user']
    },
    username:{
        type: String,
        minlength: [3, 'Minimum username length is 3 characters'],
        maxlength: [24, 'Maximum username length is 24 characters'],
        unique: true
    },
    pitchRole: {
        type: String,
        enum: ["DIF","CEN","ATT"],
    },
    img: {
        type: String,
        default:'../../../assets/img/user.png'
    }
}, { timestamps: true });

userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error('incorrect password');
    }
    throw Error('incorrect email');
}

const User = mongoose.model('User', userSchema);
module.exports = User;