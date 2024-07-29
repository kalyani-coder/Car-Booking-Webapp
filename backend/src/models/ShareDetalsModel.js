

const mongoose = require('mongoose');

const ShareDetailsSchema = new mongoose.Schema({
        customerId : String,
        customername : {
                type: String,
                required: [true, "Customer name is required"],
                validate: {
                  validator: function (v) {
                    return /^[a-zA-Z\s]+$/.test(v); // Only letters and spaces
                  },
                  message: props => `${props.value} is not a valid name! Only letters and spaces are allowed.`
                }
              },
        // cus_Name: String,
        customermobile: {
                type: Number,
                required: [true, "Customer mobile number is required"],
                validate: {
                  validator: function (v) {
                    return /^[0-9]{10}$/.test(v.toString()); // Exactly 10 digits
                  },
                  message: props => `${props.value} is not a valid mobile number! Only 10 digits are allowed.`
                }
              },
        vehicle: String,
        triptype: String,
        subtype: String,
        pickup: String,
        date: String,
        time: String,
        Dropoff: String,
        date1: String,
        time1: String,
        drivername: {
                type: String,
                required: [true, "Driver name is required"],
                validate: {
                  validator: function (v) {
                    return /^[a-zA-Z\s]+$/.test(v); // Only letters and spaces
                  },
                  message: props => `${props.value} is not a valid name! Only letters and spaces are allowed.`
                }
              },
        mobileno: {
                type: Number,
                required: [true, "Driver mobile number is required"],
                validate: {
                  validator: function (v) {
                    return /^[0-9]{10}$/.test(v.toString()); // Exactly 10 digits
                  },
                  message: props => `${props.value} is not a valid mobile number! Only 10 digits are allowed.`
                }
              },
        vehicleno: String,
        // drivermail : String,
        // driveradderss : String

})

const newShareDetailsSchema = mongoose.model('share-details', ShareDetailsSchema);

module.exports = newShareDetailsSchema;