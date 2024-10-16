const mongoose = require('mongoose');

// Counter schema to track the last used customer number
const counterSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  seq: {
    type: Number,
    default: 0
  }
});

const Counter = mongoose.model('Counter', counterSchema);
module.exports = Counter;
