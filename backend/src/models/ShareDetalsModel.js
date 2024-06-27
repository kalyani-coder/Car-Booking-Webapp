

const mongoose = require('mongoose');

const ShareDetailsSchema = new mongoose.Schema({
        customerId: { type: String, required: [true, 'Customer ID is required'] },
        customername: { type: String, required: [true, 'Customer name is required'] },
        cus_Name: { type: String, required: [true, 'Customer name is required'] },
        customermobile: { type: Number, required: [true, 'Mobile number is required'], min: 10, max: 10 },
        vehicle: { type: String, required: [true, 'Vehicle is required'] },
        triptype: { type: String, required: [true, 'Trip type is required'] },
        subtype: { type: String, required: [true, 'Sub type is required'] },
        pickup: { type: String, required: [true, 'Pick up location is required'] },
        date: { type: String, required: [true, 'Pick up date is required'] },
        time: { type: String, required: [true, 'Pick up time is required'] },
        Dropoff: { type: String, required: [true, 'Drop off location is required'] },
        date1: { type: String, required: [true, 'Drop off date is required'] },
        time1: { type: String, required: [true, 'Drop off time is required'] },
        drivername: { type: String, required: [true, 'Driver name is required'] },
        mobileno: { type: Number, required: [true, 'Mobile number is required'], min: 10, max: 10 },
        vehicleno: { type: String, required: [true, 'Vehicle number is required'] },
        gstNo: { type: String, match: [/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, 'Invalid GST number'] },
        // drivermail : String,
        // driveradderss : String

})

const newShareDetailsSchema = mongoose.model('share-details', ShareDetailsSchema);

module.exports = newShareDetailsSchema;