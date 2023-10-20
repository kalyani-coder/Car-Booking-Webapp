
const express = require('express')
const NewAddPaymentSchema = require('../models/AddPaymentModel')
const router = express.Router()

// GET METHOD 
router.get('/' , async(req , res) => {
    try{
        NewAddPayment = await NewAddPaymentSchema.find()
        res.status(201).json(NewAddPayment)

    }catch(e){
        res.status(404).json({message : "Can not get customer"})
    }
})

// GET BY ID 
router.get('/:id' , async(req, res) => {

        const NewAddPaymentId = req.params.id 

        try{

            const NewAddPayment = await NewAddPaymentSchema.findById(NewAddPaymentId)
            if(!NewAddPayment){
                return res.status(404).json({message : "Customer Not found"})
            }
            res.json(NewAddPayment)

        }catch(e){
            res.status(404).json({message : "Customer Enquiry Not Found"})
        }
    
})

// POST METHOD 
router.post('/' , async(req, res) => {

    try{
        const NewAddPayment = new NewAddPaymentSchema(req.body)
        const newNewAddPayment = await NewAddPayment.save()
        res.status(201).json({message : "Data post Successfully"})

    }catch(e){
        res.status(404).json({message : "Can not post customer enquiry"})
    }
})

// PATCH METHOD 
router.patch('/:id' , async(req, res) => {

    const NewAddPaymentId = req.params.id
    
    try{
        const UpdatedNewAddPayment = await NewAddPaymentSchema.findByIdAndUpdate(NewAddPaymentId , req.body ,{
            new : true
        })
        res.status(201).json({message : "Customer Enquiry Successfully updated "})

    }catch(e){
        res.status(404).json({message : "Can not patch Customer enquiry"})
    }
})

// DELETE METHOD
router.delete('/:id' , async(req, res) => {

    const NewAddPaymentId = req.params.id 

    try{
        const deletedCustomeEnquiry = await NewAddPaymentSchema.findByIdAndRemove(NewAddPaymentId)
        res.status(201).json({message : " Customer Enquiry Successfully Deleted "})
    }catch(e){
        res.status(404).json({message : "Can not found" , e})
    }
})

module.exports = router;