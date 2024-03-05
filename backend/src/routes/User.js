

const express = require('express')
const router  = express.Router()
const newUserSchema = require('../models/UserModels')


// GET METHOD
router.get('/' , async(req, res) => {

    try{
        const newUser = await newUserSchema.find()
        res.status(201).json(newUser)

    }catch(e){
        res.status(404).json({message : "User not found"})
    }
}) 

// GET BY ID 
router.get('/:id' , async(req, res) => {

    const userId = req.params.id

    try{
        const getUserById = await newUserSchema.findById(userId)
        if(!getUserById){
            res.status(500).json({message : "User Id not found"})
        }
        else{
            res.status(201).json(getUserById)
        }
    }catch(e){
        res.status(404).json({message : "User id not been fetch"})
    }
})

// POST METHOD 
router.post('/' , async(req, res) => {

    try{
        const newUserAdd = new newUserSchema(req.body)
        await newUserAdd.save()
        res.status(201).json({message : 'User Add Successfull'})
    }catch(e){
        res.status(404).json({message : "User not been added"})
    }
})

// PATCH METHOD 
router.patch("/:id" , async(req, res) => {

    const userId = req.params.id

    try{
        const updatedUser = await newUserSchema.findByIdAndUpdate(userId , req.body , {
            new : true
        })
        res.status(201).json({message : "User Update Successfull"})
    }catch(e){
        res.status(404).json({message : "user not updated"})
    }
})

// DELETE MOTHOD 
router.delete('/:id' , async(req, res) => {

  const userId = req.params.id

    try{
        const deletedUser = await newUserSchema.findByIdAndDelete(userId)
        res.status(201).json({message : "User Successfull deleted"})
    }catch(e){
        res.status.json({message : "User not deleted"})
    }
})

module.exports = router