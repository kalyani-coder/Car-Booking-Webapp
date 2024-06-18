
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
router.post('/' , async(req, res) => {

    try{
        const AddVenders = new NewAddVenders(req.body)
        const newAddVenders = await AddVenders.save()
        res.status(201).json({message : "Data post Successfully"})

    }catch(e){
        res.status(404).json({message : "Can not post venders"})
    }
})

// PATCH METHOD 
router.patch('/:id' , async(req, res) => {

    const AddVendersId = req.params.id
    
    try{
        const UpdatedAddVenders = await NewAddVenders.findByIdAndUpdate(AddVendersId , req.body ,{
            new : true
        })
        if(!UpdatedAddVenders){
            return res.status(201).json({message : "Vendor Id not Found"})
        }
        res.status(201).json({message : "venders Successfully updated "})

    }catch(e){
        res.status(404).json({message : "Can not patch venders"})
    }
})

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