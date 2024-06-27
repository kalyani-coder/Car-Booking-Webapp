const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
    driver_Name: {
        type: String,
        required: [true, "Driver Name Is Required"],
        minlength: [2, "Driver name must be at least 2 characters long"],
    },
    driver_Email: {
        type: String,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please fill a valid email address"],
    },
    address: {
        type: String,
        required: [true, "Driver Address Is Required"],
        minlength: [10, "Driver address must be at least 10 characters long"],
    },
    driver_Mo1: {
        type: Number,
        required: [true, "Driver Number Is Required"],
        minlength: [10, "Driver number must be at least 10 digits long"],
    },
    driver_Mo2: {
        type: Number,
        minlength: [10, "Alternate driver number must be at least 10 digits long"],
    }
}, { timestamps: true });

const Driver = mongoose.model('Driver', driverSchema);

module.exports = Driver;
