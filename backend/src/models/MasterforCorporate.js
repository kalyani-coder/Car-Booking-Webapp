
const mongoose = require('mongoose')

const MasterrateSchema = new mongoose.Schema({
    add_vehicle: {
        type: String,
        required: [true, 'Vehicle is required'],
       
    },
    add_duty_type: {
        type: String,
        required: [true, 'Duty type is required'],
      
    },
    add_rate: {
        type: Number,
        required: [true, 'Rate is required'],
       
    },
})

const newMasterRateSchema = mongoose.model('masterrate' , MasterrateSchema)

module.exports = newMasterRateSchema