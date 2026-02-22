const bcrypt = require('bcrypt');

async function hashPassword(password, salt = 10) {
    const hash = await bcrypt.hash(password, salt);
    return hash
};

module.exports = hashPassword;