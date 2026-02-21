require('dotenv').config();

const app = require('./src/app');
const express = require('express');
const http = require('http');
var cookieParser = require('cookie-parser')
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 3000
const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});