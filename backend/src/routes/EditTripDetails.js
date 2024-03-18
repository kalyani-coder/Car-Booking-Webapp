const express = require("express");
const getTripdetailSchema = require("../models/getTripModel");
const router = express.Router();

// GET METHOD
router.get("/", async (req, res) => {
  try {
    const tripDetails = await getTripdetailSchema.find();
    res.status(201).json(tripDetails);
  } catch (e) {
    res.status(404).json({ message: "Can not get customer" });
  }
});

// GET BY ID
router.get("/:id", async (req, res) => {
  const tripDetailsId = req.params.id;

  try {
    const tripDetails = await getTripdetailSchema.findById(tripDetailsId);
    if (!tripDetails) {
      return res.status(404).json({ message: "Customer Not found" });
    }
    res.json(tripDetails);
  } catch (e) {
    res.status(404).json({ message: "Customer Enquiry Not Found" });
  }
});

// POST METHOD

router.post("/", async (req, res) => {
  try {
    const tripDetails = new getTripdetailSchema(req.body); // Use 'new' to create a new instance
    await tripDetails.save(); // Save the instance
    res.status(201).json({ message: "Data posted successfully" });
  } catch (e) {
    res
      .status(404)
      .json({ message: "Cannot post trip details", error: e.message });
  }
});

// PATCH METHOD
router.patch("/:id", async (req, res) => {
  const tripDetailsId = req.params.id;

  try {
    const UpdatedtripDetails = await getTripdetailSchema.findByIdAndUpdate(
      tripDetailsId,
      req.body,
      {
        new: true,
      }
    );
    res.status(201).json({ message: "post trip details successfully " });
  } catch (e) {
    res.status(404).json({ message: "Can not patch trip details" });
  }
});

// DELETE METHOD
router.delete("/:id", async (req, res) => {
  const tripDetailsId = req.params.id;

  try {
    const deletedCustomeEnquiry = await getTripdetailSchema.findByIdAndRemove(
      tripDetailsId
    );
    res
      .status(201)
      .json({ message: " Customer Enquiry Successfully Deleted " });
  } catch (e) {
    res.status(404).json({ message: "Can not found", e });
  }
});

// GET METHOD to retrieve trips between two selected dates
router.get("/date/:startDate/:endDate", async (req, res) => {
  try {
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;

    const dataInRange = await getTripdetailSchema.find({
      $and: [{ date: { $gte: startDate } }, { date1: { $lte: endDate } }],
    });

    const totalTrips = dataInRange.length;

    res.json({ totalTrips, dataInRange });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
});

// GET METHOD to retrieve trips for the entire year dynamically
router.get("/annual/report", async (req, res) => {
  try {
    const currentYear = new Date().getFullYear();

    const startDate = `${currentYear}-01-01`;
    const endDate = `${currentYear}12-31`;

    const dataInRange = await getTripdetailSchema.find({
      $and: [{ date: { $gte: startDate } }, { date1: { $lte: endDate } }],
    });

    const totalTrips = dataInRange.length;

    res.json({ totalTrips, dataInRange });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
