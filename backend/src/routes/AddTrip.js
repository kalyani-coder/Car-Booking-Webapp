const express = require('express');
const bodyParser = require('body-parser');
const AddTrip = require('../models/AddTrip');
const router = express.Router();
router.use(bodyParser.json());
const nodemailer = require("nodemailer")

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
        // console.log(req.body);

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


router.patch("/:id", async (req, res) => {
    const AddTripId = req.params.id;

    try {
        const UpdatedTrip = await AddTrip.findByIdAndUpdate(
            AddTripId,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!UpdatedTrip) {
            return res.status(404).json({ message: "Trip not found" });
        }

        res.status(200).json({ message: "Trip successfully updated", data: UpdatedAddVenders });
    } catch (e) {
        if (e.name === 'ValidationError') {
            const errorMessages = Object.values(e.errors).map(err => err.message);
            res.status(400).json({ message: errorMessages.join(', ') });
        } else {
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedTrip = await AddTrip.findByIdAndDelete(req.params.id);
        if (!deletedTrip) {
            return res.status(404).json({ message: 'Document not found' });
        }
        res.status(200).json({ message: 'Trip deleted successfully' });
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

// Send email on the SMTP server 

router.post("/sendemail", async (req, res) => {
    const { emailData } = req.body;
    // console.log("emailData" , emailData)

    if (!emailData || !emailData.email) {
        return res.status(400).json({ message: "Email data or email is missing" });
    }
    if (!emailData) {
        return res.status(404).json({ message: "Email Data not available" })
    }
    try {
        const transporter = nodemailer.createTransport({
            host: "bulk.smtp.mailtrap.io",
            port: 587,
            auth: {
                user: "api",
                pass: "3f4ebe0e1af80798535216a662822105"
            }
        });

        const {
            customerId,
            customername,
            mobileno,
            email,
            address,
            triptype,
            vehicle,
            pickup,
            dropoff,
            date,
            time,
            totaldays,
            hours,
        } = emailData;

        const mailOptions = {
            from: '<mailtrap@ssdpune.org>',
            to: email,
            subject: 'New Trip Information',
            text: `Hello,
  
        Welcome to our service! Here is some information about your new trip.
  
        BookingId  : ${customerId},
        CustomerName : ${customername},
        MobileNo : ${mobileno},
        Email : ${email},
        Address : ${address},
        TripType : ${triptype},
        VehicleType : ${vehicle},
        PickUp : ${pickup},
        DropUp : ${dropoff},
        Date : ${date},
        Time : ${time},
        TotalDays : ${totaldays},
        TotalHours : ${hours},
  
        Best Regards,
        Shivpushpa Travels`,
        };

        await transporter.sendMail(mailOptions);
        console.log('Email sent to', email);

        res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: "Something went wrong" });
    }
});


module.exports = router;