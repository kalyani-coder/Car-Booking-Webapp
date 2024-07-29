
const mongoose = require('mongoose');

const newAddCustomerSchema = new mongoose.Schema({
  cus_name: {
    type: String,
    required: [true, "Customer name is required"],
    validate: {
      validator: function (v) {
        return /^[a-zA-Z\s]+$/.test(v); // Only letters and spaces
      },
      message: props => `${props.value} is not a valid name! Only letters and spaces are allowed.`
    }
  },
  company_name: String,
  gst_no: {
    type: String,
    required: [true, "GST number is required"],
    match: [/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, "Please enter a valid GST number"]
  },
  cus_mobile: {
    type: Number,
    required: [true, "Customer mobile number is required"],
    validate: {
      validator: function (v) {
        return /^[0-9]{10}$/.test(v.toString()); // Exactly 10 digits
      },
      message: props => `${props.value} is not a valid mobile number! Only 10 digits are allowed.`
    }
  },
  cus_email: {
    type: String,
    required: [true, "Email is required"],
    match: [/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.(com|in|org)$/, "Please enter a valid email address ending with .com .in or .org"]
  },
  address: {
    type: String,
    maxLength: [100, 'Address cannot be more than 50 characters']
  },
  Cus_Type: {
    type: String,
    required: [true, "Customer type is required"]
  }
});


const NewAddCustomer = mongoose.model('NewAddCustomer', newAddCustomerSchema);

module.exports = NewAddCustomer;
