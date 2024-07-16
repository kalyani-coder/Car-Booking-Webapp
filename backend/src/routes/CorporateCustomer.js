const express = require("express");
const CorporateCustomer = require("../models/CorporateCustomerModel");
const router = express.Router();

// Define the route to get all customers by customerId
router.get("/customer/:customerId", async (req, res) => {
  const { customerId } = req.params;
  try {
    // Fetch all customers by customerId
    const customers = await CorporateCustomer.find({ customerId: customerId });
    const count = customers.length;

    if (count === 0) {
      return res
        .status(404)
        .send({ message: "No customers found with this customerId" });
    }

    // Include the count in the response
    res.json(customers);
  } catch (error) {
    console.error("Error fetching customers:", error);
    res.status(500).send({ message: "Server error" });
  }
});

// Route to get customer data by customerId and date
router.get("/customer/:customerId/getByDate/:date", async (req, res) => {
  const { customerId, date } = req.params;
  try {
    const [day, month, year] = date.split("-");
    const startDate = new Date(`${year}-${month}-01`);
    const endDate = new Date(
      startDate.getFullYear(),
      startDate.getMonth() + 1,
      0
    );

    const customers = await CorporateCustomer.find({
      customerId: customerId,
      date: {
        $gte: `${day}-${month}-${year}`,
        $lte: `${endDate.getDate()}-${month}-${year}`,
      },
    });

    const count = customers.length;

    if (count === 0) {
      return res.status(404).send({
        message: "No entries found for this customer in the specified month",
      });
    }

    res.json(customers);
  } catch (error) {
    console.error("Error fetching customer data by date:", error);
    res.status(500).send({ message: "Server error" });
  }
});

// GET METHOD
router.get("/", async (req, res) => {
  try {
    const AddVenders = await CorporateCustomer.find();
    res.status(201).json(AddVenders);
  } catch (e) {
    res.status(404).json({ message: "Can not get Corporate Customer" });
  }
});

// GET BY ID
router.get("/:id", async (req, res) => {
  const AddVendersId = req.params.id;

  try {
    const AddVenders = await CorporateCustomer.findById(AddVendersId);
    if (!AddVenders) {
      return res.status(404).json({ message: "Corporate Customer Not found" });
    }
    res.json(AddVenders);
  } catch (e) {
    res.status(404).json({ message: "Corporate Customer Not Found" });
  }
});

// POST METHOD
router.post("/", async (req, res) => {
  try {
    const AddVenders = new CorporateCustomer(req.body);
    await AddVenders.save();
    res.status(201).json({ message: "Corporate Customer Added Successfully" });
  } catch (e) {
    res.status(404).json({ message: "Can not post venders" });
  }
});

// PATCH METHOD


const allowedFields = [
  "customerId",
  "Cus_Type",
  "Cus_name",
  "company_name",
  "gst_no",
  "Cus_Mobile",
  "Cus_Email",
  "address",
  "type_of_vehicle",
  "rate_per_km",
  "duty_type",
  "rate",
  "km",
  "extra_km",
  "hours",
  "extra_hours",
  "date",
  "from",
  "to"
];

// Function to filter request body
function filterFields(data, allowedFields) {
  return Object.keys(data).reduce((filtered, key) => {
    if (allowedFields.includes(key)) {
      filtered[key] = data[key];
    }
    return filtered;
  }, {});
}

router.patch("/:id", async (req, res) => {
  const AddVendersId = req.params.id;
  const filteredBody = filterFields(req.body, allowedFields);

  try {
    const UpdatedAddVenders = await CorporateCustomer.findByIdAndUpdate(
      AddVendersId,
      filteredBody,
      {
        new: true,
        runValidators: true  // Ensure validators are run on update
      }
    );
    res.status(201).json({ message: "Corporate Customer Successfully updated " });
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
    const deletedCustomeEnquiry = await CorporateCustomer.findByIdAndDelete(
      AddVendersId
    );
    res.status(201).json({ message: "Corporate Customer Successfully Deleted " });
  } catch (e) {
    res.status(404).json({ message: "Can not found", e });
  }
});

module.exports = router;
