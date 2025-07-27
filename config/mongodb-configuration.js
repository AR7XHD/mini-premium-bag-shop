const mongoose = require("mongoose");
const debug = require("debug")("development:mongoose");
const config = require("config");

const connectDB = async () => {
    try {
        await mongoose.connect(config.get("mongoURI")).then(() => {
            debug("MongoDB connected");
        })
    } catch (error) {
        debug(error);
    }
}

module.exports = connectDB;

