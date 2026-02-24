const { validationResult } = require('express-validator');
const {findUser} = require('../services/findUser.service');
const {compairePassword} = require('../services/hashPassword.service');
const genarateAuthToken = require('../services/genarateAuthToken.service');


async function loginUser(req,res) {

    const errors = await validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }

    const {email, password } = req.body;
    const user = await findUser(email);

    if (!user) {
        return res.status(401).json({
            message: "Invalid Credentials"
        });
    }
    const isPasswordValid = await compairePassword(password,user.password);

    if (!isPasswordValid) {
        return res.status(401).json({
            message: "Invalid Credentials"
        });
    }

    const token =  await genarateAuthToken(user._id);
    res.cookie('token',token);

    return res.status(200).json({
        message: "Login successful",
        user: user,
        token:token
    })      
}

module.exports = {loginUser};