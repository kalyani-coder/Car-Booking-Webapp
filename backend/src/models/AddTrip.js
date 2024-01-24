const mongoose = require('mongoose');

const AddTripSchema = new mongoose.Schema({

    customerId : String,
    customername : String, 
    mobileno: Number , 
    email : String ,
    address : String ,
    triptype : String ,
    subtype : String ,
    name_1: String,
    mobile_1: Number,
    vehicleNo_1: String,
    name_2: String,
    mobile_2: Number,
    vehicleNo_2: String,
    name_3: String,
    mobile_3: Number,
    vehicleNo_3: String,
    name_4: String,
    mobile_4: Number,
    vehicleNo_4: String,
    name_5: String,
    mobile_5: Number,
    vehicleNo_5: String,
    name_6: String,
    mobile_6: String,
    vehicleNo_6: String,
    name_7: String,
    mobile_7: Number,
    vehicleNo_7: String,
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
