
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
    required: [true, 'Customer name is required'],
    minlength: [2, 'Customer name must be at least 2 characters long'],
    maxlength: [100, 'Customer name must be less than 100 characters long']
  },
  company_name: {
    type: String,
    required: [true, 'Company name is required'],
    minlength: [2, 'Company name must be at least 2 characters long'],
    maxlength: [100, 'Company name must be less than 100 characters long']
  },
  gst_no: {
    type: String,
    required: [true, 'GST number is required'],
    match: [/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/, 'Please fill a valid GST number']
  },
  cus_mobile: {
    type: Number,
    required: [true, 'Customer mobile number is required'],
    validate: {
      validator: function(v) {
        return /^\d{10}$/.test(v);
      },
      message: '{VALUE} is not a valid mobile number!'
    }
  },
  cus_email: {
    type: String,
    required: [true, 'Customer email is required'],
    match: [/^\w+([\.-]?\w+)*@([\.-]?\w+)\.\w{2,3}$/, 'Please fill a valid email address']
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
    minlength: [2, 'Address must be at least 2 characters long'],
    maxlength: [200, 'Address must be less than 200 characters long']
  },
  Cus_Type: {
    type: String,
    required: [true, 'Customer type is required']
  }
});

const NewAddCustomer = mongoose.model('NewAddCustomer', newAddCustomerSchema);

module.exports = NewAddCustomer;
