const mongoose = require("mongoose");

const getTripSchema = new mongoose.Schema({
  customerId: { type: String, required: [true, 'Customer ID is required'] },
  customername: { type: String, required: [true, 'Customer name is required'] },
  customermobile: { type: Number, required: [true, 'Mobile number is required'], min: 10 },
  pickuplocation: { type: String, required: [true, 'Pick up location is required'] },
  date: { type: String, required: [true, 'Pick up date is required'] },
  time: { type: String, required: [true, 'Pick up time is required'] },
  dropofflocation: { type: String, required: [true, 'Drop off location is required'] },
  date1: { type: String, required: [true, 'Drop off date is required'] },
  time1: { type: String, required: [true, 'Drop off time is required'] },
  vehicle: { type: String, required: [true, 'Vehicle is required'] },
  triptype: { type: String, required: [true, 'Trip type is required'] },
  subtype: { type: String, required: [true, 'Sub type is required'] },
  drivername: { type: String, required: [true, 'Driver name is required'] },
  mail: { type: String, required: [true, 'Email is required'], match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ },
  drivermobileno: { type: Number, required: [true, 'Mobile number is required'], min: 10 },
  address: { type: String, required: [true, 'Address is required'] },
  vehicleno: { type: String, required: [true, 'Vehicle number is required'] },
  currentDate: { type: Date, required: [true, 'Current date is required'] },
  image: { type: String, required: [true, 'Image is required'] },
});

// Define the static method to get data by date
getTripSchema.statics.getByDate = async function (date) {
  try {
    const data = await this.find({ date });
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

const getTripdetailSchema = mongoose.model("get-trip-details", getTripSchema);

module.exports = getTripdetailSchema;