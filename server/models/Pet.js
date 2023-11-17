const mongoose = require('mongoose');

const { Schema } = mongoose;

const petSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  species: String,
  breed: String,
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  birthdate: String,
  image: String, // URL to cloud hosted image
  weight: Number,
  height: Number,
  vaccinations: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

const Pet = mongoose.model('Pet', petSchema);

module.exports = Pet;

