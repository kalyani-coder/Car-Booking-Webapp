
const express = require('express')
const newShareDetailsSchema = require('../models/ShareDetalsModel')
const router = express.Router()

// GET METHOD 
router.get('/' , async(req , res) => {
    try{
       const shareDetailsget = await newShareDetailsSchema.find()
        res.status(201).json(shareDetailsget)

    }catch(e){
        res.status(404).json({message : "Can not get customer"})
    }
})

// GET BY ID 
router.get('/:id' , async(req, res) => {

        const shareDetailsId = req.params.id 

        try{

            const shareDetails = await newShareDetailsSchema.findById(shareDetailsId)
            if(!shareDetails){
                return res.status(404).json({message : "Customer Not found"})
            }
            res.json(shareDetails)

        }catch(e){
            res.status(404).json({message : "Customer Enquiry Not Found"})
        }
    
})

// POST METHOD 
router.post('/' , async(req, res) => {

    try{
        const shareDetailspost = new newShareDetailsSchema(req.body)
        await shareDetailspost.save()
        res.status(201).json({message : "Data post Successfully"})

    }catch(e){
        res.status(404).json({message : "Can not post customer enquiry",e})
    }
})

// PATCH METHOD 
router.patch('/:id' , async(req, res) => {

    const shareDetailsId = req.params.id
    
    try{
        const UpdatedshareDetails = await newShareDetailsSchema.findByIdAndUpdate(shareDetailsId , req.body ,{
            new : true
        })
        res.status(201).json({message : "Customer Enquiry Successfully updated "})

    }catch(e){
        res.status(404).json({message : "Can not patch Customer enquiry"})
    }
})

// DELETE METHOD
router.delete('/:id' , async(req, res) => {

    const shareDetailsId = req.params.id 

    try{
        const deletedCustomeEnquiry = await newShareDetailsSchema.findByIdAndRemove(shareDetailsId)
        res.status(201).json({message : " Customer Enquiry Successfully Deleted "})
    }catch(e){
        res.status(404).json({message : "Can not found" , e})
    }
})

module.exports = router;