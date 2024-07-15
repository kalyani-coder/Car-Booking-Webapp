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
    Cus_Type: String,
    Cus_name: {
        type: String,
        required: [true, "Customer name is required"],
        validate: {
          validator: function (v) {
            return /^[a-zA-Z\s]+$/.test(v); // Only letters and spaces
          },
          message: props => `${props.value} is not a valid name! Only letters and spaces are allowed.`
        }
      },

    company_name: {
    type: String,
    required: [true, "Company name is required"],
    validate: {
      validator: function (v) {
        return /^[a-zA-Z\s]+$/.test(v); // Only letters and spaces
      },
      message: props => `${props.value} is not a valid name! Only letters and spaces are allowed.`
    }
  },
    gst_no:{
        type: String,
        required: [true, "GST number is required"],
        match: [/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, "Please enter a valid GST number"]
      },
    Cus_Mobile:{
        type: Number,
        required: [true, "Customer mobile number is required"],
        validate: {
          validator: function(v) {
            return /^[0-9]{10}$/.test(v.toString()); // Exactly 10 digits
          },
          message: props => `${props.value} is not a valid mobile number! Only 10 digits are allowed.`
        }
      },
    Cus_Email: {
        type: String,
        required: [true, "Email is required"],
        match: [/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.(com|in)$/, "Please enter a valid email address ending with .com or .in"]
      },

    address: String,
    type_of_vehicle: String,
    rate_per_km: String,
    duty_type: String,
    rate: String,
    km: String,
    extra_km: String,
    hours: String,
    extra_hours: String,
    date: { type: String, default: getCurrentDate },
    from: String,
    to: String,


})
CorporateCustomerSchema.pre('save', function (next) {
    if (!this.date) {
        this.date = getCurrentDate();
    }
    next();
});

const NewCorporateCustomer = mongoose.model('Corporate-Customer', CorporateCustomerSchema)

module.exports = NewCorporateCustomer