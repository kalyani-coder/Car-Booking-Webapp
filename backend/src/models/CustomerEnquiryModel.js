

const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({

    customer_name : String,
    mobileno : String,
    email : String,
    tripe_type : String,
    sub_type : String,
    pic_up : String,
    date : Date,
    time : String,
    drop_of : String,
    date1 : Date,
    time : String,
    days : String,
    hours : String,
    vehicle : String,
    address : String,
    time1 : String,
    totaldays : String,
    
})

const newCustomerSchema  = mongoose.model('/customer-inquiry' , CustomerSchema);

module.exports = newCustomerSchema;