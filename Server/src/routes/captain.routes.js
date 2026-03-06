const express = require('express');
const { body } = require('express-validator');
const captainRoutes = express.Router();
const { registerCaptain } = require('../controllers/captain.register.controller');
// Register new captain
captainRoutes.post('/register',
    [body("email").isEmail().withMessage("Invalid Email"),
    body("firstName").isLength({ min: 3 }).withMessage("First name have to be atleast 3 characters long"),
    body("middleName").optional({ checkFalsy: true }).isLength({ min: 3 }).withMessage("Middle name have to be atleast 3 characters long"),
    body("lastName").optional({ checkFalsy: true }).isLength({ min: 3 }).withMessage("Last name have to be atleast 3 characters long"),
    body("password").isLength({ min: 6 }).withMessage("Password must be atleast 6 characters long"),

    body("isAvailable").optional({ checkFalsy: true }).isBoolean().withMessage("isAvailable must be a boolean"),
    body("colour").isLength({ min: 3 }).withMessage("Colour must be atleast 3 characters long"),
    body("plateNumber").isLength({ min: 7 }).withMessage("Plate number must be atleast 7 characters long"),
    body("capacity").isLength({ min: 1 }).withMessage("Capacity must be atleast 1 person"),
    body('vehicleType').isIn(['car', 'bike', 'auto']).withMessage('Invalid vehicle type')
    ], registerCaptain);

module.exports = captainRoutes;