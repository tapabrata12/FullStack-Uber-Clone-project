const jwt = require('jsonwebtoken');

async function genarateAuthToken(_id, JWT_SECRET = process.env.JWT_SECRET,options = {
    expiresIn: "24h" // Token expires in 24 hour
}) {

    try {

        const token = jwt.sign({ _id:_id }, JWT_SECRET,options);
        return token;

    } catch (err) {
        throw new Error (`Can't genarate auth token Error: ${err}`);
        process.exit(1);
    }
}

module.exports = genarateAuthToken;