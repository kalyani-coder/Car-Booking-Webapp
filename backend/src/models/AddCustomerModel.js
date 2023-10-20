

const mongoose = require('mongoose')

const AddCustomerSchema = new mongoose.Schema({

    customer_Name : String,
    company_Name : String,
    GST_No :String,
    customer_Mobile : Number,
    customer_Email : String,
    address : String,

})

const NewAddCustomer = mongoose.model('AddCustomer' , AddCustomerSchema)

module.exports = NewAddCustomer