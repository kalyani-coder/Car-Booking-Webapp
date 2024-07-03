

const mongoose = require('mongoose')


function formatDateToDDMMYYYY(date) {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0'); // January is 0
  const year = d.getFullYear();

  return `${day}-${month}-${year}`;
}

const VenderPaymentSchema = new mongoose.Schema({
  // company_Name : String,
  // GST_No : String,
  // vender_Name : String,
  // mobile_Number : String,
  // payment :String,
  // amount : String,
  // tds : String,
  // total_Amount : Number,
  // paid_Amount:Number,
  // remaining_Amount : Number,
  // payment_Method : String,
  
  company_Name: String,
  GST_No: String,
  vender_Name: String,
  vender_id: String,
  mobile_Number: String,
  address: String,
  vehicle_type: String,
  vehicle_number: String,
  title: String,
  rate: String,
  hour: String,
  km: Number,
  extra_km: Number,
  extra_hour: Number,
  total_km: Number,
  total_hour: Number,
  totalkm_amount: Number,
  totalhour_amount: Number,
  total_amount: Number,
  payment: String,
  amount: Number,
  tds: Number,
  paid_amount: Number,
  remaining_Amount: Number,
  payment_Method: String,
  // Add a field for storing the current date
  current_Date: {
    type: String,
    default: () => formatDateToDDMMYYYY(new Date()),
  },
  from: String,
  to: String,
  date: String,

});

const NewVenderpayment = mongoose.model('vender-payment', VenderPaymentSchema)

module.exports = NewVenderpayment