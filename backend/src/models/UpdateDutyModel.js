

const mongoose = require('mongoose');

const UpdateDutySchema = new mongoose.Schema({

       
    companyname: String,
    dutyslipno: String,
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
    amount:String,
    extrakm:String,
    amount1:String,
    extrahour:String,
    amount2:String,
    totalamount:String,
    advanceamount:String,
    
})
 
const newUpdateDutySchema  = mongoose.model('update-duty' , UpdateDutySchema);

module.exports = newUpdateDutySchema;