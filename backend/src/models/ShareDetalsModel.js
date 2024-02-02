

const mongoose = require('mongoose');

const ShareDetailsSchema = new mongoose.Schema({
        customerId : String,
        customername : String, 
        cus_Name: String,
        cus_Mobile: Number,
        vehicle: String,
        triptype: String,
        subtype: String,
        pickup: String,
        date: String,
        time: String,
        Dropoff: String,
        date1: String,
        time1: String,
        drivername: String,
        mobileno: Number,
        vehicleno: String,
        // drivermail : String,
        // driveradderss : String

})

const newShareDetailsSchema = mongoose.model('share-details', ShareDetailsSchema);

module.exports = newShareDetailsSchema;