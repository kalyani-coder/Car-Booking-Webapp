const mongoose = require('mongoose');

const PersonSchema = new mongoose.Schema({
    name: String,
    mobile: Number,
    vehicleNo: String,
});

const AddTripSchema = new mongoose.Schema({
    customerId: String,
    customername: String,
    mobileno: Number,
    email: String,
    address: String,
    triptype: String,
    subtype: String,
    pickup: String,
    date: String,
    time: String,
    dropoff: String,
    date1: String,
    time1: String,
    totaldays: String,
    hours: String,
    vehicle: String,
    Person_1: String,
    Mobile_Number_1: Number,
    Person_2: String,
    Mobile_Number_2: Number,
    Person_3: String,
    Mobile_Number_3: Number,
    Person_4: String,
    Mobile_Number_4: Number,
    Person_5: String,
    Mobile_Number_5: Number,
    Person_6: String,
    Mobile_Number_6: Number,
    trip_duty_number : Number,
});

const AddTrip = mongoose.model('AddTrip', AddTripSchema);

module.exports = AddTrip;
