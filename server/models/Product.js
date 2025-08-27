const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, required: true }, // Should be Number in a real app
  imageUrl: { type: String, required: true },
  status: {
    type: String,
    required: true,
    enum: ['Available', 'On Sale', 'Out of Stock'],
    default: 'Available',
  },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
