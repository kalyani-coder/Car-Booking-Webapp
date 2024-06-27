

const mongoose = require("mongoose")

const getDetailsFromDriverSchema = new mongoose.Schema({
    // customerId : String,
    // customername : String, 
    // customermobile : Number,
    // vehicle :String,
    // pickuplocation: String,
    // date: Date,
    // time: String,
    // dropoffLocation: String,
    // date1: Date,
    // time1: String,
    // totalDays: String,
    // totalHours: String,
    // triptype: String,
    // tripsubtype: String,
    // drivername: String,
    // mobileNumber: Number,
    // toll : String,
    // allowance : Number,
    // nightstay : String,



    customerId: String,
    customername: String,
    cus_Name: String,
    customermobile: String,
    vehicle: String,
    triptype: String,
    subtype: String,
    pickup: String,
    date: String,
    time: String,
    Dropoff: String,
    date1: String,
    time1: String,
    totalDays: String,
    totalHours: String,
    drivername: String,
    mobileno: String,
    vehicleno: String,
    toll : {type : String,
        default : ""
    },
    allowance :{type : String,
        default : ""
    },
    nightstay : {type : String,
        default : ""
    },


})

const NewGetDetailsFromDriver = mongoose.model('/getDetailsFromdriver', getDetailsFromDriverSchema)

module.exports = NewGetDetailsFromDriver