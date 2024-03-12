
const mongoose = require('mongoose')

const AddVendersSchema = new mongoose.Schema({

    vender_Name : String,
    company_Name : String,
    GST_No :String,
    vender_Mobile : Number,
    Vender_Email : String,
    address : String, 
    

})

const NewAddVenders = mongoose.model('AddVenders' , AddVendersSchema)

module.exports = NewAddVenders