

const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()
const cors =require('cors')
const port = process.env.PORT || 7000

// middleware 
app.use(bodyParser.json({limit : "10mb"}))
app.use(cors())

// database connectivity on mongoDB Atlas

mongoose.connect('mongodb+srv://vedantassignment05:0Q1CWhizw7a5VNG0@car-booking.tioi0b9.mongodb.net/?retryWrites=true&w=majority' , {
    useNewUrlParser : true,
    useUnifiedTopology : true
}, console.log("Connected to Database"))

// apiRouter handle all api's in one route 
apiRouter = express.Router()


// handle routes here 
const CustomerEnquiry = require('./src/routes/CustomerEnquiry')
const user = require('./src/routes/User')
const ShareDetails = require('./src/routes/ShareDetails')
const TripDetails = require('./src/routes/TripDetails')
const UpdateDuty = require('./src/routes/UpdateDuty')
const NewGetDetailsFromDriver = require('./src/routes/GetDetailsfromDriver')
const NewAddPaymentSchema = require('./src/routes/AddPayment')
const AddVenders = require('./src/routes/AddVenders')
const AddCustomers = require('./src/routes/AddCustomer')
const addTrip = require('./src/routes/AddTrip')
const VenderPayment = require('./src/routes/VenderPayment')



// define here api path 
apiRouter.use('/customer-enquiry' , CustomerEnquiry)
apiRouter.use('/users' , user)
apiRouter.use('/share-details' , ShareDetails)
apiRouter.use('/trip-details' , TripDetails)
apiRouter.use('/update-duty' , UpdateDuty)
apiRouter.use('/getDetails-fromDriver' , NewGetDetailsFromDriver)
apiRouter.use('/payment-details' , NewAddPaymentSchema)
apiRouter.use('/add-venders' , AddVenders)
apiRouter.use('/add-customers' , AddCustomers)
apiRouter.use('/add-trip' , addTrip)
apiRouter.use('/vender-payment' , VenderPayment)


// handle here all api routes 
app.use('/api', apiRouter)

// our server is runnign on 7000 port 
app.listen(port , (req, res) =>{
    console.log(`server is running on port ${port}`)
})
