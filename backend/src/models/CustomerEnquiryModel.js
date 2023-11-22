

const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({

    customer_id :String,
    customer_name : String,
    mobileno : String,
    email : String,
    tripe_type : String,
    sub_type : String,
    pic_up : String,
    date1 : Date,
    time1 : String,
    drop_of : String,
    date2 : Date,
    time : String,
    days : String,
    hours : String,
    vehicle : String,
    address : String,
    time2 : String,
    totaldays : String,
    
    
})

const newCustomerSchema  = mongoose.model('/customer-inquiry' , CustomerSchema);

module.exports = newCustomerSchema;