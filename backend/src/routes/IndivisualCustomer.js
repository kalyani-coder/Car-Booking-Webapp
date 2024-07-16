
const express = require('express')
const IndivisualCustomer = require('../models/IndivisualCustomerModel')
const router = express.Router()

// GET METHOD 
router.get('/' , async(req , res) => {
    try{
       const AddVenders = await IndivisualCustomer.find()
        res.status(201).json(AddVenders)

    }catch(e){
        res.status(404).json({message : "Can not get venders"})
    }
})

// GET BY ID 
router.get('/:id' , async(req, res) => {

        const AddVendersId = req.params.id 

        try{

            const AddVenders = await IndivisualCustomer.findById(AddVendersId)
            if(!AddVenders){
                return res.status(404).json({message : "Indivisual Customer Not found"})
            }
            res.json(AddVenders)

        }catch(e){
            res.status(404).json({message : "venders Not Found"})
        }
    
})

// POST METHOD 
router.post('/', async (req, res) => {
    try {
        const newCustomer = new IndivisualCustomer(req.body);
        await newCustomer.save();
        res.status(201).json({ message: "Indivisual Customer Added Successfully" });
    } catch (e) {
        if (e.name === 'ValidationError') {
          const errorMessages = Object.values(e.errors).map(err => err.message);
          res.status(400).json({ message: errorMessages.join(', ') });
        } else {
          res.status(500).json({ message: "Internal Server Error" });
        }
      }
    });

// PATCH METHOD 
router.patch('/:id', async (req, res) => {
    try {
        const updatedCustomer = await IndivisualCustomer.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updatedCustomer) {
            return res.status(404).json({ message: "Indivisual Customer not found" });
        }
        res.status(200).json({ message: "Indivisual Customer Updated Successfully" });
    } catch (e) {
        if (e.name === 'ValidationError') {
            const errorMessages = Object.values(e.errors).map(err => err.message);
            res.status(400).json({ message: errorMessages.join(', ') });
        } else {
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
});

// DELETE METHOD
router.delete('/:id' , async(req, res) => {

    const AddVendersId = req.params.id 

    try{
        const deletedCustomeEnquiry = await IndivisualCustomer.findByIdAndDelete(AddVendersId)
        res.status(201).json({message : "Indivisual Customer Successfully Deleted "})
    }catch(e){
        res.status(404).json({message : "Can not found" , e})
    }
})

module.exports = router;