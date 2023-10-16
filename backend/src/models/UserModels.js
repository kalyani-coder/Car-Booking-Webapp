

const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({

    user_Name : String,
    contact_Nu : Number,
    email : String,
    password : String,


})

const newUserSchema = mongoose.model('/users' , usersSchema)

module.exports = newUserSchema;
