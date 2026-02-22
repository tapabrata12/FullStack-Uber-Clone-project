const jwt = require('jsonwebtoken');

async function genarateAuthToken(_id, JWT_SECRET = process.env.JWT_SECRET) {

    try {

        const token = jwt.sign({ _id:_id }, JWT_SECRET);
        return token;

    } catch (err) {
        throw new Error (`Can't genarate auth token Error: ${err}`);
        process.exit(1);
    }
}

module.exports = genarateAuthToken;