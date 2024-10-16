const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
require("dotenv").config() 


const port = process.env.PORT || 8787;

// Middleware
app.use(express.json());
// locally api running
// app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

// on server api running 
app.use(cors());


// Define API Router
const apiRouter = express.Router();

// Handle routes here
const CustomerEnquiry = require('./src/routes/CustomerEnquiry');
const ShareDetails = require('./src/routes/ShareDetails');
const TripDetails = require('./src/routes/TripDetails');
const UpdateDuty = require('./src/routes/UpdateDuty');
const NewGetDetailsFromDriver = require('./src/routes/GetDetailsfromDriver');
const newCustomerPayment = require('./src/routes/AddCusPayment');
const AddVenders = require('./src/routes/AddVenders');
const AddCustomers = require('./src/routes/AddCustomer');
const AddDriver = require('./src/routes/AddDriver');
const addTrip = require('./src/routes/AddTrip');
const VenderPayment = require('./src/routes/VenderPayment');
const rateSchema = require('./src/routes/Rate');
const venderRate = require('./src/routes/VenderRate');
const corporateCustomer = require('./src/routes/CorporateCustomer');
const indivisualCustomer = require('./src/routes/IndivisualCustomer');
const newMasterRateSchema = require('./src/routes/MasterforCorporate');
const gettrip = require("./src/routes/EditTripDetails");
const getAdmin = require("./src/routes/AdminLoginRoute")

// Define API paths
apiRouter.use('/add-customers', AddCustomers);
apiRouter.use('/customer-enquiry', CustomerEnquiry);
apiRouter.use('/add-trip', addTrip);
apiRouter.use('/trip-details', TripDetails);
apiRouter.use('/share-details', ShareDetails);
apiRouter.use('/update-duty', UpdateDuty);
apiRouter.use('/getDetails-fromDriver', NewGetDetailsFromDriver);
apiRouter.use('/customer-payment', newCustomerPayment);
apiRouter.use('/add-venders', AddVenders);
apiRouter.use('/vender-payment', VenderPayment);
apiRouter.use('/customer-rate', rateSchema);
apiRouter.use('/vender-rate', venderRate);
apiRouter.use('/add-drivers', AddDriver);
apiRouter.use('/corporate-customer', corporateCustomer);
apiRouter.use('/indivisual-customer', indivisualCustomer);
apiRouter.use('/masterrate', newMasterRateSchema);
apiRouter.use("/get-trip",gettrip);
apiRouter.use("/", getAdmin)

mongoose.connect(process.env.LOCAL_MONGODB_URL, {
}, console.log("Connected to Database"));


app.use('/api', apiRouter);

// Server is running on port 10000
app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});
