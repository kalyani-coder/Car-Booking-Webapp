
const express = require('express')
const newDriverSchema = require('../models/DriverModel')
const router = express.Router()

// GET METHOD 
router.get('/' , async(req , res) => {
    try{
        const AddVenders = await newDriverSchema.find()
        res.status(201).json(AddVenders)

    }catch(e){
        res.status(404).json({message : "Can not get venders"})
    }
})

// GET BY ID 
router.get('/:id' , async(req, res) => {

        const AddVendersId = req.params.id 

        try{

            const AddVenders = await newDriverSchema.findById(AddVendersId)
            if(!AddVenders){
                return res.status(404).json({message : "venders Not found"})
            }
            res.json(AddVenders)

        }catch(e){
            res.status(404).json({message : "venders Not Found"})
        }
    
})



// PATCH METHOD 
router.patch('/:id' , async(req, res) => {

    const AddVendersId = req.params.id
    
    try{
        const UpdatedAddVenders = await newDriverSchema.findByIdAndUpdate(AddVendersId , req.body ,{
            new : true
        })
        res.status(201).json({message : "venders Successfully updated "})

    }catch(e){
        res.status(404).json({message : "Can not patch venders"})
    }
})

// DELETE METHOD
router.delete('/:id' , async(req, res) => {

    const AddVendersId = req.params.id 

    try{
        const deletedCustomeEnquiry = await newDriverSchema.findByIdAndRemove(AddVendersId)
        res.status(201).json({message : "venders Successfully Deleted "})
    }catch(e){
        res.status(404).json({message : "Can not found" , e})
    }
})

module.exports = router;