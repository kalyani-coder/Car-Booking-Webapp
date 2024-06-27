

const mongoose = require('mongoose')

const venderRateSchema = new mongoose.Schema({
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
    vender_Name: {
        type: String,
        required: [true, 'Vender name is required'],
        minlength: [2, 'Vender name must be at least 2 characters long'],
        maxlength: [100, 'Vender name must be less than 100 characters long']
    },
    mobile_Number: {
        type: Number,
        required: [true, 'Vender mobile number is required'],
        minlength: [10, 'Vender mobile number must be 10 digits long'],
        maxlength: [10, 'Vender mobile number must be 10 digits long']
    },
    vehicle: {
        type: String,
        required: [true, 'Vehicle is required']
    },
    address: {
        type: String,
        required: [true, 'Address is required']
    },
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    rate: {
        type: String,
        required: [true, 'Rate is required']
    },
    hour: {
        type: String,
        required: [true, 'Hour is required']
    },
    km: {
        type: String,
        required: [true, 'Km is required']
    },
    extra_km: {
        type: String,
        required: [true, 'Extra km is required']
    },
    extra_hour: {
        type: String,
        required: [true, 'Extra hour is required']
    },
})

const newRateSchemaVender = mongoose.model('vender-rate' , venderRateSchema)

module.exports = newRateSchemaVender