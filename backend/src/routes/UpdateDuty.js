
const express = require('express')
const newUpdateDutySchema = require('../models/UpdateDutyModel')
const router = express.Router()

// GET METHOD 
router.get('/' , async(req , res) => {
    try{
        const UpdateDuty = await newUpdateDutySchema.find()
        res.status(201).json(UpdateDuty)

    }catch(e){
        res.status(404).json({message : "Can not get update duty"})
    }
})

// GET BY ID 
router.get('/:id' , async(req, res) => {

        const UpdateDutyId = req.params.id 

        try{

            const UpdateDuty = await newUpdateDutySchema.findById(UpdateDutyId)
            if(!UpdateDuty){
                return res.status(404).json({message : "Duty Not found"})
            }
            res.json(UpdateDuty)

        }catch(e){
            res.status(404).json({message : "Duty Not Found"})
        }
    
})

// POST METHOD 
router.post('/', async (req, res) => {
    try {
      const UpdateDuty = new newUpdateDutySchema(req.body);
      await UpdateDuty.save();
      res.status(201).json({ message: "Duty Slip Added Successfully" });
    } catch (e) {
      if (e.name === 'ValidationError') {
        const errorMessages = Object.values(e.errors).map(err => err.message);
        res.status(400).json({ message: errorMessages.join(', ') });
      } else {
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  });

// PATCH METHOD 
router.patch('/:id' , async(req, res) => {

    const UpdateDutyId = req.params.id
    
    try{
        const UpdatedUpdateDuty = await newUpdateDutySchema.findByIdAndUpdate(UpdateDutyId , req.body ,{
            new : true
        })
        if (!UpdatedUpdateDuty) {
            return res.status(404).json({ message: "Duty not found" });
          }
          res.status(200).json({ message: "Duty Successfully updated" });
        } catch (e) {
          if (e.name === 'ValidationError') {
            const errorMessages = Object.values(e.errors).map(err => err.message);
            res.status(400).json({ message: errorMessages.join(', ') });
          } else {
            res.status(500).json({ message: "Internal Server Error" });
          }
        }
      });
// DELETE METHOD
router.delete('/:id' , async(req, res) => {

    const UpdateDutyId = req.params.id 

    try{
        const deletedCustomeEnquiry = await newUpdateDutySchema.findByIdAndDelete(UpdateDutyId)
        res.status(201).json({message : " Duty Successfully Deleted "})
    }catch(e){
        res.status(404).json({message : "Can not found Duty" , e})
    }
})

module.exports = router;