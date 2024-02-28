
const mongoose = require('mongoose')

const MasterrateSchema = new mongoose.Schema({
    add_vehicle: String,
    add_duty_type: String,
    add_rate: Number,
})

const newMasterRateSchema = mongoose.model('masterrate' , MasterrateSchema)

module.exports = newMasterRateSchema