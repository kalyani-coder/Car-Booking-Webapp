
const express = require('express')
const newShareDetailsSchema = require('../models/ShareDetalsModel')
const router = express.Router()

// GET METHOD 
router.get('/' , async(req , res) => {
    try{
       const shareDetailsget = await newShareDetailsSchema.find()
        res.status(201).json(shareDetailsget)

    }catch(e){
        res.status(404).json({message : "Can not get Details"})
    }
})

// GET BY ID 
router.get('/:id' , async(req, res) => {

        const shareDetailsId = req.params.id 

        try{

            const shareDetails = await newShareDetailsSchema.findById(shareDetailsId)
            if(!shareDetails){
                return res.status(404).json({message : "Details Not found"})
            }
            res.json(shareDetails)

        }catch(e){
            res.status(404).json({message : "Details Not Found"})
        }
    
})

// POST METHOD 
router.post('/' , async(req, res) => {

    try{
        const shareDetailspost = new newShareDetailsSchema(req.body)
        await shareDetailspost.save()
        res.status(201).json({message : "Details Added Successfully"})

    }catch (e) {
        if (e.name === 'ValidationError') {
          const errorMessages = Object.values(e.errors).map(err => err.message);
          res.status(400).json({ message: errorMessages.join(', ') });
        } else {
          console.error(e);
          res.status(500).json({ message: "Internal Server Error" });
        }
      }
    });

// PATCH METHOD 
router.patch('/:id' , async(req, res) => {

    const shareDetailsId = req.params.id
    
    try{
        const UpdatedshareDetails = await newShareDetailsSchema.findByIdAndUpdate(shareDetailsId , req.body ,{
            new : true,
            runValidators : true
        })
        res.status(201).json({message : "Details Successfully updated "})

    }catch (e) {
        if (e.name === 'ValidationError') {
          const errorMessages = Object.values(e.errors).map(err => err.message);
          res.status(400).json({ message: errorMessages.join(', ') });
        } else {
          console.error(e);
          res.status(500).json({ message: "Internal Server Error" });
        }
      }
    });

// DELETE METHOD
router.delete('/:id' , async(req, res) => {

    const shareDetailsId = req.params.id 

    try{
        const deletedCustomeEnquiry = await newShareDetailsSchema.findByIdAndDelete(shareDetailsId)
        res.status(201).json({message : " Details Successfully Deleted "})
    }catch(e){
        res.status(404).json({message : "Can not found" , e})
    }
})

module.exports = router;