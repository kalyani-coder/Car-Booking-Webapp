
const express = require('express')
const NewAddVenders = require('../models/AddVendersModel')
const router = express.Router()

// GET METHOD 
router.get('/' , async(req , res) => {
    try{
        const AddVenders = await NewAddVenders.find()
        res.status(201).json(AddVenders)

    }catch(e){
        res.status(404).json({message : "Can not get venders"})
    }
})

// GET BY ID 
router.get('/:id' , async(req, res) => {

        const AddVendersId = req.params.id 

        try{

            const AddVenders = await NewAddVenders.findById(AddVendersId)
            if(!AddVenders){
                return res.status(404).json({message : "venders Not found"})
            }
            res.json(AddVenders)

        }catch(e){
            res.status(404).json({message : "venders Not Found"})
        }
    
})

// POST METHOD 

router.post('/', async (req, res) => {
  try {
    const AddVenders = new NewAddVenders(req.body);
    const newAddVenders = await AddVenders.save();
    res.status(201).json({ message: "Vendors Added successfully" });
  } catch (e) {
    if (e.name === 'ValidationError') {
      // Extract error messages from Mongoose validation errors
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
    const AddVendersId = req.params.id;
  
    try {
      const UpdatedAddVenders = await NewAddVenders.findByIdAndUpdate(
        AddVendersId,
        req.body,
        {
          new: true,
          runValidators: true, // Ensures that validation is run on update
        }
      );
  
      if (!UpdatedAddVenders) {
        return res.status(404).json({ message: "Vendor Id not found" });
      }
  
      res.status(200).json({ message: "Vendor successfully updated", data: UpdatedAddVenders });
    } catch (e) {
      if (e.name === 'ValidationError') {
        // Extract error messages from Mongoose validation errors
        const errorMessages = Object.values(e.errors).map(err => err.message);
        res.status(400).json({ message: errorMessages.join(', ') });
      } else {
        console.error(e);
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  });
  

// DELETE METHOD
router.delete("/:id" , async(req, res) => {
    try{

        const id  = req.params.id

        const deletedVendor = await NewAddVenders.findByIdAndDelete(id)
        if(!id){
            return res.status(404).json({message : "Vendor Id not Found"})
        }
        res.status(201).json({message : "Vendor Deleted Successfully"})

    }catch(e){

    }
})
module.exports = router;