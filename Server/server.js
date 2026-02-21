require('dotenv').config();
const app = require('./src/app');
const http = require('http');
const connectDB = require('./src/db/connect.db');

const PORT = process.env.PORT || 3000
const server = http.createServer(app);

connectDB();
server.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});