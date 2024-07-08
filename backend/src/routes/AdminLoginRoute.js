const express = require('express')
const router = express.Router()
const AdminSchema = require("../models/AdminLogin")
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'carbooking'

router.get("/admin", async (req, res) => {
    try {
        const getAdmin = await AdminSchema.find()
        if (!getAdmin) {
            return res.status(404).json({ message: "Admin Get Route Not Found" })
        }
        else {
            return res.status(201).json(getAdmin)
        }
    } catch (err) {
        res.status(500).json({ message: "Internal server error" })
    }
})


// REGISTER ROUTE
router.post('/admin/register', async (req, res) => {
    const { email, password, name } = req.body;

    try {
        // Hash the password
        // const hashedPassword = await bcrypt.hash(password, 10);

        const admin = new AdminSchema({
            email,
            password,
            name,
            
        });

        await admin.save();

        res.status(201).json({ message: 'Admin registered successfully', admin });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ message: messages.join(', ') });
        }
        res.status(500).json({ message: 'An error occurred during registration', error });
    }
});

// LOGIN ROUTE /
router.post('/admin/login', async (req, res) => {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const admin = await AdminSchema.findOne({ email });

        if (!admin) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

         // Compare the password (without bcrypt) bcoz server not able to install bcrypt dependency
         if (password !== admin.password) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: admin._id, email: admin.email },
            JWT_SECRET,
        );

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred during login', error });
    }
});


router.delete("/admin/:id" , async(req, res) => {
    try{
        const id = req.params.id
        const deletedAdmin = await AdminSchema.findByIdAndDelete(id , {new :true})
        if(!deletedAdmin.email){
            return res.status(404).json({message : "adminId not found"})
        }
        res.status(201).json({message : "Admin deleted succefully", deletedAdmin})
    }
    catch(e){
        res.status(500).json({message : "Internal server error"})
    }
})


module.exports = router