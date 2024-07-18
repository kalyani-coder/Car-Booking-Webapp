const express = require("express");

const NewAddCustomer = require("../models/AddCustomerModel");
const router = express.Router();

// GET METHOD
router.get("/", async (req, res) => {
  try {
    const AddVenders = await NewAddCustomer.find();
    res.status(201).json(AddVenders);
  } catch (e) {
    res.status(404).json({ message: "Can not get venders" });
  }
});

// get by customer type 
router.get("/customer/:customerType", async (req, res) => {
  try {
    const customerType = req.params.customerType;
    const data = await NewAddCustomer.find({ Cus_Type: customerType });

    if (data.length === 0) {
      return res.status(404).json({ message: "Data Not Found" });
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// GET BY ID
router.get("/:id", async (req, res) => {
  const AddVendersId = req.params.id;
  try {
    const AddVenders = await NewAddCustomer.findById(AddVendersId);
    if (!AddVenders) {
      return res.status(404).json({ message: "venders Not found" });
    }
    res.json(AddVenders);
  } catch (e) {
    res.status(404).json({ message: "venders Not Found" });
  }
});

// POST METHOD 
router.post("/", async (req, res) => {
  const { cus_name, gst_no, cus_mobile, cus_email, address, Cus_Type } = req.body;

  // Check for missing fields
  if (!cus_name || !gst_no || !cus_mobile || !cus_email || !address || !Cus_Type) {
    return res.status(400).json({ message: "All Fields Are Required" });
  }

  try {
    // Check the email alredy exist 
    const existingCustomer = await NewAddCustomer.findOne({cus_email})
    if(existingCustomer){
      return res.status(404).json({message : "Email Alredy Exists"})
    }
    const addCustomer = new NewAddCustomer(req.body);
    await addCustomer.save();

    let successMessage;

    if (Cus_Type === "Corporate") {
      successMessage = "Corporate customer added successfully";
    } else if (Cus_Type === "Individual") {
      successMessage = "Individual customer added successfully";
    } else {
      successMessage = "Customer added successfully";
    }

    res.status(201).json({ message: successMessage });

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

// PATCH METHOD 
router.patch("/:id", async (req, res) => {
  const AddVendersId = req.params.id;
  const {Cus_Type} = req.body
  let successMessage ;

  try {
    const UpdatedAddVenders = await NewAddCustomer.findByIdAndUpdate(
      AddVendersId,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!UpdatedAddVenders) {
      return res.status(404).json({ message: "Customer not found" });
    }
    if(Cus_Type === "Individual"){
      successMessage = "Individual Customer Updated Successfully"
    }
    else if(Cus_Type === "Corporate"){
      successMessage = "Corporate Customer Updated Successfully"
    }
    else{
      successMessage = "Customer Updated Successsfully"
    }

    res.status(200).json({ message: successMessage});
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
  const {Cus_Type} = req.body
  let successMessage;
  try {
    const deletedcustomer = await NewAddCustomer.findByIdAndDelete(AddVendersId);
    if(Cus_Type === "Corporate"){
      successMessage = "Corporate Customer Deleted Successfully"
    }else if(Cus_Type === "Individual"){
      successMessage = "Individual Customer Deleted Successfully"
    }else{
      successMessage = "customer deleted successfully"
    }
   
    res.status(200).json({ message: successMessage });
  } catch (error) {
    console.error("Error deleting customer:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});




module.exports = router;
