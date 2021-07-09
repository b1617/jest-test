const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: String,
    enum: ['$', '$$', '$$$'],
    default: '$'
  }
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
