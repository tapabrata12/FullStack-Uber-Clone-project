const mongoose = require("mongoose");

const captainSchema = new mongoose.Schema({
    fullName: {
        firstName: {
            type: String,
            required: true,
            trim: true,
            minLength: [3, "First name have to be atleast 3 characters long"]
        },
        middleName: {
            type: String,
            trim: true,
            minLength: [3, "Middle name have to be atleast 3 characters long"]
        },
        lastName: {
            type: String,
            trim: true,
            minLength: [3, "Last name have to be atleast 3 characters long"]
        }
    },

    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid email"],
        minLength: [5, "Email have to be atleast 5 characters long"]
    },

    password: {
        type: String,
        required: true,
        trim: true,
        select: false, // By default password will not go if someone tries to fetch user data
        minLength: [6, "Password have to be atleast 6 characters long"]
    },

    socketID: {
        type: String,
        trim: true,
    },

    isAvailable: {
        type: Boolean,
        enum: [true, false],
        default: false,
    },

    vehicle: {
        colour: {
            type: String,
            required: true,
            trim: true,
            minLength: [3, "Colour have to be atleast 3 characters long"]
        },

        plateNumber: {
            type: String,
            required: true,
            trim: true,
            minLength: [7, "Plate number have to be atleast 7 characters long"]
        },

        capacity: {
            type: Number,
            required: true,
            trim: true,
            minLength: [1, "Capacity have to be atleast 1 person"]
        },

        vehicleType: {
            type: String,
            required: true,
            trim: true,
            enum: ['auto', 'bike', 'car']
        }
    },

    location: {
        lat: {
            type: Number,
            trim: true,
        },
        long: {
            type: Number,
            trim: true,
        }
    }
});

const captainModel = mongoose.model('captain', captainSchema);

module.exports = captainModel;