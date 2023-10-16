

const mongoose = require('mongoose');

const ShareDetailsSchema = new mongoose.Schema({

       
        vehicle : String,
        triptype : String,
        subtype : String,
        pickup : String,
        date : String,
        time : String,
        Dropoff : String,
        date1 : String,
        time1 : String,
        drivername : String,
        drivermail : String,
        mobileno : Number,
        mobilrno1 : Number
    
})

const newShareDetailsSchema  = mongoose.model('share-details' , ShareDetailsSchema);

module.exports = newShareDetailsSchema;