
const express = require('express')
const CorporateCustomer = require('../models/CorporateCustomerModel')
const router = express.Router()


// Define the route to get all customers by customerId
router.get('/customer/:customerId', async (req, res) => {
    const { customerId } = req.params;
    try {
        // Fetch all customers by customerId
        const customers = await CorporateCustomer.find({ customerId: customerId });
        const count = customers.length;

        if (count === 0) {
            return res.status(404).send({ message: 'No customers found with this customerId' });
        }

        // Include the count in the response
        res.json(customers);
    } catch (error) {
        console.error('Error fetching customers:', error);
        res.status(500).send({ message: 'Server error' });
    }
});

// Route to get customer data by customerId and date
router.get('/customer/:customerId/getByDate/:date', async (req, res) => {
    const { customerId, date } = req.params;
    try {
        const [day, month, year] = date.split('-');
        const startDate = new Date(`${year}-${month}-01`);
        const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);

        const customers = await CorporateCustomer.find({
            customerId: customerId,
            date: {
                $gte: `${day}-${month}-${year}`,
                $lte: `${endDate.getDate()}-${month}-${year}`
            }
        });

        const count = customers.length;

        if (count === 0) {
            return res.status(404).send({ message: 'No entries found for this customer in the specified month' });
        }

        res.json(customers);
    } catch (error) {
        console.error('Error fetching customer data by date:', error);
        res.status(500).send({ message: 'Server error' });
    }
});


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
        const deletedCustomeEnquiry = await CorporateCustomer.findByIdAndRemove(AddVendersId)
        res.status(201).json({message : "venders Successfully Deleted "})
    }catch(e){
        res.status(404).json({message : "Can not found" , e})
    }
})

module.exports = router;