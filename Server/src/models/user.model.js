const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
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
        minLength: [5, "Email have to be atleast 5 characters long"]
    },

    password: {
        type: String,
        required: true,
        trim: true,
        select: false,
        minLength: [6, "Password have to be atleast 6 characters long"]
    },

    socketID: {
        type: String,
        trim: true,
    }
});

userModel = mongoose.model('user', userSchema);

module.exports = userModel;