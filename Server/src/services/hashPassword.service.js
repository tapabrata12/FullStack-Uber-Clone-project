const bcrypt = require('bcrypt');

async function hashPassword(password, salt = 10) {
    const hash = await bcrypt.hash(password, salt);
    return hash
};

async function compairePassword(userPassword,hashedPassword) {
    return await bcrypt.compare(userPassword,hashedPassword);
}
module.exports = {hashPassword,compairePassword};