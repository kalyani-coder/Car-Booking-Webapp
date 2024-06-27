const mongoose = require('mongoose')

const indivisualCustomerSchema = new mongoose.Schema({
    customerId: { type: String, required: true },
    Cus_Type : { type: String, required: true },
    Cus_name : { type: String, required: true },
    company_name : { type: String, required: true },
    gst_no : { type: String, required: true, match: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/ },
    Cus_Mobile : { type: Number, required: true, match: /^[6-9]\d{9}$/ },
    Cus_Email : { type: String, required: true, match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ },
    address : { type: String, required: true },
    type_of_vehicle : { type: String, required: true },
    rate_per_km : { type: String, required: true },
    duty_type : { type: String, required: true },
    rate : { type: String, required: true },
    km : { type: String, required: true },
    extra_km :{ type: String, required: true },
    hours : { type: String, required: true },
    extra_hours : { type: String, required: true },
    from :{ type: String, required: true },
    to : { type: String, required: true },

})

const NewindivisualCustomer = mongoose.model('indivisual-Customer' , indivisualCustomerSchema)

module.exports = NewindivisualCustomer