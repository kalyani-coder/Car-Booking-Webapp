

const mongoose = require('mongoose');

const TripDetailsSchema = new mongoose.Schema({

       
    customerId : String,
    customername :{
        type: String,
        required: [true, "Customer name is required"],
        validate: {
          validator: function (v) {
            return /^[a-zA-Z\s]+$/.test(v); // Only letters and spaces
          },
          message: props => `${props.value} is not a valid name! Only letters and spaces are allowed.`
        }
      },
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
    pickuplocation:  String,
    date:  String,
    time:  String,
    dropofflocation:  String,
    date1:  String,
    time1:  String,
    vehicle:  String,
    triptype:  String,
    subtype:  String,
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
    mail: {
        type: String,
        required: [true, "Email is required"],
        match: [/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.(com|in|org)$/, "Please enter a valid email address ending with .com .in or .org"]
      },
    drivermobileno: {
        type: Number,
        required: [true, "Driver mobile number is required"],
        validate: {
          validator: function (v) {
            return /^[0-9]{10}$/.test(v.toString()); // Exactly 10 digits
          },
          message: props => `${props.value} is not a valid mobile number! Only 10 digits are allowed.`
        }
      },
    address: {
        type : String,
        maxLength: [100, 'Address cannot be more than 50 characters']
        
    },
    vehicleno: String,
    
})

const newTripDetailsSchema  = mongoose.model('trip-details' , TripDetailsSchema);

module.exports = newTripDetailsSchema;