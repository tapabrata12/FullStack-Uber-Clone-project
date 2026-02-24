const jwt = require('jsonwebtoken');

async function VerifyToken(token, JWT_SECRET = process.env.JWT_SECRET) { 
    return await jwt.verify(token, JWT_SECRET);
};

module.exports = VerifyToken;