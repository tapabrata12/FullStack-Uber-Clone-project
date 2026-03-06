const captainModel = require('../../models/captain.model');

async function createCaptain({ fullName, email, password, isAvailable, vehicle }) {

    if (!fullName || !fullName.firstName || !email || !password || !vehicle || !vehicle.colour || !vehicle.plateNumber || !vehicle.capacity || !vehicle.vehicleType) {
        throw new Error("All fields are required");
    }

    const captain = await captainModel.create({
        fullName: {
            firstName: fullName.firstName,
            middleName: fullName.middleName,
            lastName: fullName.lastName,
        },
        email,
        password,
        isAvailable,
        vehicle: {
            colour: vehicle.colour,
            plateNumber: vehicle.plateNumber,
            capacity: vehicle.capacity,
            vehicleType: vehicle.vehicleType,

        },
    });

    return captain;
}

module.exports = { createCaptain };