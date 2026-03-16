const verifyToken = require('../services/verifyToken.service');
const { findCaptainByID } = require('../services/captain.services/findCaptain.service');
const { findBlackListToken } = require('../services/blackListUser.service');

async function authCaptainToken(req, res, next) {

    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if (!token || token === 'null' || token === 'undefined') {
        return res.status(401).json({ message: "Unauthorized please Login !!" });
    }

    // In some cases already logged out user can try to access profile before re-login to prevent that we use this middleware
    const blackListToken = await findBlackListToken(token);
    if (blackListToken) {
        return res.status(401).json({ message: "Unauthorized, user already logged out" });
    }

    try {
        const decodedToken = await verifyToken(token);

        const captain = await findCaptainByID(decodedToken._id);

        if (!captain) {
            return res.status(404).json({ message: "User not found" });
        }
        
        return next();

    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = authCaptainToken;