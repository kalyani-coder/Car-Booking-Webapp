const mongoose = require("mongoose");

const AddPaymentSchema = new mongoose.Schema({
  company_Name: {
    type: String,
    required: [true, 'Customer name is required'],
    minlength: [2, 'Customer name must be at least 2 characters long'],
    maxlength: [100, 'Customer name must be less than 100 characters long']
  },
  GST_No: {
    type: String,
    required: [true, 'GST number is required'],
    match: [/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/, 'Please fill a valid GST number']
  },
  reporting_Address: {
    type: String,
    maxlength: [200, 'Reporting address must be less than 200 characters long']
  },
  Date: {
    type: String,
    required: [true, 'Date is required']
  },
  customer_Name: {
    type: String,
    required: [true, 'Customer name is required']
  },
  mobile_no: {
    type: Number,
    required: [true, 'Customer mobile number is required'],
    validate: {
      validator: function(v) {
        return /\d{10}/.test(v);
      },
      message: props => `${props.value} is not a valid mobile number!`
    }
  },
  vehicle_Number: {
    type: String,
    required: [true, 'Vehicle number is required']
  },
  vehicle_Type: {
    type: String,
    required: [true, 'Vehicle type is required']
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [0, 'Quantity must be a positive number']
  },
  from: {
    type: String,
    required: [true, 'From location is required']
  },
  to: {
    type: String,
    required: [true, 'To location is required']
  },
  closing_km: {
    type: Number,
    required: [true, 'Closing kilometer is required'],
    min: [0, 'Closing kilometer must be a positive number']
  },
  closing_Time: {
    type: String,
    required: [true, 'Closing time is required']
  },
  starting_Km: {
    type: Number,
    required: [true, 'Starting kilometer is required'],
    min: [0, 'Starting kilometer must be a positive number']
  },
  starting_Time: {
    type: String,
    required: [true, 'Starting time is required']
  },
  total_Km: {
    type: Number,
    required: [true, 'Total kilometers are required'],
    min: [0, 'Total kilometers must be a positive number']
  },
  total_hours: {
    type: Number,
    required: [true, 'Total hours are required'],
    min: [0, 'Total hours must be a positive number']
  },
  title: {
    type: String,
    required: [true, 'Title is required']
  },
  title_Amount: {
    type: Number,
    required: [true, 'Title amount is required'],
    min: [0, 'Title amount must be a positive number']
  },
  ratePerKm: {
    type: Number,
    required: [true, 'Rate per kilometer is required'],
    min: [0, 'Rate per kilometer must be a positive number']
  },
  extra_Km: {
    type: Number,
    min: [0, 'Extra kilometers must be a positive number']
  },
  extramkm_Amount: {
    type: Number,
    min: [0, 'Extra kilometers amount must be a positive number']
  },
  extrakm_CGST: {
    type: Number,
    min: [0, 'Extra kilometers CGST must be a positive number']
  },
  extrakm_SGST: {
    type: Number,
    min: [0, 'Extra kilometers SGST must be a positive number']
  },
  ratePerHour: {
    type: Number,
    required: [true, 'Rate per hour is required'],
    min: [0, 'Rate per hour must be a positive number']
  },
  extra_Hours: {
    type: Number,
    min: [0, 'Extra hours must be a positive number']
  },
  extrahours_CGST: {
    type: Number,
    min: [0, 'Extra hours CGST must be a positive number']
  },
  extrahours_SGST: {
    type: Number,
    min: [0, 'Extra hours SGST must be a positive number']
  },
  extrahours_Amount: {
    type: Number,
    min: [0, 'Extra hours amount must be a positive number']
  },
  subtotal_Amount: {
    type: Number,
    required: [true, 'Subtotal amount is required'],
    min: [0, 'Subtotal amount must be a positive number']
  },
  toll: {
    type: Number,
    min: [0, 'Toll must be a positive number']
  },
  SGST: {
    type: Number,
    min: [0, 'SGST must be a positive number']
  },
  CGST: {
    type: Number,
    min: [0, 'CGST must be a positive number']
  },
  total_Amount: {
    type: Number,
    required: [true, 'Total amount is required'],
    min: [0, 'Total amount must be a positive number']
  },
  advance_Amount: {
    type: Number,
    min: [0, 'Advance amount must be a positive number']
  },
  remaining_Amount: {
    type: Number,
    min: [0, 'Remaining amount must be a positive number']
  },
  payment_Method: {
    type: String,
    required: [true, 'Payment method is required'],
    enum: ['Cash', 'Cheque', 'UPI', 'Net Banking', 'Other']
  },
  customerId: {
    type: String,
    required: [true, 'Customer ID is required']
  },
  chequeNo: {
    type: String,
    required: function() {
      return this.payment_Method === 'Cheque';
    }
  },
  ifscCode: {
    type: String,
    required: function() {
      return this.payment_Method === 'Cheque';
    },
    match: [/^[A-Z]{4}0[A-Z0-9]{6}$/, 'Please fill a valid IFSC code']
  },
  upiId: {
    type: String,
    required: function() {
      return this.payment_Method === 'UPI';
    },
    match: [/^[\w.-]+@[\w.-]+$/, 'Please fill a valid UPI ID']
  },
  cashReceiver: {
    type: String,
    required: function() {
      return this.payment_Method === 'Cash';
    }
  },
  transactionId: {
    type: String,
    required: function() {
      return this.payment_Method !== 'Cash';
    }
  },
  TransactionNumber: {
    type: String,
    required: function() {
      return this.payment_Method !== 'Cash';
    }
  }
});

const NewAddPaymentDetails = new mongoose.model(
  "Customer-payment-details",
  AddPaymentSchema
);

module.exports = NewAddPaymentDetails;
