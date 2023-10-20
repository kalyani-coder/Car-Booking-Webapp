

const mongoose = require("mongoose")

const getDetailsFromDriverSchema = new mongoose.Schema({
    pickuplocation: String,
    date: Date,
    time: String,
    dropoffLocation: String,
    date1: Date,
    time1: String,
    totalDays: String,
    totalHours: String,
    triptype: String,
    tripsubtype: String,
    drivername: String,
    mobileNumber: Number,


})

const NewGetDetailsFromDriver = mongoose.model('/getDetailsFromdriver' , getDetailsFromDriverSchema)

module.exports = NewGetDetailsFromDriver