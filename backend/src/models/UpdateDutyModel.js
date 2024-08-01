

const mongoose = require('mongoose');

const UpdateDutySchema = new mongoose.Schema({

       
    companyname: {
        type: String,
        required: [true, "Company name is required"],
        validate: {
            validator: function (v) {
                return /^[a-zA-Z\s]+$/.test(v);
            },
            message: props => `${props.value} is not a valid name! Only letters and spaces are allowed.`
        }
    },
    // gstno: String,
    reportingaddress: String, 
    date: String,
    name: String,
    vehicle: String,
    vehiclenumber: String,
    from: {
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
    closingkm:String,
    closingtime:String,
    startingkm:String,
    startingtime:String,
    totalkm: String,
    totalhour: String,
    title:String,
    amount:Number,
    extrakm:String,
    amount1:Number,
    extrahour:String,
    amount2:Number,
    totalamount:Number,
    advanceamount:Number,
    paymentmethod :String,
    chequeNo : String,
    ifscCode : String,
    upiId : String,
    cashReceiver : String,
    transactionId : String,
    TransactionNumber : String,
    trip_duty_number : Number   

    
})
 
const newUpdateDutySchema  = mongoose.model('update-duty' , UpdateDutySchema);

module.exports = newUpdateDutySchema;