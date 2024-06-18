
const express = require('express')
const newRateSchema = require('../models/RateModel')
const router = express.Router()

// GET METHOD 
router.get('/' , async(req , res) => {
    try{
        const rateSchema = await newRateSchema.find()
        res.status(201).json(rateSchema)

    }catch(e){
        res.status(404).json({message : "Can not get venders"})
    }
})

// GET BY ID 
router.get('/:id' , async(req, res) => {

        const rateSchemaId = req.params.id 

        try{

            const rateSchema = await newRateSchema.findById(rateSchemaId)
            if(!rateSchema){
                return res.status(404).json({message : "venders Not found"})
            }
            res.json(rateSchema)

        }catch(e){
            res.status(404).json({message : "venders Not Found"})
        }
    
})

// POST METHOD 
router.post('/' , async(req, res) => {
    try{
        const rate = new newRateSchema(req.body)
        await rate.save()
        res.status(201).json({message : "Data post Success"})
    }catch(e){
        res.status(404).json({message : "Internal server error "})
    }
})

// PATCH METHOD 
router.patch('/:id' , async(req, res) => {

    const rateSchemaId = req.params.id
    
    try{
        const UpdatedrateSchema = await newRateSchema.findByIdAndUpdate(rateSchemaId , req.body ,{
            new : true
        })
        res.status(201).json({message : "venders Successfully updated "})

    }catch(e){
        res.status(404).json({message : "Can not patch venders"})
    }
})

// DELETE METHOD
router.delete('/:id' , async(req, res) => {

    const rateSchemaId = req.params.id 

    try{
        const deletedCustomeEnquiry = await newRateSchema.findByIdAndDelete(rateSchemaId)
        res.status(201).json({message : "venders Successfully Deleted "})
    }catch(e){
        res.status(404).json({message : "Can not found" , e})
    }
})

module.exports = router;