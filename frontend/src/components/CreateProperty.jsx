import React, { useState } from 'react';
import axios from 'axios';
import './CreateProperty.css';
import { useNavigate } from 'react-router-dom';


const CreateProperty = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [location, setLocation] = useState('');
  const [amenities, setAmenities] = useState([]);
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null); // Single file
  const [uploadedImagePath, setUploadedImagePath] = useState(''); // Single image path
  const [message, setMessage] = useState('');

  const locations = ['Pune', 'Mumbai', 'Nashik', 'Aurangabad', 'Nagpur', 'Bangalore', 'Kerala'];
  const priceRanges = ['5000000-6000000', '6000000-10000000', '10000000-20000000', '20000000-30000000'];

  const handleAmenitiesChange = (e) => {
    const { value, checked } = e.target;
    setAmenities((prevAmenities) =>
      checked ? [...prevAmenities, value] : prevAmenities.filter((amenity) => amenity !== value)
    );
  };

  // Single Image Upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0]; // Get the selected file
    setImage(file); // Store file in state

    const formData = new FormData();
    formData.append('image', file); // Append the single image

    try {
      const response = await axios.post('http://localhost:4000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      // Set the uploaded image path
      setUploadedImagePath(response.data.imagePath);
      setMessage('Image uploaded successfully');
    } catch (error) {
      setMessage('Error uploading image');
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate('/');
    const propertyData = {
      title,
      priceRange,
      location,
      amenities,
      description,
      image: uploadedImagePath, // Use the uploaded image path
      // ownerId: user._id,
    };

    try {
      const response = await axios.post('http://localhost:4000/propApi/addProperty', propertyData);
      setMessage('Property created successfully');
      console.log('response', response.data);
    } catch (error) {
      setMessage('Error creating property');
      console.error(error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Create Property</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Price Range</label>
          <select
            className="form-control"
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            required
          >
            <option value="">Select Price Range</option>
            {priceRanges.map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Location</label>
          <select
            className="form-control"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          >
            <option value="">Select Location</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        {/* Amenities Section */}
        <div className="form-group">
          <label>Amenities</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {['Pool', 'Gym', 'Garden'].map((amenity) => (
              <div key={amenity} style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  type="checkbox"
                  value={amenity}
                  onChange={handleAmenitiesChange}
                  checked={amenities.includes(amenity)}
                  style={{ marginRight: '5px' }}
                />
                <label>{amenity}</label>
              </div>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Upload Image</label>
          <input
            type="file"
            className="form-control"
            onChange={handleImageUpload}
            accept="image/*"
          />
          {uploadedImagePath && (
            <div className="mt-2">
              <p>Uploaded Image Preview:</p>
              <img
                src={`http://localhost:4000${uploadedImagePath}`}
                alt="Uploaded Preview"
                style={{ maxWidth: '100px', maxHeight: '100px' }}
              />
            </div>
          )}
        </div>

        <button type="submit" onClick={handleSubmit} className="btn btn-primary">
          Create Property
        </button>
      </form>
      {message && <div className="mt-3">{message}</div>}
    </div>
  );
};

export default CreateProperty;
