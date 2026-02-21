const express = require('express');
const router = express.Router();
const Property = require('../Models/propertySchema');
const { jwtAuthMiddleware, generateToken } = require('../Middleware/auth');

// const errors = validationResult(req);
const { validationResult } = require('express-validator'); 


router.post('/addProperty', async (req, res) => {
  try {
    const { title, priceRange, location, amenities, description, image } = req.body;
      // console.log(req.body);
      // console.log("req.files",req.files);
      
      
    // Validate location manually if needed
    const VALID_LOCATIONS = [
      "Pune",
      "Mumbai",
      "Nashik",
      "Aurangabad",
      "Nagpur",
      "Bangalore",
      "Kerala"
    ];

    // Create and save the property
    const property = new Property({
      title,
      priceRange,
      location,
      amenities,
      description,
      image
    });

    const savedProperty = await property.save();
    // console.log("savedProperty",savedProperty);
    
    res.status(201).json(savedProperty);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.get('/getAllproperties', async (req, res) => {
  const { location, priceRange } = req.query;

  try {
    const filter = {};

    // Only add location filter if location is selected
    if (location) {
      filter.location = location;
    }

    // Only add priceRange filter if priceRange is selected
    if (priceRange) {
      filter.priceRange = priceRange;
    }

    const properties = await Property.find(filter); // Find properties based on the filters
    
    res.json(properties); // Return filtered properties
  } catch (error) {
    console.error('Error fetching properties:', error);
    res.status(500).json({ error: 'Server error' });
  }
});


// GET: Get property details by ID
router.get('/properties/:id', async (req, res) => {
  try {
    const propertyId = req.params.id;

    // Fetch property details from the database
    const property = await Property.findById(propertyId);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    // Send the property details as a response
    res.json(property);
  } catch (error) {
    console.error('Error fetching property details:', error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

router.put('/updateProperty/:id', async (req, res) => {
  const { id } = req.params;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { title, priceRange, location, amenities, description, image } = req.body;

    // Validate location manually if needed
    const VALID_LOCATIONS = [
      "Pune",
      "Mumbai",
      "Nashik",
      "Aurangabad",
      "Nagpur",
      "Bangalore",
      "Kerala"
    ];

    if (!VALID_LOCATIONS.includes(location)) {
      return res.status(400).json({ error: "Invalid location. Please select from the predefined locations." });
    }

    // Prepare data to update the property
    const updatedData = {
      title,
      priceRange,
      location,
      amenities,
      description,
      image
    };

    // Find the property and update it
    const property = await Property.findByIdAndUpdate(id, updatedData, {
      new: true, // Return the updated document
      runValidators: true, // Ensure updated fields adhere to model validation
    });

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    res.status(200).json(property);
  } catch (error) {
    console.error('Error updating property:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete property
router.delete('/deleteProperty/:id', async (req, res) => {
  try {
    // Find and delete the property by its ID
    const deletedProperty = await Property.findByIdAndDelete(req.params.id);

    // If the property is not found
    if (!deletedProperty) {
      return res.status(404).json({ message: 'Property not found' });
    }

    // Return success message if deletion is successful
    res.status(200).json({ message: 'Property deleted successfully' });
  } catch (error) {
    console.error('Error deleting property:', error);
    res.status(500).json({ message: 'Error deleting property' });
  }
});






module.exports = router