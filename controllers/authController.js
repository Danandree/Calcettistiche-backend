require('dotenv').config();
const User = require('../models/user');
const jwt = require('jsonwebtoken');

// handle errors
const handleErrors = (err, res, status = 400) => {
    console.log(err.message, err, "'HANDLE ERRORS authController.js'");
    let message = err.message;
    // incorrect email
    if (err.message == "incorrect email") { message = "The email is not registred"; }
    // incorrect password
    if (err.message == "incorrect password") { message = "The password is not correct"; }
    // duplicate email error
    if (err.code == 11000) {
        if(err.keyValue.email) { message = "Email already in use"; }
        if(err.keyValue.username) { message = "Username already in use"; }
    }
    // Validation errors
    if (err.message.includes("user validation failed")) {
        Object.values(err.errors).forEach(({ properties }) => {
            message = `${properties.path}: ${properties.message}`
        });
    }
    res.status(status).json(message)
}

const maxAge = 3 * 24 * 60 * 60;
const cookieOptions = {
    httpOnly: true,
    expires: new Date(Date.now() + maxAge * 1000),
    sameSite: "None",
    secure: false,
}
const createToken = (id) => { return jwt.sign({ id }, process.env.JWT_TOKEN_SECRET, { expiresIn: maxAge }) };

const signup_user = async (req, res) => {
    const newUser = new User(req.body);
    try {
        const user = await User.create(newUser);
        const token = createToken(user._id);
        res.cookie('jwt', token, cookieOptions);
        res.status(201).json(user);
    }
    catch (err) {
        handleErrors(err, res);
    }
}

const login_user = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, cookieOptions);
        res.status(200).json({ _id: user._id });
    }
    catch (err) {
        handleErrors(err, res);
    }
}

const logout_user = async (req, res) => {
    try {
        res.cookie('jwt', '', { maxAge: 1 });
        res.status(200).json({ status: 'Logout success', sameSite: 'none' });

    } catch (err) {
        handleErrors(err, res);
    }
}

module.exports = { signup_user, login_user, logout_user, handleErrors }