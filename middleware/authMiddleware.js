require('dotenv').config();
const jwt = require('jsonwebtoken');

function checkJwtCookie(req, res, next) {
    const token = req.cookies.jwt;
    let resultToken;
    if (!token) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }
    jwt.verify(token, process.env.JWT_TOKEN_SECRET, (err, decodedToken) => {
        resultToken = decodedToken;
        if (err) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
    });
    next();
}

function checkJwtUser(req, res, next) {
    const token = req.cookies.jwt;
    jwt.verify(token, process.env.JWT_TOKEN_SECRET, (err, decodedToken) => {
        resultToken = decodedToken;
    });
    if (resultToken.id != req.params.id) {
        res.status(403).json({ message: 'Forbidden' });
        return;
    }
    next();
}



module.exports = { checkJwtCookie, checkJwtUser };