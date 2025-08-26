const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  customer: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
  },
  products: [
    {
      productId: { type: String },
      title: { type: String },
      quantity: { type: Number },
      price: { type: String },
    }
  ],
  totalPrice: { type: Number, required: true },
  status: { type: String, default: 'Pending' },
}, {
  timestamps: true,
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
