const express = require("express");
const newMasterRateSchema = require("../models/MasterforCorporate");
const router = express.Router();

// GET METHOD

router.get("/", async (req, res) => {
  try {
    const tripDetails = await newMasterRateSchema.find();
    res.status(201).json(tripDetails);
  } catch (e) {
    res.status(404).json({ message: "Can not get master details" });
  }
});

router.post("/", async (req, res) => {
  const { add_vehicle, add_duty_type, add_rate } = req.body;

  // Check for missing fields
  if (!add_vehicle || !add_duty_type || add_rate === undefined) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingVehicle = await newMasterRateSchema.findOne({add_vehicle})
    if(existingVehicle){
      return res.status(404).json({message : "Vehicle Alredy Exists"})
    }
    const newRate = new newMasterRateSchema(req.body);
    await newRate.save();

    res.status(201).json({ message: "Master Rate Added successfully" });

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
  const tripDetailsId = req.params.id;

  try {
    const UpdatedtripDetails = await newMasterRateSchema.findByIdAndUpdate(
      tripDetailsId,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(201).json({ message: "Master Rate Updated successfully " });
  } catch (e) {
    res.status(404).json({ message: "Can not patch Master Rate" });
  }
});

// DELETE METHOD
router.delete("/:id", async (req, res) => {
  const tripDetailsId = req.params.id;

  try {
    const deletedCustomeEnquiry = await newMasterRateSchema.findByIdAndDelete(
      tripDetailsId
    );
    res
      .status(201)
      .json({ message: "master Rate Successfully Deleted " });
  } catch (e) {
    res.status(404).json({ message: "Can not found", e });
  }
});

module.exports = router;
