const { validationResult } = require('express-validator');
const { findCaptain } = require('../services/captain.services/findCaptain.service')
const { compairePassword } = require('../services/hashPassword.service');
const genarateAuthToken = require('../services/genarateAuthToken.service');

async function captainLogin(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const captain = await findCaptain(email);

    if (!captain) {
        return res.status(404).json({ message: "Captain not found, please register first" });
    }

    const isPasswordMached = await compairePassword(password, captain.password);

    if (!isPasswordMached) {
        return res.status(401).json({ message: "Invalid password" });
    }

    const token = await genarateAuthToken(captain._id);

    res.cookie("token",token);

    return res.status(200).json({
        message: "Login successful !!",
        captain
    });

}

module.exports = { captainLogin }