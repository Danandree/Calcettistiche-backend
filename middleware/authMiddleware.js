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
            console.log(err.message);
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
    });
    console.log(resultToken, "Result token");
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
    console.log(resultToken, "Result token");
    next();
}



module.exports = { checkJwtCookie, checkJwtUser };