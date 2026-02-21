const mongoose = require('mongoose');
const dns = require('dns');

async function connectDB() {
    dns.setServers(["1.1.1.1", "8.8.8.8"]); // Bypassing DNS resolution to avoid potential issues with MongoDB Atlas

    try {
        await mongoose.connect(process.env.MONGODB_STR).then(() => {
            console.log("MongoDB connected successfully");
        })
    } catch (err) {
        console.log(`Error in connecting to MongoDB: ${err.message}`);
        process.exit(1);
    }
}

module.exports = connectDB;