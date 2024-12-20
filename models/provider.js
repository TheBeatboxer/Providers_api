const mongoose = require('mongoose');

const providerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  service: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
});

const Provider = mongoose.model('Provider', providerSchema);

module.exports = Provider;
