
const express = require('express')
const NewGetDetailsFromDriver = require('../models/GetDetailsFromDrivermodel')
const router = express.Router()

// GET METHOD 
router.get('/' , async(req , res) => {
    try{
        GetDetailsFromDriver = await NewGetDetailsFromDriver.find()
        res.status(201).json(GetDetailsFromDriver)

    }catch(e){
        res.status(404).json({message : "Can not get Start End details"})
    }
})

// GET BY ID 
router.get('/:id' , async(req, res) => {

        const GetDetailsFromDriverId = req.params.id 

        try{

            const shareDetails = await NewGetDetailsFromDriver.findById(GetDetailsFromDriverId)
            if(!shareDetails){
                return res.status(404).json({message : "Start End details Not found"})
            }
            res.json(shareDetails)

        }catch(e){
            res.status(404).json({message : "Start End details Not Found"})
        }
    
})

// POST METHOD 
router.post('/' , async(req, res) => {

    try{
        const GetDetailsFromDriver = new NewGetDetailsFromDriver(req.body)
        await GetDetailsFromDriver.save()
        res.status(201).json({message : "Data post Successfully"})

    }catch(e){
        res.status(404).json({message : "Can not post Start End details",e})
    }
})

// PATCH METHOD 
router.patch('/:id' , async(req, res) => {

    const GetDetailsFromDriverId = req.params.id
    
    try{
        const UpdatedshareDetails = await NewGetDetailsFromDriver.findByIdAndUpdate(GetDetailsFromDriverId , req.body ,{
            new : true
        })
        res.status(201).json({message : "Start End details Successfully updated "})

    }catch(e){
        res.status(404).json({message : "Can not patch Start End details"})
    }
})

// DELETE METHOD
router.delete('/:id' , async(req, res) => {

    const GetDetailsFromDriverId = req.params.id 

    try{
        const deletedCustomeEnquiry = await NewGetDetailsFromDriver.findByIdAndRemove(GetDetailsFromDriverId)
        res.status(201).json({message : " Start End details Successfully Deleted "})
    }catch(e){
        res.status(404).json({message : "Can not found" , e})
    }
})

module.exports = router;