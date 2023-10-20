const express = require('express')
const AddTrip = require('../models/AddTrip')
const router = express.Router()



router.get('/', async (req, res) => {
    try {
        const addtrip = await AddTrip.find();
        res.status(200).json(addtrip)
        
    } catch (error) {
        res.status(500).json(error)
    
        
    }




})
router.post('/', async (req, res) => {
    try {
        const newTrip = new AddTrip(req.body);
        await newTrip.save();
        res.status(201).json(newTrip);
    } catch (error) {
        res.status(500).json(error);
    }
});
router.delete('/:id', async (req, res) => {
    try {
        const deletedTrip = await AddTrip.findByIdAndDelete(req.params.id);
        if (!deletedTrip) {
            return res.status(404).json({ message: 'Document not found' });
        }
        res.status(200).json({ message: 'Document deleted successfully' });
    } catch (error) {
        res.status(500).json(error);
    }
});







module.exports = router;