

const mongoose = require('mongoose')

const AddPaymentSchema = new mongoose.Schema({

    company_Name : String,
    duty_SlipNo : String,
    reporting_Address : String,
    Date : String,
    name : String,
    vehicle_Number : String,
    vehicle_Type : String,
    trip_Details : {

        from : String,
        to : String
    },
    trip_Time : {

        closing_kms :String,
        closing_Time : String,

    },
    trip_Distance : {

        starting_kms : String,
        reporting_kms :String,
    },
    trip_Totalkm : {
        total_kms : String,
        total_hours : String,
    },
    trip_title : {
        title : String,
        amount : Number,
    },
    extra_tripDetails : {
        extra_kms : String,
        amount : Number,

    },
    extra_tripHours : {
        extra_Hours : String,
        payment : Number,
    },
    trip_bydays : {
        oneDaykm_rate : String,
        amount : Number,
    },
    trip_Total : {
        total_Amount : Number,
        advance_Payment : Number
    },

})

const NewAddPaymentDetails = new mongoose.model('/payment-details' , AddPaymentSchema)

module.exports = NewAddPaymentDetails