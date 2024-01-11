

const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()
const cors =require('cors')
// const session = require('express-session')
// const MongoStore = require('connect-mongo')
const port = process.env.PORT || 7000

// middleware 
app.use(bodyParser.json({limit : "10mb"}))
app.use(cors({origin : 'http://localhost:3000' , credentials : true}))

// session tracking with login 
// app.use(session({
//     secret: 'jsdghsdf781324gubfy7bf',
//     resave: true,
//     saveUninitialized: false,
//     store: MongoStore.create({
//       mongoUrl: 'mongodb+srv://vedantassignment05:0Q1CWhizw7a5VNG0@car-booking.tioi0b9.mongodb.net/?retryWrites=true&w=majority'
//     }),
//     cookie: { maxAge: 9000000, sameSite: "lax", secure: false },
//   }))

// database connectivity on mongoDB Atlas

mongoose.connect('mongodb+srv://vedantassignment05:0Q1CWhizw7a5VNG0@car-booking.tioi0b9.mongodb.net/?retryWrites=true&w=majority' , {
  
    useUnifiedTopology : true,
    bufferCommands: false, // Disable buffering
  
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
const newCustomerPayment = require('./src/routes/AddCusPayment')
const AddVenders = require('./src/routes/AddVenders')
const AddCustomers = require('./src/routes/AddCustomer')
const AddDriver = require('./src/routes/AddDriver')
const addTrip = require('./src/routes/AddTrip')
const VenderPayment = require('./src/routes/VenderPayment')
const rateSchema = require('./src/routes/Rate')
const venderRate = require('./src/routes/VenderRate')
const corporateCustomer = require('./src/routes/CorporateCustomer')
const indivisualCustomer = require('./src/routes/IndivisualCustomer')

// const userLogin  = require('./src/routes/UserLogin')




// define here api path 
apiRouter.use('/customer-enquiry' , CustomerEnquiry)
apiRouter.use('/users' , user)
apiRouter.use('/share-details' , ShareDetails)
apiRouter.use('/trip-details' , TripDetails)
apiRouter.use('/update-duty' , UpdateDuty)
apiRouter.use('/getDetails-fromDriver' , NewGetDetailsFromDriver)
apiRouter.use('/customer-payment' , newCustomerPayment)
apiRouter.use('/add-venders' , AddVenders)
apiRouter.use('/add-customers' , AddCustomers)
apiRouter.use('/add-trip' , addTrip)
apiRouter.use('/vender-payment' , VenderPayment)
apiRouter.use('/customer-rate' , rateSchema)
apiRouter.use('/vender-rate' , venderRate)
apiRouter.use('/add-drivers' , AddDriver)
apiRouter.use('/corporate-customer' , corporateCustomer)
apiRouter.use('/indivisual-customer' , indivisualCustomer)

// apiRouter.use('/user-login' , userLogin)


// handle here all api routes 
app.use('/api', apiRouter)

// our server is runnign on 7000 port 
app.listen(port , (req, res) =>{
    console.log(`server is running on port ${port}`)
})
