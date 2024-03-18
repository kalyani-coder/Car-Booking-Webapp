const express = require("express");
const NewAddPaymentSchema = require("../models/AddCusPaymentModel");
const router = express.Router();

// GET METHOD
router.get("/", async (req, res) => {
  try {
    const NewAddPayment = await NewAddPaymentSchema.find();
    res.status(201).json(NewAddPayment);
  } catch (e) {
    res.status(404).json({ message: "Can not get customer" });
  }
});

// GET BY ID
router.get("/:id", async (req, res) => {
  const NewAddPaymentId = req.params.id;

  try {
    const NewAddPayment = await NewAddPaymentSchema.findById(NewAddPaymentId);
    if (!NewAddPayment) {
      return res.status(404).json({ message: "Customer Not found" });
    }
    res.json(NewAddPayment);
  } catch (e) {
    res.status(404).json({ message: "Customer Enquiry Not Found" });
  }
});

// GET route to retrieve payments by month
router.get("/by-date/:date", async (req, res) => {
  try {
    const requestedDate = req.params.date;

    // Check if the requestedDate is a valid date (you may want to add more validation here)
    if (!isValidDate(requestedDate)) {
      return res.status(400).json({ message: "Invalid date parameter" });
    }

    // Query the database for payments on the requested date
    const payments = await NewAddPaymentSchema.find({ Date: requestedDate });

    res.json(payments);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Utility function to check if a string is a valid date
function isValidDate(dateString) {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  return dateString.match(regex) !== null;
}

//GET METHOD to retrive trips between two seleted dates
router.get("/by-date/:date/:date1", async (req, res) => {
  try {
    const startDate = req.params.date;
    const endDate = req.params.date1;

    if (!isValidDate(startDate) || !isValidDate(endDate)) {
      return res.status(400).json({ message: "Invalid date parameters" });
    }
    const dataInRange = await NewAddPaymentSchema.find({
      // const dataInRange = await newTripDetailsSchema.find({

      Date: { $gte: startDate, $lte: endDate },
    });

    const totalTrips = dataInRange.length;

    res.json({ totalTrips, dataInRange });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
});

// PATCH METHOD
router.patch("/:id", async (req, res) => {
  const NewAddPaymentId = req.params.id;

  try {
    const UpdatedNewAddPayment = await NewAddPaymentSchema.findByIdAndUpdate(
      NewAddPaymentId,
      req.body,
      {
        new: true,
      }
    );
    res.status(201).json({ message: "Customer Enquiry Successfully updated " });
  } catch (e) {
    res.status(404).json({ message: "Can not patch Customer enquiry" });
  }
});

// DELETE METHOD
router.delete("/:id", async (req, res) => {
  const NewAddPaymentId = req.params.id;

  try {
    const deletedCustomeEnquiry = await NewAddPaymentSchema.findByIdAndRemove(
      NewAddPaymentId
    );
    res
      .status(201)
      .json({ message: " Customer Enquiry Successfully Deleted " });
  } catch (e) {
    res.status(404).json({ message: "Can not found", e });
  }
});
router.get("/customer/:customerId", async (req, res) => {
  try {
    const custPayment = await NewAddPaymentSchema.find({
      customerId: req.params.customerId,
    });

    if (custPayment.length === 0) {
      return res
        .status(404)
        .json({ message: "Trips not found for the given customer ID" });
    }

    res.status(200).json(custPayment);
  } catch (error) {
    res.status(500).json(error);
  }
});
// API endpoint to fetch advance amount and remaining amount by ID
router.get("/amounts/:id", async (req, res) => {
  try {
    const paymentDetails = await NewAddPaymentSchema.findById(req.params.id);
    if (!paymentDetails) {
      return res.status(404).json({ message: "Payment details not found" });
    }
    const { advance_Amount, remaining_Amount } = paymentDetails;
    res.json({ advance_Amount, remaining_Amount });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST route to handle filtering data based on date range
router.post("/monthly-data", async (req, res) => {
  try {
    const { startDate, endDate } = req.body;

    // Convert start and end dates to Date objects
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Fetch data from MongoDB based on date range
    const filteredData = await NewAddPaymentSchema.find({
      Date: {
        $gte: start,
        $lte: end,
      },
    });

    res.json(filteredData);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// POST route to add new data
router.post("/", async (req, res) => {
  try {
    // Extract data from request body
    const newData = new NewAddPaymentSchema(req.body);
    await newData.save();
    res.status(201).json({ message: "Data post Successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(404).json({ message: "Can not post Data" });
  }
});

module.exports = router;
