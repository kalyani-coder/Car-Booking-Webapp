
// const mongoose = require('mongoose')

// const AddCustomerSchema = new mongoose.Schema({

//    Cus_name : String,
//    company_name : String,
//    gst_no :String,
//    Cus_Mobile : String,
//    Cus_Email : String,
//    address : String,

// })

// const NewAddCustomer = mongoose.model('AddCustomer' , AddCustomerSchema)

// module.exports = NewAddCustomer
const mongoose = require('mongoose');

const newAddCustomerSchema = new mongoose.Schema({
  cus_name: {
    type: String,
    required: [true, "Customer name is required"],
    validate: {
      validator: function(v) {
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
      validator: function(v) {
        return /^[0-9]{10}$/.test(v.toString()); // Exactly 10 digits
      },
      message: props => `${props.value} is not a valid mobile number! Only 10 digits are allowed.`
    }
  },
  cus_email: {
    type: String,
    required: [true, "Email is required"],
    match: [/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}(?<!\.)$/, "Please enter a valid email address"]
  },
  address: {
    type: String,
    validate: {
      validator: function(v) {
        return v.length >= 20 || v.length === 0; // At least 20 characters or empty
      },
      message: props => `Address must be at least 20 characters long`
    }
  },
  Cus_Type: {
    type: String,
    required: [true, "Customer type is required"]
  }
});


const NewAddCustomer = mongoose.model('NewAddCustomer', newAddCustomerSchema);

module.exports = NewAddCustomer;
