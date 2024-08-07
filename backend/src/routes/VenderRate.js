const express = require("express");
const newRateSchemaVender = require("../models/VenderRateModel");
const router = express.Router();

// GET METHOD
router.get("/", async (req, res) => {
  try {
    const AddVenders = await newRateSchemaVender.find();
    res.status(201).json(AddVenders);
  } catch (e) {
    res.status(404).json({ message: "Can not get venders" });
  }
});

// GET BY ID
router.get("/:id", async (req, res) => {
  const AddVendersId = req.params.id;

  try {
    const AddVenders = await newRateSchemaVender.findById(AddVendersId);
    if (!AddVenders) {
      return res.status(404).json({ message: "venders Rate Not found" });
    }
    res.json(AddVenders);
  } catch (e) {
    res.status(404).json({ message: "venders Not Found" });
  }
});

// POST METHOD
router.post("/", async (req, res) => {
  try {
    const AddVenders = new newRateSchemaVender(req.body);
    await AddVenders.save();
    res.status(201).json({ message: "Data post Successfully" });
  } catch (e) {
    res.status(404).json({ message: "Can not post venders" });
  }
});

// PATCH METHOD
router.patch("/:id", async (req, res) => {
  const AddVendersId = req.params.id;

  try {
    const UpdatedAddVenders = await newRateSchemaVender.findByIdAndUpdate(
      AddVendersId,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!UpdatedAddVenders) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    res.status(200).json({ message: "Vendor rate successfully updated" });
  } catch (e) {
    if (e.name === 'ValidationError') {
      const errorMessages = Object.values(e.errors).map(err => err.message);
      res.status(400).json({ message: errorMessages.join(', ') });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
});


// DELETE METHOD
router.delete("/:id", async (req, res) => {
  const AddVendersId = req.params.id;

  try {
    const deletedCustomeEnquiry = await newRateSchemaVender.findByIdAndDelete(
      AddVendersId
    );
    res.status(201).json({ message: "venders Rate Successfully Deleted " });
  } catch (e) {
    res.status(404).json({ message: "Can not found", e });
  }
});

router.get("/venderid/:vendorId", async (req, res) => {
  try {
    const data = await newRateSchemaVender.find({
      vender_id: req.params.vendorId,
    });
    if (data === 0) {
      return res.status(404).json({ message: "Data not found for this Id" });
    }
    res.status(201).json(data);
  } catch (e) {
    res.status(500).json({ message: "Internla server error " });
  }
});

module.exports = router;
