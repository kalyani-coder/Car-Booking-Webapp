

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

const CustomerEnquiry = require('./src/routes/CustomerEnquiry')


// define here api path 

apiRouter.use('/customer-enquiry' , CustomerEnquiry)



// handle here all api routes 
app.use('/api', apiRouter)

// our server is runnign on 7000 port 
app.listen(port , (req, res) =>{
    console.log(`server is running on port ${port}`)
})
