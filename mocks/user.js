require('dotenv').config();
const cryptojs = require('crypto-js');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('../models/user');
const fs = require('fs');

let username = [
    "Messi",
    "Ronaldo",
    "Pelè",
    "Maradona",
    "Neymar",
    "Cruyff",
    "Buffon",
    "Zidane",
    "Beckenbauer",
    "Kaka",
    "Di Stefano",
    "Best",
    "Muller",
    "Puskas",
    "Platini",
    "Van Basten",
    "Zico",
    "Eusebio",
    "Garrincha",
    "Charlton",
    "Maldini",
];

let password = "qwer1234";
console.log(`Password: ${password}`);
password = cryptojs.MD5(password).toString();
console.log(`Password: ${password}`);
let userList = [];
username.forEach((element) => {
    const username = element.replace(/\s/g, '');
    console.log(username);
    const email = username.toLowerCase() + "@example.com";
    const salt = bcrypt.genSaltSync();
    password = bcrypt.hashSync(password, salt);
    const user = {
        username: username,
        password: password,
        email: email,
        role: ['user']
    }
    userList.push(user);
});

// .env
const dbURI = process.env.DB_URI || 'mongodb://localhost:27017/calcettistiche';

function saveUserToDB(saveAlsoOnFile = false) {
    mongoose.connect(dbURI)
        .then(() => {
            console.log('Connected to MongoDB: ' + dbURI);
            User.insertMany(userList);
            console.log("Users inserted");
            if (saveAlsoOnFile) { saveUserToFile(); }
        })
        .catch((error) => console.log(error));
}

function saveUserToFile() {
    const user = User.find({})
        .then((users) => {
            console.log(users);
            fs.writeFileSync("./users.json", JSON.stringify(users), function (err) {
                if (err) console.log(err);
            });
        })
        .catch((error) => console.log(error));
}

saveUserToDB(false);
