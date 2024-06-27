

const mongoose = require('mongoose');

const TripDetailsSchema = new mongoose.Schema({

       
    customerId : String,
    customername : String, 
    customermobile: Number,
    pickuplocation:  String,
    date:  String,
    time:  String,
    dropofflocation:  String,
    date1:  String,
    time1:  String,
    vehicle:  String,
    triptype:  String,
    subtype:  String,
    drivername: String,
    mail: String,
    drivermobileno: Number,
    address: String,
    vehicleno: String,
    
})

const newTripDetailsSchema  = mongoose.model('trip-details' , TripDetailsSchema);

module.exports = newTripDetailsSchema;