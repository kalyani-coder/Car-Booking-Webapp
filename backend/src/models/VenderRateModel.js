

const mongoose = require('mongoose')

const venderRateSchema = new mongoose.Schema({
    company_Name :String,
    GST_No : String,
    vender_Name : String,
    mobile_Number : Number,
    rate_per_Km :String,
    title : String,
    rate : String,
})

const newRateSchemaVender = mongoose.model('vender-rate' , venderRateSchema)

module.exports = newRateSchemaVender