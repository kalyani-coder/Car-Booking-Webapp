
const express = require('express')
const newCustomerSchema = require('../models/CustomerEnquiryModel')
const router = express.Router()

// GET METHOD 
router.get('/', async (req, res) => {
    try {
        const customerEnquiry = await newCustomerSchema.find()
        res.status(201).json(customerEnquiry)

    } catch (e) {
        res.status(404).json({ message: "Can not get customer" })
    }
})

// GET BY ID 
router.get('/:id', async (req, res) => {

    const customerId = req.params.id

    try {

        const customerEnquiry = await newCustomerSchema.findById(customerId)
        if (!customerEnquiry) {
            return res.status(404).json({ message: "Customer Not found" })
        }
        res.json(customerEnquiry)

    } catch (e) {
        res.status(404).json({ message: "Customer Enquiry Not Found" })
    }

})

// GET BY CUSTOMER ID 
router.get('/customer_id/:id', async (req, res) => {
    const customerId = req.params.id;

    try {
        const customerEnquiry = await newCustomerSchema.findOne({ customer_id: customerId });
        if (!customerEnquiry) {
            return res.status(404).json({ message: "Customer Not found" });
        }
        res.json(customerEnquiry);

    } catch (e) {
        res.status(404).json({ message: "Customer Enquiry Not Found" });
    }
});


// POST METHOD 
router.post('/', async (req, res) => {

    try {
        const customerEnquiry = new newCustomerSchema(req.body)
        const newCustomerenquiry = await customerEnquiry.save()
        res.status(201).json({ message: "Customer Enquiry added Successfully" })

    } catch (e) {
        if (e.name === 'ValidationError') {
            const errorMessages = Object.values(e.errors).map(err => err.message);
            res.status(400).json({ message: errorMessages.join(', ') });
        } else {
            console.error(e);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
});

// PATCH METHOD 
router.patch('/:id', async (req, res) => {
    const customerId = req.params.id
    try {
        const UpdatedCustomerEnquiry = await newCustomerSchema.findByIdAndUpdate(customerId, req.body, {
            new: true,
            runValidators : true
        })
        res.status(201).json({ message: "Customer Enquiry Successfully updated " })

    } catch (e) {
        if (e.name === 'ValidationError') {
            const errorMessages = Object.values(e.errors).map(err => err.message);
            res.status(400).json({ message: errorMessages.join(', ') });
        } else {
            console.error(e);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
});

// DELETE METHOD
router.delete('/:id', async (req, res) => {

    const customerId = req.params.id

    try {
        const deletedCustomeEnquiry = await newCustomerSchema.findByIdAndDelete(customerId)
        res.status(201).json({ message: " Customer Enquiry Successfully Deleted " })
    } catch (e) {
        res.status(404).json({ message: "Can not found", e })
    }
})

module.exports = router;