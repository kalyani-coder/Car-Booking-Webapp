
const express = require('express')
const newTripDetailsSchema = require('../models/TripDetailsModel')
const router = express.Router()

// GET METHOD 
router.get('/' , async(req , res) => {
    try{
        tripDetails = await newTripDetailsSchema.find()
        res.status(201).json(tripDetails)

    }catch(e){
        res.status(404).json({message : "Can not get customer"})
    }
})

// GET BY ID 
router.get('/:id' , async(req, res) => {

        const tripDetailsId = req.params.id 

        try{

            const tripDetails = await newTripDetailsSchema.findById(tripDetailsId)
            if(!tripDetails){
                return res.status(404).json({message : "Customer Not found"})
            }
            res.json(tripDetails)

        }catch(e){
            res.status(404).json({message : "Customer Enquiry Not Found"})
        }
    
})

// POST METHOD 
router.post('/' , async(req, res) => {

    try{
        const tripDetails = new newTripDetailsSchema(req.body)
        const newtripDetails = await tripDetails.save()
        res.status(201).json({message : "Data post Successfully"})

    }catch(e){
        res.status(404).json({message : "Can not post customer enquiry"})
    }
})

// PATCH METHOD 
router.patch('/:id' , async(req, res) => {

    const tripDetailsId = req.params.id
    
    try{
        const UpdatedtripDetails = await newTripDetailsSchema.findByIdAndUpdate(tripDetailsId , req.body ,{
            new : true
        })
        res.status(201).json({message : "Customer Enquiry Successfully updated "})

    }catch(e){
        res.status(404).json({message : "Can not patch Customer enquiry"})
    }
})

// DELETE METHOD
router.delete('/:id' , async(req, res) => {

    const tripDetailsId = req.params.id 

    try{
        const deletedCustomeEnquiry = await newTripDetailsSchema.findByIdAndRemove(tripDetailsId)
        res.status(201).json({message : " Customer Enquiry Successfully Deleted "})
    }catch(e){
        res.status(404).json({message : "Can not found" , e})
    }
})

module.exports = router;