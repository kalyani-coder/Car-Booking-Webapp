
const express = require('express')
const NewVenderpayment = require('../models/VenderPaymentModel')
const router = express.Router()

// GET METHOD 
router.get('/' , async(req , res) => {
    try{
        Venderpayment = await NewVenderpayment.find()
        res.status(201).json(Venderpayment)

    }catch(e){
        res.status(404).json({message : "Can not get customer"})
    }
})

// GET BY ID 
router.get('/:id' , async(req, res) => {

        const VenderpaymentId = req.params.id 

        try{

            const Venderpayment = await NewVenderpayment.findById(VenderpaymentId)
            if(!Venderpayment){
                return res.status(404).json({message : "Customer Not found"})
            }
            res.json(Venderpayment)

        }catch(e){
            res.status(404).json({message : "Customer Enquiry Not Found"})
        }
    
})

// POST METHOD 
router.post('/' , async(req, res) => {

    try{
        const Venderpayment = new NewVenderpayment(req.body)
        const newVenderpayment = await Venderpayment.save()
        res.status(201).json({message : "Data post Successfully"})

    }catch(e){
        res.status(404).json({message : "Can not post customer enquiry"})
    }
})

// PATCH METHOD 
router.patch('/:id' , async(req, res) => {

    const VenderpaymentId = req.params.id
    
    try{
        const UpdatedVenderpayment = await NewVenderpayment.findByIdAndUpdate(VenderpaymentId , req.body ,{
            new : true
        })
        res.status(201).json({message : "Customer Enquiry Successfully updated "})

    }catch(e){
        res.status(404).json({message : "Can not patch Customer enquiry"})
    }
})

// DELETE METHOD
router.delete('/:id' , async(req, res) => {

    const VenderpaymentId = req.params.id 

    try{
        const deletedCustomeEnquiry = await NewVenderpayment.findByIdAndRemove(VenderpaymentId)
        res.status(201).json({message : " Customer Enquiry Successfully Deleted "})
    }catch(e){
        res.status(404).json({message : "Can not found" , e})
    }
})

module.exports = router;