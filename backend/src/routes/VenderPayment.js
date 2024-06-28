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
        runValidators: true,
      }
    );
    if(!UpdatedVenderpayment){
      return res.status(400).json({ message: "failed to update" });
    }
    res.status(201).json({ message: "Customer Enquiry Successfully updated " });
  } catch (e) {
    res.status(404).json({ message: "Can not patch Customer enquiry" });
  }
});

// DELETE METHOD
router.delete("/:id", async (req, res) => {
  const VenderpaymentId = req.params.id;

  try {
    const deletedCustomeEnquiry = await NewVenderpayment.findByIdAndDelete(
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

// Get By VendorId and VehicleType 
router.get('/vendor/:vendorId/vehicle/:vehicleType', async (req, res) => {
  try {
    const { vendorId, vehicleType } = req.params;

    // Normalize vehicleType to handle case sensitivity and encoded spaces
    const normalizedVehicleType = decodeURIComponent(vehicleType).toLowerCase();

    const data = await NewVenderpayment.find({
      vender_id: vendorId,
      vehicle_type: { $regex: new RegExp(normalizedVehicleType, 'i') } // Case insensitive regex match
    });

    if (data.length === 0) {
      return res.status(404).json({ message: 'No data found for the specified vendor ID and vehicle type' });
    }

    res.status(200).json(data);
  } catch (e) {
    console.error('Error:', e);
    res.status(500).json({ message: 'Internal server error', error: e.message });
  }
});


router.get("/vendor/:vendorId/date/:getByDate" , async(req, res) => {
  try{

    const {vendorId, getByDate} = req.params
    const data = await NewVenderpayment.find({vender_id : vendorId, current_Date : getByDate})

    if(data.length === 0){
      return res.status(404).json({message : "Data not fetch by vendor id and date"})
    }
    res.status(201).json(data)
  }catch(e){
    res.status(500).json({message : "Internal server error"})
  }
})


module.exports = router;
