
const mongoose = require('mongoose')

const driverSchema = new mongoose.Schema({
    driver_Name : String,
    driver_Email : String,
    address : String,
    driver_Mo1 :Number,
    driver_Mo2 : Number

})

const newDriverSchema = mongoose.model('add-driver' , driverSchema)

module.exports = newDriverSchema