const mongoose = require('mongoose');

const AddTripSchema = new mongoose.Schema({

    customerId : String,
    customername : String, 
    mobileno: Number , 
    email : String ,
    address : String ,
    triptype : String ,
    subtype : String ,
    pickup : String ,
    date : String ,
    time : String ,
    dropoff : String ,
    date1 : String ,
    time1 : String ,
    totaldays : String ,
    hours : String ,
    vehicle : String ,
    



})

const AddTrip = mongoose.model('AddTrip' , AddTripSchema)

module.exports = AddTrip
