const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
    driver_Name: {
        type: String,
        required: [true, "Driver Name Is Required"],
        match: [/^[A-Za-z\s]+$/, "Driver Name should contain only alphabets and spaces"],
      },
      driver_Email: {
        type: String,
        match: [/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.(com|in|org)$/, "Please enter a valid email address ending with .com .in or .org"],
      },
      address: {
        type: String,
        required: [true, "Driver Address Is Required"],
      },
      driver_Mo1: {
        type: Number,
        required: [true, "Driver Number Is Required"],
        validate: {
          validator: function(v) {
            return /^\d{10}$/.test(v);
          },
          message: props => `${props.value} is not a valid 10-digit number!`
        },
      },
      driver_Mo2: {
        type: Number,
        validate: {
          validator: function(v) {
            return /^\d{10}$/.test(v);
          },
          message: props => `${props.value} is not a valid 10-digit number!`
        },
      }
    });

const Driver = mongoose.model('Driver', driverSchema);

module.exports = Driver;