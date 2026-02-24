const verifyToken = require('../services/verifyToken.service');
const { findUserByID } = require('../services/findUser.service');
const { findBlackListToken } = require('../services/blackListUser.service');

async function authUserToken(req, res, next) {

    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const blackListToken = await findBlackListToken(token);
    if (blackListToken) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decodedToken = await verifyToken(token);

        const user = await findUserByID(decodedToken._id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        req.user = user;

        return next();

    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = authUserToken