

const mongoose = require('mongoose')

const rateSchema = new mongoose.Schema({
    compamy_Name :String,
    GST_No : String,
    customer_Name : String,
    mobile_Number : Number,
    rate_per_Km :String,
    title : String,
    rate : String,
})

const newRateSchema = mongoose.model('rate' , rateSchema)

module.exports = newRateSchema