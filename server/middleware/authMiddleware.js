const jwt = require('jsonwebtoken');
require('dotenv').config();

// Middleware to verify JWT and attach user to request
const protect = (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user payload to the request object
      req.user = decoded.user;
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ msg: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ msg: 'Not authorized, no token' });
  }
};

// Middleware to check for specific roles
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.roles) {
      return res.status(403).json({ msg: 'Forbidden: User has no roles assigned' });
    }

    // The user's roles are in req.user.roles, check if any of them are in the allowed roles
    const hasRequiredRole = req.user.roles.some(userRole => roles.includes(userRole));

    if (!hasRequiredRole) {
      // For Super Admin, we can check for a special permission
      if (req.user.roles.includes('Super Admin')) {
        return next();
      }
      return res.status(403).json({ msg: `Forbidden: User does not have the required role (${roles.join(' or ')})` });
    }

    next();
  };
};

module.exports = { protect, authorize };
