const router = require('express').Router();
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
let User = require('../models/User');
const { protect, authorize } = require('../middleware/authMiddleware');

// @route   GET /api/users
// @desc    Get all users
// @access  Private (for admin)
router.get('/', protect, authorize('System Administrator', 'Super Admin'), async (req, res) => {
  try {
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
router.post('/', protect, authorize('System Administrator', 'Super Admin'), async (req, res) => {
  const { username, email, password, roles } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User with that email already exists' });
    }

    user = new User({
      username,
      email,
      password,
      roles, // Assuming roles are passed as an array of ObjectId
    });

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Create verification token
    const verificationToken = crypto.randomBytes(20).toString('hex');
    user.verificationToken = verificationToken;
    user.verificationTokenExpires = Date.now() + 3600000; // 1 hour

    await user.save();

    // Mock sending an email
    console.log('--- MOCK EMAIL ---');
    console.log(`Verification link: http://localhost:3000/verify/${verificationToken}`);
    console.log('------------------');

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
router.delete('/:id', protect, authorize('System Administrator', 'Super Admin'), async (req, res) => {
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
