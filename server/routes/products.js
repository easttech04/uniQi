const router = require('express').Router();
let Product = require('../models/Product'); // To be used when we switch to DB

// For now, we'll use the same hardcoded data as the frontend
const products = [
  {
    id: 1,
    title: "Industrial Safety Helmet",
    description: "Top-grade helmet for maximum protection in industrial environments.",
    price: "$25.99",
    imageUrl: "https://via.placeholder.com/300x200/FFC107/000000?text=Helmet"
  },
  {
    id: 2,
    title: "Conveyor Belt System",
    description: "Efficient and durable conveyor systems for various industrial applications.",
    price: "$1250.00",
    imageUrl: "https://via.placeholder.com/300x200/03A9F4/FFFFFF?text=Conveyor"
  },
  {
    id: 3,
    title: "Security X-Ray Scanner",
    description: "High-resolution X-ray scanner for baggage and cargo screening.",
    price: "$5500.00",
    imageUrl: "https://via.placeholder.com/300x200/4CAF50/FFFFFF?text=X-Ray"
  },
  {
    id: 4,
    title: "CCTV Camera System",
    description: "Advanced CCTV cameras with night vision and remote monitoring.",
    price: "$899.99",
    imageUrl: "https://via.placeholder.com/300x200/E91E63/FFFFFF?text=CCTV"
  },
  {
    id: 5,
    title: "Fire Extinguisher",
    description: "Multi-purpose fire extinguisher for commercial and industrial use.",
    price: "$75.00",
    imageUrl: "https://via.placeholder.com/300x200/F44336/FFFFFF?text=Fire+Safety"
  },
  {
    id: 6,
    title: "Automated Parking Barrier",
    description: "Reliable and fast automated barrier for car parking systems.",
    price: "$1800.00",
    imageUrl: "https://via.placeholder.com/300x200/9C27B0/FFFFFF?text=Parking"
  },
];

// @route   GET /api/products
// @desc    Get all products
router.get('/', (req, res) => {
  res.json(products);
});

// @route   GET /api/products/:id
// @desc    Get a single product by id
router.get('/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ msg: 'Product not found' });
  }
  res.json(product);
});

module.exports = router;
