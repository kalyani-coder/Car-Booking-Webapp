
const mongoose = require('mongoose')

const AddCustomerSchema = new mongoose.Schema({

   Cus_name : String,
   company_name : String,
   gst_no :String,
   Cus_Mobile : String,
   Cus_Email : String,
   address : String,

})

const NewAddCustomer = mongoose.model('AddCustomer' , AddCustomerSchema)

module.exports = NewAddCustomer