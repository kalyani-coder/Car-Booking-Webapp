const express = require("express");
const NewVenderpayment = require("../models/VenderPaymentModel");
const router = express.Router();

// GET METHOD
router.get("/", async (req, res) => {
  try {
    const Venderpayment = await NewVenderpayment.find();
    res.status(201).json(Venderpayment);
  } catch (e) {
    res.status(404).json({ message: "Can not get Vendor Payment" });
  }
});

// GET BY ID
router.get("/:id", async (req, res) => {
  const VenderpaymentId = req.params.id;

  try {
    const Venderpayment = await NewVenderpayment.findById(VenderpaymentId);
    if (!Venderpayment) {
      return res.status(404).json({ message: "Vendor Payment Not found" });
    }
    res.json(Venderpayment);
  } catch (e) {
    res.status(404).json({ message: "Vendor Payment Not Found" });
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
    res.status(201).json({ message: "Vendor Payment Successfully Added" });
  } catch (e) {
    res.status(404).json({ message: "Can not post Vendor Payment" });
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
        runValidators: true,
      }
    );
    if (!UpdatedVenderpayment) {
      return res.status(400).json({ message: "failed to update" });
    }
    res.status(201).json({ message: "Vendor Payment Successfully updated " });
  } catch (e) {
    res.status(404).json({ message: "Can not patch Vendor Payment" });
  }
});

// DELETE METHOD
router.delete("/:id", async (req, res) => {
  const VenderpaymentId = req.params.id;

  try {
    const deletedCustomeEnquiry = await NewVenderpayment.findByIdAndDelete(
      VenderpaymentId
    );
    res.status(201).json({ message: " Vendor Payment Successfully Deleted " });
  } catch (e) {
    res.status(404).json({ message: "Can not found", e });
  }
});

// Route to delete all vendor payments
// router.delete("/", async (req, res) => {
//   try {
//     await NewVenderpayment.deleteMany({});
//     res.status(201).json({ message: "All Vendor Payments Successfully Deleted" });
//   } catch (e) {
//     res.status(500).json({ message: "Failed to delete all vendor payments", e });
//   }
// });

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

router.get("/vender/:vender_id/month/:month", async (req, res) => {
  try {
    const { vender_id, month } = req.params;

    // Ensure month is a valid number between 1 and 12
    const numericMonth = parseInt(month);
    if (isNaN(numericMonth) || numericMonth < 1 || numericMonth > 12) {
      return res
        .status(400)
        .json({
          message:
            "Invalid month number. Please provide a number between 1 and 12.",
        });
    }

    // Format month as two digits
    const formattedMonth =
      numericMonth < 10 ? `0${numericMonth}` : `${numericMonth}`;

    // Construct regex to match dates in DD-MM-YYYY format
    const regexPattern = new RegExp(`^..-${formattedMonth}-`);

    // Find payments matching vendor_id and month
    const venderPayments = await NewVenderpayment.find({ vender_id })
      .where("current_Date")
      .regex(regexPattern);

    if (venderPayments.length === 0) {
      return res
        .status(404)
        .json({
          message: `Payments not found for vendor ID ${vender_id} in month ${month}`,
        });
    }

    res.status(200).json(venderPayments);
  } catch (error) {
    console.error("Error fetching payments:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
