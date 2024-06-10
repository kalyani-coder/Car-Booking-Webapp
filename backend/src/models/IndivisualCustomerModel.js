const mongoose = require('mongoose')

const indivisualCustomerSchema = new mongoose.Schema({
    customerId: String,
    Cus_Type : String,
   Cus_name : String,
   company_name : String,
   gst_no :String,
   Cus_Mobile : String,
   Cus_Email : String,
   address : String,
   type_of_vehicle : String,
   rate_per_km : String,
   duty_type : String,
   rate : String,
   km : String,
   extra_km :String,
   hours : String,
   extra_hours : String,
   from :String,
   to : String,

})

const NewindivisualCustomer = mongoose.model('indivisual-Customer' , indivisualCustomerSchema)

module.exports = NewindivisualCustomer