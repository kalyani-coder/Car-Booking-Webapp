const mongoose = require('mongoose')

const CorporateCustomerSchema = new mongoose.Schema({
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
   extra_hours : String

})

const NewCorporateCustomer = mongoose.model('Corporate-Customer' , CorporateCustomerSchema)

module.exports = NewCorporateCustomer