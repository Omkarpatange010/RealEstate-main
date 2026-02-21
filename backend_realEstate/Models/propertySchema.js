const mongoose = require('mongoose');

const VALID_LOCATIONS = ["Pune", "Mumbai", "Nashik", "Aurangabad", "Nagpur", "Bangalore", "Kerala"];
const VALID_PRICE_RANGES = [
 '5000000-6000000', 
 '6000000-10000000', 
 '10000000-20000000', 
 '20000000-30000000'
];

const propertySchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    priceRange: { type: String, required: true, enum: VALID_PRICE_RANGES },
    location: { type: String, required: true, enum: VALID_LOCATIONS },
    amenities: [String],
    description: String,
    image:{ type: String },
    // ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } // Store the user's ID who created the property

  },
  { timestamps: true }
);

module.exports = mongoose.model('Property', propertySchema);
