//for storing info on vet care, dog walking, pet siting, grooming.

const mongoose = require('mongoose');

const { Schema } = mongoose;

const serviceSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  provider: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  reviews: [{
    type: Schema.Types.ObjectId,
    ref: 'Review',
  }],
}, { timestamps: true });

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;
