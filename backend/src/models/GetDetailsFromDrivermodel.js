

const mongoose = require("mongoose")

const getDetailsFromDriverSchema = new mongoose.Schema({
    customerId: {
        type: String,
        required: [true, 'Customer ID is required']
    },
    customername: {
        type: String,
        required: [true, 'Customer name is required']
    },
    cus_Name: String,
    customermobile: {
        type: String,
        required: [true, 'Mobile number is required']
    },
    vehicle: {
        type: String,
        required: [true, 'Vehicle is required']
    },
    triptype: {
        type: String,
        required: [true, 'Trip type is required']
    },
    subtype: {
        type: String,
        required: [true, 'Sub type is required']
    },
    pickup: {
        type: String,
        required: [true, 'Pick up location is required']
    },
    date: {
        type: String,
        required: [true, 'Pick up date is required']
    },
    time: {
        type: String,
        required: [true, 'Pick up time is required']
    },
    Dropoff: {
        type: String,
        required: [true, 'Drop off location is required']
    },
    date1: {
        type: String,
        required: [true, 'Drop off date is required']
    },
    time1: {
        type: String,
        required: [true, 'Drop off time is required']
    },
    totalDays: {
        type: String,
        required: [true, 'Total days are required']
    },
    totalHours: {
        type: String,
        required: [true, 'Total hours are required']
    },
    drivername: {
        type: String,
        required: [true, 'Driver name is required']
    },
    mobileno: {
        type: String,
        required: [true, 'Mobile number is required']
    },
    vehicleno: {
        type: String,
        required: [true, 'Vehicle number is required']
    },
    toll: {
        type: String,
        default: ""
    },
    allowance: {
        type: String,
        default: ""
    },
    nightstay: {
        type: String,
        default: ""
    },

})

const NewGetDetailsFromDriver = mongoose.model('/getDetailsFromdriver', getDetailsFromDriverSchema)

module.exports = NewGetDetailsFromDriver
