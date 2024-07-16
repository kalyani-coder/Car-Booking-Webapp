const mongoose = require('mongoose')

const indivisualCustomerSchema = new mongoose.Schema({
    customerId: String,
    Cus_Type: String,
    Cus_name: {
        type: String,
        required: [true, "Customer name is required"],
        validate: {
            validator: function (v) {
                return /^[a-zA-Z\s]+$/.test(v);
            },
            message: props => `${props.value} is not a valid name! Only letters and spaces are allowed.`
        }
    },
    gst_no: {
        type: String,
        required: [true, "GST number is required"],
        match: [/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, "Please enter a valid GST number"]
    },
    Cus_Mobile: {
        type: Number,
        required: [true, "Customer mobile number is required"],
        validate: {
            validator: function (v) {
                return /^[0-9]{10}$/.test(v.toString());
            },
            message: props => `${props.value} is not a valid mobile number! Only 10 digits are allowed.`
        }
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
    from: String,
    to: String,
});

const NewindivisualCustomer = mongoose.model('indivisual-Customer' , indivisualCustomerSchema)

module.exports = NewindivisualCustomer