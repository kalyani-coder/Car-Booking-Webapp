
const express = require('express')
const newUpdateDutySchema = require('../models/UpdateDutyModel')
const router = express.Router()

// GET METHOD 
router.get('/' , async(req , res) => {
    try{
        UpdateDuty = await newUpdateDutySchema.find()
        res.status(201).json(UpdateDuty)

    }catch(e){
        res.status(404).json({message : "Can not get customer"})
    }
})

// GET BY ID 
router.get('/:id' , async(req, res) => {

        const UpdateDutyId = req.params.id 

        try{

            const UpdateDuty = await newUpdateDutySchema.findById(UpdateDutyId)
            if(!UpdateDuty){
                return res.status(404).json({message : "Customer Not found"})
            }
            res.json(UpdateDuty)

        }catch(e){
            res.status(404).json({message : "Customer Enquiry Not Found"})
        }
    
})

// POST METHOD 
router.post('/' , async(req, res) => {

    try{
        const UpdateDuty = new newUpdateDutySchema(req.body)
        const newUpdateDuty = await UpdateDuty.save()
        res.status(201).json({message : "Data post Successfully"})

    }catch(e){
        res.status(404).json({message : "Can not post customer enquiry"})
    }
})

// PATCH METHOD 
router.patch('/:id' , async(req, res) => {

    const UpdateDutyId = req.params.id
    
    try{
        const UpdatedUpdateDuty = await newUpdateDutySchema.findByIdAndUpdate(UpdateDutyId , req.body ,{
            new : true
        })
        res.status(201).json({message : "Customer Enquiry Successfully updated "})

    }catch(e){
        res.status(404).json({message : "Can not patch Customer enquiry"})
    }
})

// DELETE METHOD
router.delete('/:id' , async(req, res) => {

    const UpdateDutyId = req.params.id 

    try{
        const deletedCustomeEnquiry = await newUpdateDutySchema.findByIdAndRemove(UpdateDutyId)
        res.status(201).json({message : " Customer Enquiry Successfully Deleted "})
    }catch(e){
        res.status(404).json({message : "Can not found" , e})
    }
})

module.exports = router;