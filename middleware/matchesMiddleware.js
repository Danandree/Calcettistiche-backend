require('dotenv').config();
const Match = require('../models/match');
const jwt = require('jsonwebtoken');

async function isUserMatchAdmin(req, res, next) {
    let flag = false;
    const token = req.cookies.jwt;
    jwt.verify(token, process.env.JWT_TOKEN_SECRET, (err, decodedToken) => {
        resultToken = decodedToken;
    });
    const match = await Match.findById(req.params.id);
    if (match.createdBy == resultToken.id) { flag = true; }
    if (match.referee.includes(resultToken.id)) { flag = true; }
    if (!flag) {
        res.status(403).json({ message: 'Forbidden' });
        return;
    }
    next();
}

module.exports = { isUserMatchAdmin };