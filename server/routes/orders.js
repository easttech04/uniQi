const router = require('express').Router();
let Order = require('../models/Order');
const { protect, authorize } = require('../middleware/authMiddleware');

// @route   GET /api/orders
// @desc    Get all orders
// @access  Private (for admin)
router.get('/', protect, authorize('Sales', 'System Administrator', 'Super Admin'), async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

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

    const order = await newOrder.save();
    res.status(201).json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
