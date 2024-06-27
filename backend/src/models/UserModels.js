

const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Name is required'],
        minlength: [2, 'Name must be at least 2 characters long'],
        maxlength: [100, 'Name must be less than 100 characters long']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        minlength: [6, 'Email must be at least 6 characters long'],
        maxlength: [100, 'Email must be less than 100 characters long']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long'],
        maxlength: [100, 'Password must be less than 100 characters long'],
        match: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, 'Minimum 6 characters, at least one uppercase letter, one lowercase letter, one number and one special character']
    },
        // contact_Nu : Number,
})

const newUserSchema = mongoose.model('/users' , usersSchema)

module.exports = newUserSchema;
