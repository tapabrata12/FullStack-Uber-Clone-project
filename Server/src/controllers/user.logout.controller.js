const { addToBlackList } = require('../services/blackListUser.service');
async function userLogout(req, res, next) {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    await addToBlackList(token);
    res.clearCookie("token");
    res.status(200).json({ message: "Logout successful" });
}

module.exports = userLogout;