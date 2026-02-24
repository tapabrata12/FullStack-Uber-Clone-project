const blackListUser = require('../models/blackListToken.model');

async function addToBlackList(token) {
    return blackListUser.create({ token });

}

async function findBlackListToken(token) {

    return await blackListUser.findOne({ token: token });
}

module.exports = { addToBlackList, findBlackListToken };