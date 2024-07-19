const mongoose = require('mongoose');



const AddTripSchema = new mongoose.Schema({
    customerId: String,
    customername: {
        type: String,
        required: [true, "Customer name is required"],
        validate: {
          validator: function (v) {
            return /^[a-zA-Z\s]+$/.test(v); // Only letters and spaces
          },
          message: props => `${props.value} is not a valid name! Only letters and spaces are allowed.`
        }
      },
    mobileno: {
        type: Number,
        required: [true, "Customer mobile number is required"],
        validate: {
          validator: function (v) {
            return /^[0-9]{10}$/.test(v.toString()); // Exactly 10 digits
          },
          message: props => `${props.value} is not a valid mobile number! Only 10 digits are allowed.`
        }
      },
    email:{
        type: String,
        required: [true, "Email is required"],
        match: [/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.(com|in|org)$/, "Please enter a valid email address ending with .com .in or .org"]
      },
    address: {
        type: String,
      },
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
