const userModel = require('../models/user.model');

async function findUser(email) {
    /* By default password is not selected, so we select it using .select("+password") 
    So that we can validate password also
    */
    const user = await userModel.findOne({ email }).select("+password");
    return user;
}

module.exports = findUser;