
const express = require('express')
const newRateSchema = require('../models/RateModel')
const router = express.Router()

// GET METHOD 
router.get('/', async (req, res) => {
    try {
        const rateSchema = await newRateSchema.find()
        res.status(201).json(rateSchema)

    } catch (e) {
        res.status(404).json({ message: "Can not get Rate" })
    }
})

// GET BY ID 
router.get('/:id', async (req, res) => {
    const rateSchemaId = req.params.id
    try {
        const rateSchema = await newRateSchema.findById(rateSchemaId)
        if (!rateSchema) {
            return res.status(404).json({ message: "Rate Not found" })
        }
        res.json(rateSchema)

    } catch (e) {
        res.status(404).json({ message: "Rate Not Found" })
    }
})

// POST METHOD 
router.patch('/:id', async (req, res) => {
    const rateSchemaId = req.params.id;
  
    try {
      const updatedRateSchema = await newRateSchema.findByIdAndUpdate(rateSchemaId, req.body, {
        new: true,
        runValidators: true // Ensures that validation rules are applied
      });
  
      if (!updatedRateSchema) {
        return res.status(404).json({ message: "Rate not found" });
      }
  
      res.status(201).json({ message: "Rate Successfully updated"});
  
    } catch (e) {
      if (e.name === 'ValidationError') {
        const errorMessages = Object.values(e.errors).map(err => err.message);
        res.status(400).json({ message: errorMessages.join(', ') });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });
// PATCH METHOD 
router.patch('/:id', async (req, res) => {

    const rateSchemaId = req.params.id

    try {
        const UpdatedrateSchema = await newRateSchema.findByIdAndUpdate(rateSchemaId, req.body, {
            new: true
        })
        res.status(201).json({ message: "Rate Successfully updated " })

    } catch (e) {
        res.status(404).json({ message: "Can not patch venders" })
    }
})

// DELETE METHOD
router.delete('/:id', async (req, res) => {

    const rateSchemaId = req.params.id

    try {
        const deletedCustomeEnquiry = await newRateSchema.findByIdAndDelete(rateSchemaId)
        res.status(201).json({ message: "Rate Successfully Deleted " })
    } catch (e) {
        res.status(404).json({ message: "Can not found Rate" })
    }
})

module.exports = router;