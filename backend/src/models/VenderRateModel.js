

const mongoose = require('mongoose')

const venderRateSchema = new mongoose.Schema({
    company_Name :String,
    GST_No : String,
    vender_Name : String,
    mobile_Number : Number,
    vehicle: String,
    address: String,
    // rate_per_Km :String,
    title : String,
    rate : String,
    hour: String,
    km: String,
     extra_km: String,
    extra_hour: String,
    from: String,
    to: String,
    date: String
,
})

const newRateSchemaVender = mongoose.model('vender-rate' , venderRateSchema)

module.exports = newRateSchemaVender