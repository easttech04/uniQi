const router = require('express').Router();
let User = require('../models/User');
// const bcrypt = require('bcryptjs'); // Would be used in a real app

// @route   GET /api/users
// @desc    Get all users
// @access  Private (for admin)
router.get('/', async (req, res) => {
  try {
    // In a real app, this would be a protected route
    const users = await User.find().select('-password'); // Exclude passwords from result
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/users
// @desc    Create a new user
// @access  Private (for admin)
router.post('/', async (req, res) => {
  const { username, password, isAdmin } = req.body;

  try {
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({
      username,
      password,
      isAdmin,
    });

    // In a real app, you would hash the password
    // const salt = await bcrypt.genSalt(10);
    // user.password = await bcrypt.hash(password, salt);

    await user.save();

    // Return user without password
    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(201).json({ msg: 'User created successfully', user: userResponse });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE /api/users/:id
// @desc    Delete a user
// @access  Private (for admin)
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json({ msg: 'User removed' });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


module.exports = router;
