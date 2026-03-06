const { validationResult } = require('express-validator')
const { findCaptain } = require('../services/captain.services/findCaptain.service');
const { createCaptain } = require("../services/captain.services/createCaptain.service");
const { hashPassword } = require('../services/hashPassword.service');
const genarateAuthToken = require('../services/genarateAuthToken.service');

async function registerCaptain(req, res) {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }

    const { firstName, middleName, lastName, email, password, isAvailable, colour, plateNumber, capacity, vehicleType } = req.body;

    const alreadyCaptain = await findCaptain(email);
    if (alreadyCaptain) {
        return res.status(409).json({
            message: "Captain already exists"
        })
    }

    const hashedPassword = await hashPassword(password);

    const captain = await createCaptain({
        fullName: {
            firstName,
            middleName,
            lastName,
        },
        email,
        password: hashedPassword,
        isAvailable,
        vehicle: {
            colour,
            plateNumber,
            capacity,
            vehicleType
        }
    });

    const token = await genarateAuthToken(captain._id);
    res.cookie("token", token);

    res.status(201).json({
        message: "Captain registered successfully",
        captain,
    });
}

module.exports = { registerCaptain };