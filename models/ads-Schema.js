const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
  companyId: {
    type: String,
    required: true
  },
  primaryText: {
    type: String,
  },
  headline: {
    type: String,
  },
  description: {
    type: String,
  },
  imageUrl: {
    type: String,
    required: true
  }
});

const Ad = mongoose.model('companyName', adSchema);

module.exports = Ad;