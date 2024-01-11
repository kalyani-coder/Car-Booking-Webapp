
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
  cus_name: String,
  company_name: String,
  gst_no: Number,
  cus_mobile: Number,
  cus_email: String,
  address: String,
});

const NewAddCustomer = mongoose.model('NewAddCustomer', newAddCustomerSchema);

module.exports = NewAddCustomer;
