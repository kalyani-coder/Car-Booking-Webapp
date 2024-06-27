const mongoose = require('mongoose');

const PersonSchema = new mongoose.Schema({
    name: String,
    mobile: Number,
    vehicleNo: String,
});

const AddTripSchema = new mongoose.Schema({
    customerId: { type: String, required: [true, 'Customer ID is required'] },
    customername: { type: String, required: [true, 'Customer name is required'] },
    mobileno: { type: Number, required: [true, 'Mobile number is required'] },
    email: { type: String, match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid email address'] },
    address: { type: String, required: [true, 'Address is required'], minlength: [10, 'Address must be at least 10 characters long'] },
    triptype: { type: String, required: [true, 'Trip type is required'] },
    subtype: { type: String, required: [true, 'Sub type is required'] },
    pickup: { type: String, required: [true, 'Pick up location is required'] },
    date: { type: String, required: [true, 'Pick up date is required'] },
    time: { type: String, required: [true, 'Pick up time is required'] },
    dropoff: { type: String, required: [true, 'Drop off location is required'] },
    date1: { type: String, required: [true, 'Drop off date is required'] },
    time1: { type: String, required: [true, 'Drop off time is required'] },
    totaldays: { type: String, required: [true, 'Total days are required'] },
    hours: { type: String, required: [true, 'Total hours are required'] },
    vehicle: { type: String, required: [true, 'Vehicle is required'] },
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
