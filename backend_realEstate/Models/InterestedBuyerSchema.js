const mongoose = require('mongoose');

const InterestedBuyerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required.'], // Ensures name is mandatory
    trim: true, // Removes extra spaces
  },
  mobile: {
    type: String,
    required: [true, 'Mobile number is required.'], // Ensures mobile is mandatory
    match: [/^\d{10}$/, 'Mobile number must be 10 digits.'], // Validates a 10-digit number
  },
  propertyId: {
    type: mongoose.Schema.Types.ObjectId, // Refers to a document in the properties collection
    required: [true, 'Property ID is required.'],
    ref: 'Property', // Replace 'Property' with your actual collection name
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields automatically
});

module.exports = mongoose.model('InterestedBuyer', InterestedBuyerSchema);
