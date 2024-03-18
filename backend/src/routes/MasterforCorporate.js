const express = require("express");
const newMasterRateSchema = require("../models/MasterforCorporate");
const router = express.Router();

// GET METHOD

router.get("/", async (req, res) => {
  try {
    const tripDetails = await newMasterRateSchema.find();
    res.status(201).json(tripDetails);
  } catch (e) {
    res.status(404).json({ message: "Can not get customer" });
  }
});

router.post("/", async (req, res) => {
  try {
    const tripDetails = new newMasterRateSchema(req.body); // Use 'new' to create a new instance
    await tripDetails.save(); // Save the instance
    res.status(201).json({ message: "Data posted successfully" });
  } catch (e) {
    res
      .status(404)
      .json({ message: "Cannot post trip details", error: e.message });
  }
});

router.patch("/:id", async (req, res) => {
  const tripDetailsId = req.params.id;

  try {
    const UpdatedtripDetails = await newMasterRateSchema.findByIdAndUpdate(
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
    const deletedCustomeEnquiry = await newMasterRateSchema.findByIdAndRemove(
      tripDetailsId
    );
    res
      .status(201)
      .json({ message: " Customer Enquiry Successfully Deleted " });
  } catch (e) {
    res.status(404).json({ message: "Can not found", e });
  }
});

module.exports = router;
