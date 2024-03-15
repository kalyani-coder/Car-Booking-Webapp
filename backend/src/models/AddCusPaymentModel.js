const mongoose = require("mongoose");

const AddPaymentSchema = new mongoose.Schema({
  
  company_Name: String,
  GST_No: String,
  reporting_Address: String,
  Date: String,
  customer_Name: String,
  mobile_no: Number,
  vehicle_Number: String,
  vehicle_Type: String,
  quantity: Number,
  from: String,
  to: String,
  closing_km: String,
  closing_Time: String,
  starting_Km: String,
  starting_Time: String,
  total_Km: String,
  total_hours: String,
  title: String,
  title_Amount: Number,
  ratePerKm:Number,
  extra_Km: String,
  extramkm_Amount: Number,
  extrakm_CGST: Number,
  extrakm_SGST: Number,
  ratePerHour: Number,
  extra_Hours: String,
  extrahours_CGST: Number,
  extrahours_SGST: Number,
  extrahours_Amount: String,
  subtotal_Amount: Number,
  toll:Number,
  SGST: Number,
  CGST: Number,
  total_Amount: Number,
  advance_Amount: Number,
  remaining_Amount: Number,
  payment_Method: String,
  customerId : String,
  chequeNo : String,
  ifscCode : String,
  upiId : String,
  cashReceiver : String,
  transactionId : String,
  TransactionNumber : String,

});

const NewAddPaymentDetails = new mongoose.model(
  "/Customer-payment-details",
  AddPaymentSchema
);

module.exports = NewAddPaymentDetails;

// name : String,
// trip_Details : {

//     from : String,
//     to : String
// },
// trip_Time : {

//     closing_kms :String,
//     closing_Time : String,

// },
// trip_Distance : {

//     starting_kms : String,
//     reporting_kms :String,
// },
// trip_Totalkm : {
//     total_kms : String,
//     total_hours : String,
// },
// trip_title : {
//     title : String,
//     amount : Number,
// },
// extra_tripDetails : {
//     extra_kms : String,
//     amount : Number,

// },
// extra_tripHours : {
//     extra_Hours : String,
//     payment : Number,
// },
// trip_bydays : {
//     oneDaykm_rate : String,
//     amount : Number,
// },
// trip_Total : {
//     total_Amount : Number,
//     advance_Payment : Number
// },
