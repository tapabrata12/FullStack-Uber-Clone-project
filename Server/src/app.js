const express = require("express");
const cookieParser = require('cookie-parser')
const cors = require('cors');
const userRoutes = require('./routes/user.routes');
const captainRoutes = require('./routes/captain.routes');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/api/auth/user', userRoutes);
app.use('/api/auth/captain',captainRoutes);

module.exports = app;