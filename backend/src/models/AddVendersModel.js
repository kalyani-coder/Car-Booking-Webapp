
const mongoose = require('mongoose')

const AddVendersSchema = new mongoose.Schema({

    vender_Name: {
        type: String,
        required: [true, 'Vender name is required'],
        minlength: [2, 'Vender name must be at least 2 characters long'],
        maxlength: [100, 'Vender name must be less than 100 characters long']
    },
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
    vender_Mobile: {
        type: Number,
        required: [true, 'Vender mobile number is required'],
        minlength: [10, 'Vender mobile number must be 10 digits long'],
        maxlength: [10, 'Vender mobile number must be 10 digits long']
    },
    Vender_Email: {
        type: String,
        required: [true, 'Vender email is required'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    address: {
        type: String,
        required: [true, 'Address is required'],
        minlength: [2, 'Address must be at least 2 characters long'],
        maxlength: [200, 'Address must be less than 200 characters long']
    },
    

})

const NewAddVenders = mongoose.model('AddVenders' , AddVendersSchema)

module.exports = NewAddVenders