const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  roles: [{
    type: Schema.Types.ObjectId,
    ref: 'Role'
  }],
  isVerified: {
    type: Boolean,
    default: false,
  },
  verificationToken: String,
  verificationTokenExpires: Date,
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
