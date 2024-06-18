
const express = require('express')
const CorporateCustomer = require('../models/IndivisualCustomerModel')
const router = express.Router()

// GET METHOD 
router.get('/' , async(req , res) => {
    try{
       const AddVenders = await CorporateCustomer.find()
        res.status(201).json(AddVenders)

    }catch(e){
        res.status(404).json({message : "Can not get venders"})
    }
})

// GET BY ID 
router.get('/:id' , async(req, res) => {

        const AddVendersId = req.params.id 

        try{

            const AddVenders = await CorporateCustomer.findById(AddVendersId)
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
        const AddVenders = new CorporateCustomer(req.body)
        await AddVenders.save()
        res.status(201).json({message : "Data post Successfully"})

    }catch(e){
        res.status(404).json({message : "Can not post venders"})
    }
})

// PATCH METHOD 
router.patch('/:id' , async(req, res) => {

    const AddVendersId = req.params.id
    
    try{
        const UpdatedAddVenders = await CorporateCustomer.findByIdAndUpdate(AddVendersId , req.body ,{
            new : true
        })
        res.status(201).json({message : "venders Successfully updated "})

    }catch(e){
        res.status(404).json({message : "Can not patch venders"})
    }
})

// DELETE METHOD
router.delete('/:id' , async(req, res) => {

    const AddVendersId = req.params.id 

    try{
        const deletedCustomeEnquiry = await CorporateCustomer.findByIdAndDelete(AddVendersId)
        res.status(201).json({message : "venders Successfully Deleted "})
    }catch(e){
        res.status(404).json({message : "Can not found" , e})
    }
})

module.exports = router;