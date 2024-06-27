

const mongoose = require('mongoose')

const rateSchema = new mongoose.Schema({
    company_Name: {
        type: String,
        required: [true, 'Company name is required'],
        minlength: [2, 'Company name must be at least 2 characters long'],
        maxlength: [100, 'Company name must be less than 100 characters long']
    },
    GST_No: {
        type: String,
        required: [true, 'GST number is required'],
        match: [/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/, 'Please fill a valid GST number'],
        minlength: [15, 'GST number must be 15 characters long'],
        maxlength: [15, 'GST number must be 15 characters long']
    },
    customer_Name: {
        type: String,
        required: [true, 'Customer name is required'],
        minlength: [2, 'Customer name must be at least 2 characters long'],
        maxlength: [100, 'Customer name must be less than 100 characters long']
    },
    mobile_Number: {
        type: Number,
        required: [true, 'Customer mobile number is required'],
        minlength: [10, 'Customer mobile number must be 10 digits long'],
        maxlength: [10, 'Customer mobile number must be 10 digits long']
    },
    rate_per_Km: {
        type: String,
        required: [true, 'Rate per km is required']
    },
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    rate: {
        type: String,
        required: [true, 'Rate is required']
    },
})

const newRateSchema = mongoose.model('rate' , rateSchema)

module.exports = newRateSchema