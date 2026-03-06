const captainModel = require('../../models/captain.model');

async function findCaptain(email) {
    /* By default password is not selected, so we select it using .select("+password") 
    So that we can validate password also
    */
    const captain = await captainModel.findOne({ email }).select("+password");
    return captain;
}

async function findCaptainByID(_id) {
    return await captainModel.findById(_id);

}
module.exports = { findCaptain, findCaptainByID };