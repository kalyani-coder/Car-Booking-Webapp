

const mongoose = require('mongoose')

const rateSchema = new mongoose.Schema({
    company_Name :String,
    Customer_Number : Number,
    GST_No : {
        type: String,
        required: [true, "GST number is required"],
        match: [/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, "Please enter a valid GST number"]
      },
    customer_Name : {
        type: String,
        required: [true, "Customer name is required"],
        validate: {
          validator: function (v) {
            return /^[a-zA-Z\s]+$/.test(v); // Only letters and spaces
          },
          message: props => `${props.value} is not a valid name! Only letters and spaces are allowed.`
        }
      },
      
    mobile_Number : {
        type: Number,
        required: [true, "Customer mobile number is required"],
        validate: {
          validator: function (v) {
            return /^[0-9]{10}$/.test(v.toString()); // Exactly 10 digits
          },
          message: props => `${props.value} is not a valid mobile number! Only 10 digits are allowed.`
        }
      },
    rate_per_Km :{
        type : Number,
        required : [true, "Rate per KM Is required"]
    },
    title : String,
    rate : { 
        type : Number,
        required : [true , "Rate must be in a Number "]
    },
})

const newRateSchema = mongoose.model('rate' , rateSchema)

module.exports = newRateSchema