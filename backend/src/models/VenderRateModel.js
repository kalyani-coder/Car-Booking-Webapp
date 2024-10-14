

const mongoose = require('mongoose')

const venderRateSchema = new mongoose.Schema({
    Customer_Number : Number,
    company_Name : {
        type: String,
        required: [true, "Company name is required"],
        validate: {
            validator: function (v) {
                return /^[a-zA-Z\s]+$/.test(v);
            },
            message: props => `${props.value} is not a valid name! Only letters and spaces are allowed.`
        }
    },
    GST_No : {
        type: String,
        required: [true, "GST number is required"],
        match: [/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, "Please enter a valid GST number"]
    },
    vender_Name :  {
        type: String,
        required: [true, "Vendor name is required"],
        validate: {
            validator: function (v) {
                return /^[a-zA-Z\s]+$/.test(v);
            },
            message: props => `${props.value} is not a valid name! Only letters and spaces are allowed.`
        }
    },
    vender_id : String,
    mobile_Number :  {
        type: Number,
        required: [true, "Customer mobile number is required"],
        validate: {
            validator: function (v) {
                return /^[0-9]{10}$/.test(v.toString());
            },
            message: props => `${props.value} is not a valid mobile number! Only 10 digits are allowed.`
        }
    },
    vehicle: String,
    address: String,
    // rate_per_Km :String,
    title : String,
    rate : String,
    hour: String,
    km: String,
     extra_km: String,
    extra_hour: String,
    from:  {
        type: String,
        required: [true, "Pickup Location is required"],
        validate: {
            validator: function (v) {
                return /^[a-zA-Z\s]+$/.test(v);
            },
            message: props => `${props.value} is not a valid name! Only letters and spaces are allowed.`
        }
    },
    to: {
        type: String,
        required: [true, "Drop off location is required"],
        validate: {
            validator: function (v) {
                return /^[a-zA-Z\s]+$/.test(v);
            },
            message: props => `${props.value} is not a valid name! Only letters and spaces are allowed.`
        }
    },
    date: String
,
})

const newRateSchemaVender = mongoose.model('vender-rate' , venderRateSchema)

module.exports = newRateSchemaVender