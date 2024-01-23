
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

router.post("/", async (req, res) => {
    try {
        const tripDetails = new newTripDetailsSchema(req.body); // Use 'new' to create a new instance
        await tripDetails.save(); // Save the instance
        res.status(201).json({ message: "Data posted successfully" });
    } catch (e) {
        res.status(404).json({ message: "Cannot post trip details", error: e.message });
    }
});


// PATCH METHOD 
router.patch('/:id' , async(req, res) => {

    const tripDetailsId = req.params.id
    
    try{
        const UpdatedtripDetails = await newTripDetailsSchema.findByIdAndUpdate(tripDetailsId , req.body ,{
            new : true
        })
        res.status(201).json({message : "post trip details successfully "})

    }catch(e){
        res.status(404).json({message : "Can not patch trip details"})
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