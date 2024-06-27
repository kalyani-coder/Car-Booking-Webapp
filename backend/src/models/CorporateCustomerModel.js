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
    Cus_Type: { type: String, required: true },
    Cus_name: { type: String, required: true },
    company_name: { type: String, required: true },
    gst_no: { type: String, required: true, match: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/ },
    Cus_Mobile: { type: Number, required: true },
    Cus_Email: { type: String, required: true, match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ },
    address: { type: String, required: true },
    type_of_vehicle: { type: String, required: true },
    rate_per_km: { type: Number, required: true },
    duty_type: { type: String, required: true },
    rate: { type: Number, required: true },
    km: { type: Number, required: true },
    hours: { type: Number, required: true },
    extra_hours: { type: Number, required: true },
    date: { type: Date, default: getCurrentDate },
    from: { type: String, required: true },
    to: { type: String, required: true },

})
CorporateCustomerSchema.pre('save', function(next) {
    if (!this.date) {
        this.date = getCurrentDate();
    }
    next();
});

const NewCorporateCustomer = mongoose.model('Corporate-Customer' , CorporateCustomerSchema)

module.exports = NewCorporateCustomer