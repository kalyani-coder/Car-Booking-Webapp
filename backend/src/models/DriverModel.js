const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
    driver_Name: {
        type: String,
        required: [true, "Driver Name Is Required"],
    },
    driver_Email: {
        type: String,
    },
    address: {
        type: String,
        required: [true, "Driver Address Is Required"],
    },
    driver_Mo1: {
        type: Number,
        required: [true, "Driver Number Is Required"],
    },
    driver_Mo2: {
        type: Number,
    }
});

const Driver = mongoose.model('Driver', driverSchema);

module.exports = Driver;