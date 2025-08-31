const router = require('express').Router();
let Product = require('../models/Product');

// @route   GET /api/products
// @desc    Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

// @route   POST /api/products
// @desc    Create a new product
router.post('/', async (req, res) => {
  const { title, description, price, imageUrl } = req.body;

  try {
    const newProduct = new Product({
      title,
      description,
      price,
      imageUrl,
    });

    const product = await newProduct.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

// @route   GET /api/products/:id
// @desc    Get a single product by id
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

module.exports = router;
