const express = require("express");
const { body } = require('express-validator');
const { registerUser } = require('../controllers/user.register.controller');
const router = express.Router();

router.post("/register",
    [body("email").isEmail().withMessage("Invalid Email"),
    body("firstName").isLength({ min: 3 }).withMessage("First name have to be atleast 3 characters long"),
    body("middleName").optional({ checkFalsy: true }).isLength({ min: 3 }).withMessage("Middle name have to be atleast 3 characters long"),
    body("lastName").optional({ checkFalsy: true }).isLength({ min: 3 }).withMessage("Last name have to be atleast 3 characters long"),
    body("password").isLength({ min: 6 }).withMessage("Password must be atleast 6 characters long"),],
    registerUser
);

module.exports = router;