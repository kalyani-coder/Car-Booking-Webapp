const mongoose = require("mongoose");

const getTripSchema = new mongoose.Schema({
  customerId: String,
  customername: String,
  customermobile: Number,
  pickuplocation: String,
  date: String,
  time: String,
  dropofflocation: String,
  date1: String,
  time1: String,
  vehicle: String,
  triptype: String,
  subtype: String,
  drivername: String,
  mail: String,
  drivermobileno: Number,
  address: String,
  vehicleno: String,
  currentDate: Date,
  image: String,
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