
const mongoose = require('mongoose')

const AddVendersSchema = new mongoose.Schema({

    vender_Name: {
        type: String,
        required: [true, "Vendor name is required"],
        validate: {
          validator: function (v) {
            return /^[a-zA-Z\s]+$/.test(v); // Only letters and spaces
          },
          message: props => `${props.value} is not a valid name! Only letters and spaces are allowed.`
        }
      },
      company_Name: {
        type: String,
        required: [true, "Company name is required"]
      },
      GST_No: {
        type: String,
        required: [true, "GST number is required"],
        match: [/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, "Please enter a valid GST number"]
      },
      vender_Mobile: {
        type: Number,
        required: [true, "Vendor mobile number is required"],
        validate: {
          validator: function (v) {
            return /^[0-9]{10}$/.test(v.toString()); // Exactly 10 digits
          },
          message: props => `${props.value} is not a valid mobile number! Only 10 digits are allowed.`
        }
      },
      Vender_Email: {
        type: String,
        required: [true, "Email is required"],
        match: [/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.(com|in)$/, "Please enter a valid email address ending with .com or .in"]
      },
      address: {
        type: String,
      }

})

const NewAddVenders = mongoose.model('AddVenders' , AddVendersSchema)

module.exports = NewAddVenders