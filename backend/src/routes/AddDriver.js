
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

router.post("/", async (req, res) => {
    try {
        const { driver_Name, driver_Mo1, address } = req.body;

        if (!driver_Name) {
            return res.status(400).json({ message: Driver.schema.paths.driver_Name.options.required[1] });
        }
        if (!address) {
            return res.status(400).json({ message: Driver.schema.paths.address.options.required[1] });
        }
        if (!driver_Mo1) {
            return res.status(400).json({ message: Driver.schema.paths.driver_Mo1.options.required[1] });
        }

        const addDriver = new Driver(req.body);
        const saveDriver = await addDriver.save();
        res.status(201).json({ message: "Driver Saved Successfully" });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Internal server error" });
    }
});


// PATCH METHOD 
router.patch('/:id' , async(req, res) => {

    const AddVendersId = req.params.id
    
    try{
        const UpdatedAddVenders = await Driver.findByIdAndUpdate(AddVendersId , req.body ,{
            new : true
        })
        res.status(201).json({message : "Driver Successfully updated "})

    }catch(e){
        res.status(404).json({message : "Can not patch Driver"})
    }
})



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