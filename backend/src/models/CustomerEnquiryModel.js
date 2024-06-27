

const mongoose = require('mongoose');


const CustomerSchema = new mongoose.Schema({
    customer_id: {
      type: String,
      required: [true, 'Customer ID is required'],
      },
    customer_name: {
      type: String,
      required: [true, 'Customer name is required'],
      minlength: [2, 'Customer name must be at least 2 characters long'],
      maxlength: [100, 'Customer name must be less than 100 characters long']
    },
    mobileno: {
      type: String,
      required: [true, 'Mobile number is required'],
      validate: {
        validator: function(v) {
          return /^\d{10}$/.test(v);
        },
        message: props => `${props.value} is not a valid 10-digit mobile number!`
      }
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      validate: {
        validator: function(v) {
          return /.+\@.+\..+/.test(v);
        },
        message: props => `${props.value} is not a valid email address!`
      }
    },
    tripe_type: {
      type: String,
      required: [true, 'Trip type is required']
    },
    sub_type: {
      type: String,
      required: [true, 'Sub type is required']
    },
    pic_up: {
      type: String,
      required: [true, 'Pick up location is required']
    },
    date1: {
      type: Date,
      required: [true, 'Pick up date is required']
    },
    time1: {
      type: String,
      required: [true, 'Pick up time is required']
    },
    drop_of: {
      type: String,
      required: [true, 'Drop off location is required']
    },
    date2: {
      type: Date,
      required: [true, 'Drop off date is required']
    },
    time2: {
      type: String,
      required: [true, 'Drop off time is required']
    },
    vehicle: {
      type: String,
      required: [true, 'Vehicle is required']
    },
    address: {
      type: String,
      required: [true, 'Address is required'],
      minlength: [10, 'Address must be at least 10 characters long'],
      maxlength: [200, 'Address must be less than 200 characters long']
    },
    totalDays: {
      type: String,
      required: [true, 'Total days are required'],
    
    },
    totalHours: {
      type: String,
      required: [true, 'Total hours are required'],
     
    }
  });

const newCustomerSchema  = mongoose.model('/customer-inquiry' , CustomerSchema);

module.exports = newCustomerSchema;