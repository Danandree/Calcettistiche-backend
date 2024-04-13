// const mongoose = require('mongoose');
const User = require('../models/user');
const Match = require('../models/match');
const UserStats = require('../models/userStats');

const sendUserResponse = (res, req, user, status = 200) => {
    res.status(status).json(user);
}
const sendUserError = (req, res, err, status = 400) => {
    let message = '';
    console.log(err);
    if (err.code == 11000) {
        if (err.keyValue.username) { message = "Username already in use"; }
        if (err.keyValue.email) { message = "Email already in use"; }
    }
    res.status(status).json(message);
}
const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) { sendUserResponse(res, req, user); }
        else { sendUserResponse(res, req, "User not found", 404); }
    } catch (err) {
        console.log(err);
    }
}
const getUserPublic = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            const userToSend = {
                _id: user._id,
                username: user.username,
                // role: user.role,
                // pitchRole: user.pitchRole,
                // createdAt: user.createdAt,
            };
            sendUserResponse(res, req, userToSend);
        }
        else { sendUserResponse(res, req, "User not found", 404); }
    } catch (err) {
        console.log(err, "uqesto errore");
        sendUserResponse(res, req, "User id not valid", 400);
    }
}

const getUserList = async (req, res) => {
    let message = [];
    try {
        const users = await User.find();
        users.forEach(user => { message.push({ _id: user._id, username: user.username }) });
        sendUserResponse(res, req, message);
    } catch (err) {
        console.log(err);
    }
}

const getUserStats = async (req, res) => {
    const userId = req.params.id;
    const userStats = new UserStats();
    try {
        const user = await User.findById(userId);
        if (!user) {
            sendUserResponse(res, req, "User id not valid", 400);
            return;
        }
        userStats._id = user._id;
        userStats.username = user.username;
        userStats.img = user.img;
        console.log(userStats.img, "USER IMG")
        userStats.totalMatch = await Match.countDocuments({});
        const matches = await Match.find({ $or: [{ team1: userId }, { team2: userId }] });
        matches.forEach(match => {
            // DIVIDE TRA TEAM 1 E TEAM 2
            let team = 0;
            if (match.team1.includes(userId)) {
                userStats.team1.push(match._id);
                team = 1;
            } else {
                userStats.team2.push(match._id);
                team = 2;
            }
            // GOALS
            // VITTORIE
            let team1Gol = 0;
            let team2Gol = 0;
            if (match.goals.includes(userId)) {
                match.goals.forEach(goal => {
                    if (goal == userId) {
                        userStats.goals.push(match._id);
                    }
                });
            }
            match.goals.forEach(goal => {
                if (match.team1.includes(goal)) {
                    team1Gol++;
                } else {
                    team2Gol++;
                }
            })
            console.log(team1Gol, team2Gol, "TEAM GOALS");
            if (team1Gol == team2Gol) {
                userStats.draws.push(match._id);
            } else {
                // VITTORIA TEAM 1
                if (team1Gol > team2Gol) {
                    if (team == 1) { userStats.wins.push(match._id); }
                    // VITTORIA TEAM 2
                }
                else {
                    if (team == 2) { userStats.wins.push(match._id); }
                }
            }
            // PAREGGIO
            // if (team1Gol == team2Gol) {
            //     userStats.draws.push(match._id);
            // }
        });
        console.log(userStats, "USER STATS");
        sendUserResponse(res, req, userStats);
    }
    catch (err) {
        console.log(err);
        sendUserResponse(res, req, "User id not valid", 400);
    }
}

const deleteUser = async (req, res) => {
    console.log("Delete User");
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        sendUserResponse(res, req, user);
    } catch (err) {
        console.log(err);
    }
}

const modifyUser = async (req, res) => {
    console.log("Modify User");
    console.log(req.body);
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body);
        sendUserResponse(res, req, user);
    } catch (err) {
        sendUserError(req, res, err);
    }
}

module.exports = {
    getUser,
    getUserList,
    getUserStats,
    getUserPublic,
    deleteUser,
    modifyUser
}