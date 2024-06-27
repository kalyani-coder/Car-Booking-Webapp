

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

  company_Name: { type: String, required: true },
  GST_No: { type: String, required: true, match: /^\d{2}[A-Z]{5}\d{4}[A-Z]{1}\d[Z]{1}[A-Z\d]{1}$/ },
  vender_Name: { type: String, required: true },
  mobile_Number: { type: String, required: true, match: /^\d{10}$/ },
  address: { type: String, required: true },
  vehicle_type: { type: String, required: true },
  vehicle_number: { type: String, required: true, match: /^\d{2}\s?\d{2}\s?\d{2}\s?\d{2}$/ },
  title: { type: String, required: true },
  rate: { type: String, required: true },
  hour: { type: String, required: true },
  km: { type: Number, required: true },
  extra_km: { type: Number, required: true },
  extra_hour: { type: Number, required: true },
  total_km: { type: Number, required: true },
  total_hour: { type: Number, required: true },
  totalkm_amount: { type: Number, required: true },
  totalhour_amount: { type: Number, required: true },
  total_amount: { type: Number, required: true },
  payment: { type: String, required: true },
  amount: { type: Number, required: true },
  tds: { type: Number, required: true },
  paid_amount: { type: Number, required: true },
  remaining_Amount: { type: Number, required: true },
  payment_Method: { type: String, required: true },
  vender_id: { type: String, required: true },
  // Add a field for storing the current date
  current_Date: {
    type: String,
    default: () => formatDateToDDMMYYYY(new Date()),
  },

  // reporting_Address : String,
  // date : String,
  // vehicle_Number : String,
  // vehicle_Type : String,
  // from : String,
  // to : String,
  // closing_Km : String,
  // closing_Time : String,
  // starting_Km : String,
  // starting_Time : String,
  // total_km : String,
  // total_Hours : String,
  // title : String,
  // amount : Number,
  // extra_Km :String,
  // extra_km_amount : Number,
  // amount_extra_hours : String,
  // extra_Hours :String,
  // amount2 : Number,
  // total_Amount : Number,
  // advance_Amount : Number,
  // remaining_Amount : Number,
  // payment_Type : String
});

const NewVenderpayment = mongoose.model('vender-payment' , VenderPaymentSchema)

module.exports = NewVenderpayment