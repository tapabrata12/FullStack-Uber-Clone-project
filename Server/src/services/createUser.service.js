const userModel = require('../models/user.model');

async function createUser({ fullName, email, password }) {

    if (!fullName || !fullName.firstName || !email || !password) {
        throw new Error("All fields are required");
    }

    const user = await userModel.create({
        fullName: {
            firstName: fullName.firstName,
            middleName: fullName.middleName,
            lastName: fullName.lastName,
        },
        email,
        password
    });

    return user;
}

module.exports = { createUser };