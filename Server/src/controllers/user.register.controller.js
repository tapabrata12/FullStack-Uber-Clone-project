const { validationResult } = require('express-validator');
const { createUser } = require('../services/createUser.service');
const {hashPassword} = require('../services/hashPassword.service');
const genarateAuthToken = require('../services/genarateAuthToken.service');


async function registerUser(req, res) {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }

    const { firstName, middleName, lastName, email, password } = req.body;
    const hashedPassword = await hashPassword(password);

    const user = await createUser({
        fullName: {
            firstName,
            middleName,
            lastName,
        },
        email,
        password: hashedPassword
    });

    const token = await genarateAuthToken(user._id);

    res.cookie("token", token);

    res.status(201).json({
        message: "User registered successfully",
        user: user
    });
}

module.exports = { registerUser };