const express = require("express");
const NewVenderpayment = require("../models/VenderPaymentModel");
const router = express.Router();

// GET METHOD
router.get("/", async (req, res) => {
  try {
    const Venderpayment = await NewVenderpayment.find();
    res.status(201).json(Venderpayment);
  } catch (e) {
    res.status(404).json({ message: "Can not get customer" });
  }
});

// GET BY ID
router.get("/:id", async (req, res) => {
  const VenderpaymentId = req.params.id;

  try {
    const Venderpayment = await NewVenderpayment.findById(VenderpaymentId);
    if (!Venderpayment) {
      return res.status(404).json({ message: "Customer Not found" });
    }
    res.json(Venderpayment);
  } catch (e) {
    res.status(404).json({ message: "Customer Enquiry Not Found" });
  }
});

// GET BY VENDOR ID

router.get("/:id", async (req, res) => {
  const vendorName = req.params.vendorName;

  try {
    const venderDetails = await NewVenderpayment.find({
      vender_Name: vendorName,
    });

    res.status(200).json(venderDetails);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
});

// POST METHOD
router.post("/", async (req, res) => {
  try {
    const Venderpayment = new NewVenderpayment(req.body);
    const newVenderpayment = await Venderpayment.save();
    res.status(201).json({ message: "Data post Successfully" });
  } catch (e) {
    res.status(404).json({ message: "Can not post customer enquiry" });
  }
});

// PATCH METHOD
router.patch("/:id", async (req, res) => {
  const VenderpaymentId = req.params.id;

  try {
    const currentDate = new Date();
    req.body.current_Date = currentDate;

    const UpdatedVenderpayment = await NewVenderpayment.findByIdAndUpdate(
      VenderpaymentId,
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
  const VenderpaymentId = req.params.id;

  try {
    const deletedCustomeEnquiry = await NewVenderpayment.findByIdAndRemove(
      VenderpaymentId
    );
    res
      .status(201)
      .json({ message: " Customer Enquiry Successfully Deleted " });
  } catch (e) {
    res.status(404).json({ message: "Can not found", e });
  }
});

// GET BY VENDOR ID

router.get("/:id", async (req, res) => {
  const vendorName = req.params.vendorName;

  try {
    const venderDetails = await NewVenderpayment.find({
      vender_Name: vendorName,
    });

    res.status(200).json(venderDetails);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
});

router.get("/vender/:vender_id", async (req, res) => {
  try {
    const venderpayment = await NewVenderpayment.find({
      vender_id: req.params.vender_id,
    });

    if (venderpayment.length === 0) {
      return res
        .status(404)
        .json({ message: "Trips not found for the given customer ID" });
    }

    res.status(200).json(venderpayment);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
