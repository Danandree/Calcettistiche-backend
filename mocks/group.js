require('dotenv').config();
const Group = require('../models/group');
const fs = require('fs');
const mongoose = require('mongoose');
const userJson = require('./users.json');

numberOgGroups = 3;
playerPerGroup = [15, 18, 20];
groups = []
for (let i = 0; i < numberOgGroups; i++) {
    let name = "Group " + (i + 1)
    let players = []
    for (let j = 0; j < playerPerGroup[Math.floor(Math.random() * playerPerGroup.length)]; j++) {
        players.push(userJson[Math.floor(Math.random() * userJson.length)]._id)
    }
    groups.push({ players: players, name: name })
}

for (group of groups) {
    group.createdBy = userJson[0]._id
}

const dbURI = process.env.DB_URI || 'mongodb://localhost:27017/calcetto-test';
mongoose.connect(dbURI)
    .then(() => {
        console.log('Connected to MongoDB: ' + dbURI);
        Group.insertMany(groups);
        console.log("Groups inserted");
    })
    .catch((error) => console.log(error));