

const mongoose = require('mongoose');

const UpdateDutySchema = new mongoose.Schema({

       
    companyname: String,
    gstno: String,
    reportingaddress: String, 
    date: String,
    name: String,
    vehicle: String,
    vehiclenumber: String,
    from:String,
    to:String,
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