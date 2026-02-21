// routes/propertyRoutes.js (or a new file like interestedRoutes.js)
const express = require("express");
const router = express.Router();
const InterestedBuyer = require("../Models/InterestedBuyerSchema");

// POST /propApi/interested - Save buyer's interest in a property


// POST /propApi/interested - Save buyer's interest in a property
router.post('/', async (req, res) => {
  try {
    const { name, mobile, propertyId } = req.body;
// console.log("req.body",req.body);

    // Validate required fields
    if (!name || !mobile || !propertyId) {
      return res.status(400).json({ error: 'Name, mobile, and propertyId are required.' });
    }

    // Create a new interested buyer
    const newBuyer = new InterestedBuyer({ name, mobile, propertyId });
    await newBuyer.save();

    res.status(201).json({ message: 'Interested buyer saved successfully.', data: newBuyer });
  } catch (error) {
    console.error('Error creating interested buyer:', error);
    res.status(500).json({ error: 'Failed to create interested buyer.' });
  }
});

// router.get("/getAllinterested", async (req, res) => {
//     try {
//       const interestedBuyers = await InterestedBuyer.find(); // Fetch all documents from the collection
//       res.status(200).json(interestedBuyers);
//     } catch (error) {
//       console.error("Error fetching interested buyers:", error);
//       res.status(500).json({ message: "Internal Server Error." });
//     }
//   });

router.get('/getAllinterested', async (req, res) => {
  try {
    const interestedBuyers = await InterestedBuyer.find()
      // .populate('propertyId', 'title') // Populate the 'propertyId' field with the 'title' from the Property model
      // .exec();
      
    res.status(200).json(interestedBuyers);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

module.exports = router;
