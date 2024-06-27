const mongoose = require('mongoose')


function getCurrentDate() {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    
    return `${day}-${month}-${year}`;
}

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
//    extra_km :String,
   hours : String,
   extra_hours : String,
  date: { type: String, default: getCurrentDate },
  from :String,
  to : String,
  

})
CorporateCustomerSchema.pre('save', function(next) {
    if (!this.date) {
        this.date = getCurrentDate();
    }
    next();
});

const NewCorporateCustomer = mongoose.model('Corporate-Customer' , CorporateCustomerSchema)

module.exports = NewCorporateCustomer