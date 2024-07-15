
const express = require('express')
const Driver = require('../models/DriverModel')
const router = express.Router()

// GET METHOD 
router.get('/' , async(req , res) => {
    try{
        const AddVenders = await Driver.find()
        res.status(201).json(AddVenders)

    }catch(e){
        res.status(404).json({message : "Can not get venders"})
    }
})

// GET BY ID 
router.get('/:id' , async(req, res) => {

        const AddVendersId = req.params.id 

        try{

            const AddVenders = await Driver.findById(AddVendersId)
            if(!AddVenders){
                return res.status(404).json({message : "venders Not found"})
            }
            res.json(AddVenders)

        }catch(e){
            res.status(404).json({message : "venders Not Found"})
        }
    
})

// POST ROUTE 

router.post('/', async (req, res) => {
    try {
      const newDriver = new Driver(req.body);
      const savedDriver = await newDriver.save();
      res.status(201).json({ message: "Driver added successfully" });
    } catch (e) {
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
router.patch('/:id', async (req, res) => {
    const driverId = req.params.id;
  
    try {
      const updatedDriver = await Driver.findByIdAndUpdate(driverId, req.body, {
        new: true,
        runValidators: true,
      });
  
      if (!updatedDriver) {
        return res.status(404).json({ message: "Driver Id not found" });
      }
  
      res.status(200).json({ message: "Driver successfully updated", data: updatedDriver });
    } catch (e) {
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
    try{
        const id = req.params.id 
        const deletedCustomeEnquiry = await Driver.findByIdAndDelete(id, {new : true})
        res.status(201).json({message : "Driver Successfully Deleted "})
    }catch(e){
        res.status(404).json({message : "Can not found" , e})
    }
})

module.exports = router;