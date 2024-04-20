require('dotenv').config();
const Group = require('../models/group');
const jwt = require('jsonwebtoken');

async function isUserGroupAdmin(req, res, next) {
    let flag = false;
    const token = req.cookies.jwt;
    jwt.verify(token, process.env.JWT_TOKEN_SECRET, (err, decodedToken) => {
        resultToken = decodedToken;
    });
    const group = await Group.findById(req.params.id);
    if (group.createdBy == resultToken.id) { flag = true; }
    if (group.admins.includes(resultToken.id)) { flag = true; }
    if (!flag) {
        res.status(403).json({ message: 'Forbidden' });
        return;
    }
    next();
}

module.exports = { isUserGroupAdmin };