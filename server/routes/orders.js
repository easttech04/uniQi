const router = require('express').Router();
let Order = require('../models/Order');

// @route   POST /api/orders
// @desc    Create a new order
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { customer, products, totalPrice } = req.body;

    const newOrder = new Order({
      customer,
      products,
      totalPrice,
    });

    // In a real app, this would save to MongoDB.
    // For now, we are not connected to a live DB.
    // const order = await newOrder.save();

    // We'll just simulate a successful save.
    const order = newOrder;
    order._id = require('mongoose').Types.ObjectId(); // Simulate a mongo ID

    res.status(201).json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
