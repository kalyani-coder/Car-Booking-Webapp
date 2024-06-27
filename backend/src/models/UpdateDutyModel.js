

const mongoose = require('mongoose');

const UpdateDutySchema = new mongoose.Schema({

       
    companyname: { type: String, required: true, minlength: 2, maxlength: 50 },
    gstno: { type: String, required: true, match: /^([0-9]){2}([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}([0-9]){1}([a-zA-Z]){1}([0-9A-Z]){1}?$/ },
    reportingaddress: { type: String, required: true, minlength: 10, maxlength: 100 },
    date: { type: String, required: true },
    name: { type: String, required: true, minlength: 2, maxlength: 50 },
    vehicle: { type: String, required: true, minlength: 2, maxlength: 20 },
    vehiclenumber: { type: String, required: true, match: /^([0-9]){2}([a-zA-Z]){3}([0-9]){4}$/ },
    from: { type: String, required: true, minlength: 2, maxlength: 50 },
    to: { type: String, required: true, minlength: 2, maxlength: 50 },
    closingkm: { type: String, required: true },
    closingtime: { type: String, required: true },
    startingkm: { type: String, required: true },
    startingtime: { type: String, required: true },
    totalkm: { type: String, required: true },
    totalhour: { type: String, required: true },
    title: { type: String, required: true, minlength: 2, maxlength: 50 },
    amount: { type: Number, required: true },
    extrakm: { type: String },
    amount1: { type: Number },
    extrahour: { type: String },
    amount2: { type: Number },
    totalamount: { type: Number, required: true },
    advanceamount: { type: Number, required: true },
    paymentmethod: { type: String, required: true },
    chequeNo: { type: String },
    ifscCode: { type: String },
    upiId: { type: String },
    cashReceiver: { type: String },
    transactionId: { type: String },
    TransactionNumber: { type: String },
    trip_duty_number: { type: Number, required: true },
    mobile_number: { type: String, required: true, match: /^(\+\d{1,3}[- ]?)?\d{10}$/ }
    
})
 
const newUpdateDutySchema  = mongoose.model('update-duty' , UpdateDutySchema);

module.exports = newUpdateDutySchema;