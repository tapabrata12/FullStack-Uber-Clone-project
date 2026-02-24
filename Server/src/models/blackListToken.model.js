const mongoose = require('mongoose');

userTokenSchema = new mongoose.Schema({
    token:{
        type: String,
        required: true,
        unique: true

    },
    createdAt:{
        type:Date,
        default:Date.now,
        expires:86400// 24hrs
    }


});

const blackListModel = mongoose.model("blackListToken",userTokenSchema);

module.exports = blackListModel;