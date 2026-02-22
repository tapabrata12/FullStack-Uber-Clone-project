const express = require("express");
const cookieParser = require('cookie-parser')
const cors = require('cors');
const router = require('./routes/user.routes');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/api/auth', router);

app.get('/', (req, res) => {
    res.send("Hello");
});

module.exports = app;