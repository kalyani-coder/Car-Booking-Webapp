const express = require('express');
const bodyParser = require('body-parser');
const AddTrip = require('../models/AddTrip');
const router = express.Router();
router.use(bodyParser.json());

router.get('/', async (req, res) => {
    try {
        const addtrip = await AddTrip.find();
        res.status(200).json(addtrip)
        
    } catch (error) {
        res.status(500).json(error)   
    }
})



// router.post('/', async (req, res) => {
//     try {
//        console.log(req.body)
//         // Create a new instance of AddTrip
//         const addTripData = new AddTrip(req.body);
//         // Save the data to the database
//         await addTripData.save();

//         // Return the created data in the response
//         res.status(201).json(addTripData);
//     } catch (error) {
//         // Check if the error is a Mongoose validation error
//         if (error.name === 'ValidationError') {
//             const validationErrors = {};
//             for (const key in error.errors) {
//                 validationErrors[key] = error.errors[key].message;
//             }
//             res.status(400).json({ validationErrors });
//         } else {
//             // Handle other types of errors
//             console.error(error);
//             res.status(500).json({ error: 'Internal server error' });
//         }
//     }
// });


router.post('/', async (req, res) => {
    try {
        console.log(req.body);

        // Find the highest trip_duty_number in the database
        const latestTrip = await AddTrip.findOne().sort({ trip_duty_number: -1 }).exec();
        let newTripDutyNumber = 1; // Default value if no trips exist yet

        if (latestTrip && latestTrip.trip_duty_number) {
            newTripDutyNumber = latestTrip.trip_duty_number + 1;
        }

        // Create a new instance of AddTrip with the incremented trip_duty_number
        const addTripData = new AddTrip({
            ...req.body,
            trip_duty_number: newTripDutyNumber
        });

        // Save the data to the database
        await addTripData.save();

        // Return the created data in the response
        res.status(201).json(addTripData);
    } catch (error) {
        // Check if the error is a Mongoose validation error
        if (error.name === 'ValidationError') {
            const validationErrors = {};
            for (const key in error.errors) {
                validationErrors[key] = error.errors[key].message;
            }
            res.status(400).json({ validationErrors });
        } else {
            // Handle other types of errors
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
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

router.get('/:id', async (req, res) => {
    try {
        const trip = await AddTrip.findById(req.params.id);

        if (!trip) {
            return res.status(404).json({ message: 'Trip not found' });
        }

        res.status(200).json(trip);
    } catch (error) {
        res.status(500).json(error);
    }
});
router.get('/customer/:customerId', async (req, res) => {
    try {
        const trips = await AddTrip.find({ customerId: req.params.customerId });

        if (trips.length === 0) {
            return res.status(404).json({ message: 'Trips not found for the given customer ID' });
        }

        res.status(200).json(trips);
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;