
const express = require('express')
const newTripDetailsSchema = require('../models/TripDetailsModel')
const router = express.Router()

// GET METHOD 
router.get('/' , async(req , res) => {
    try{
       const tripDetails = await newTripDetailsSchema.find()
        res.status(201).json(tripDetails)

    }catch(e){
        res.status(404).json({message : "Can not get customer"})
    }
})
  //GET METHOD to retrive trips between two seleted dates

  
  function isValidDate(dateString) {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return dateString.match(regex) !== null;
  }

  router.get("/:date/:date1", async (req, res) => {
    try {
      const startDate = req.params.date;
      const endDate = req.params.date1;
  
      if (!isValidDate(startDate) || !isValidDate(endDate)) {
        return res.status(400).json({ message: "Invalid date parameters" });
      }
      // const dataInRange = await NewAddPaymentSchema.find({
        const dataInRange = await newTripDetailsSchema.find({
  
        Date: { $gte: startDate, $lte: endDate },
      });
  
      const totalTrips = dataInRange.length;
  
      res.json({ totalTrips, dataInRange });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Internal server error" });
    }
  });
// GET BY ID 
router.get('/:id' , async(req, res) => {

        const tripDetailsId = req.params.id 

        try{

            const tripDetails = await newTripDetailsSchema.findById(tripDetailsId)
            if(!tripDetails){
                return res.status(404).json({message : "Trip Details Not found"})
            }
            res.json(tripDetails)

        }catch(e){
            res.status(404).json({message : "Trip Details Not Found"})
        }
    
})

// POST METHOD 

router.post("/", async (req, res) => {
    try {
        const tripDetails = new newTripDetailsSchema(req.body); // Use 'new' to create a new instance
        await tripDetails.save(); // Save the instance
        res.status(201).json({ message: "Trip details successfully Added" });
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
router.patch('/:id' , async(req, res) => {

    const tripDetailsId = req.params.id
    
    try{
        const UpdatedtripDetails = await newTripDetailsSchema.findByIdAndUpdate(tripDetailsId , req.body ,{
            new : true,
            runValidators: true,
        })
        res.status(201).json({message : " Trip details successfully Updated"})

    }catch (e) {
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

    const tripDetailsId = req.params.id 

    try{
        const deletedCustomeEnquiry = await newTripDetailsSchema.findByIdAndDelete(tripDetailsId)
        res.status(201).json({message : " Trip details Successfully Deleted "})
    }catch(e){
        res.status(404).json({message : "Can not found" , e})
    }
})

module.exports = router;