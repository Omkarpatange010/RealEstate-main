const express = require('express');
const router = express.Router();
const { jwtAuthMiddleware, generateToken } = require('../Middleware/auth');
const Property = require('../Models/propertySchema');

// Seller properties
router.get('/seller', jwtAuthMiddleware, async (req, res) => {
  const userId = req.user.id;
  try {
    const properties = await Property.find({ seller: userId });
    res.status(200).json(properties);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching properties' });
  }
});

// Buyer properties (for example, by location or price)
router.get('/buyer', jwtAuthMiddleware, async (req, res) => {
  try {
    const properties = await Property.find();
    res.status(200).json(properties);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching properties' });
  }
});

module.exports = router;
