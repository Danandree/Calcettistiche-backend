require('dotenv').config();
const cryptojs = require('crypto-js');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('../models/user');
const fs = require('fs');
const dbURI = process.env.DB_URI || 'mongodb://localhost:27017/calcetto-test';

let username = [
    "Daniele",
    "Roberto",
    "Savio",
    "Damiano",
    "Marigo",
    "Augusto",
    "Ravagnan",
    "Bergamasco",
    "Liberato",
    "Andrea",
    "Antonio",
    "Iginio",
    "Luca-Berta",
    "Cesco",
    "Daniele-Z",
    "Ionut",
    "Davide",
    "Scarpa",
    "Mariotti",
    "Monaro"
];

let password = "qwer1234";
console.log(`Password: ${password}`);
password = cryptojs.MD5(password).toString();
console.log(`Password: ${password}`);
let userList = [];
username.forEach((element) => {
    console.log(element);
    const email = element.toLowerCase() + "@example.com";
    const salt = bcrypt.genSaltSync();
    password = bcrypt.hashSync(password, salt);
    const user = {
        username: element,
        password: password,
        email: email,
        role: ['user']
    }
    userList.push(user);
});

function saveUserToDB(saveAlsoOnFile = true) {
    mongoose.connect(dbURI)
        .then(() => {
            console.log('Connected to MongoDB: ' + dbURI);
            User.insertMany(userList);
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

// saveUserToDB(true);
console.log("end");