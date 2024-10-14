

const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({

    customer_id: String,
    customer_name: {
        type: String,
        required: [true, "Customer name is required"],
        validate: {
            validator: function (v) {
                return /^[a-zA-Z\s]+$/.test(v); // Only letters and spaces
            },
            message: props => `${props.value} is not a valid name! Only letters and spaces are allowed.`
        }
    },
    mobileno: {
        type: Number,
        required: [true, "Customer mobile number is required"],
        validate: {
            validator: function (v) {
                return /^[0-9]{10}$/.test(v.toString()); // Exactly 10 digits
            },
            message: props => `${props.value} is not a valid mobile number! Only 10 digits are allowed.`
        }
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        match: [/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.(com|in|org)$/, "Please enter a valid email address ending with .com .in or .org"]
    },
    tripe_type: String,
    sub_type: String,
    pic_up: String,
    date1: Date,
    time1: String,
    drop_of: String,
    date2: Date,
    time: String,
    vehicle: String,
    address: {
        type: String,
        maxLength: [100, 'Address cannot be more than 50 characters']
    },
    time2: String,
    totalDays: String,
    totalHours: String,
    Customer_Number : Number,


})

const newCustomerSchema = mongoose.model('/customer-inquiry', CustomerSchema);

module.exports = newCustomerSchema;