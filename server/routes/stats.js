const router = require('express').Router();
const Order = require('../models/Order');
const User = require('../models/User');
const Product = require('../models/Product');

// @route   GET /api/stats
// @desc    Get key statistics for the dashboard
// @access  Private (for admin)
router.get('/', async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();

    const revenueData = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$totalPrice' }
        }
      }
    ]);

    const totalRevenue = revenueData.length > 0 ? revenueData[0].totalRevenue : 0;

    const salesOverTime = await Order.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          dailySales: { $sum: "$totalPrice" }
        }
      },
      { $sort: { _id: 1 } } // Sort by date
    ]);

    res.json({
      totalOrders,
      totalRevenue,
      totalUsers,
      totalProducts,
      salesOverTime
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
