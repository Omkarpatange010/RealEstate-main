import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditUser = () => {
  const { propertyId } = useParams(); 
  console.log("propertyId",propertyId);
  
  const navigate = useNavigate(); // For navigation after updating

  // State to hold property data and form input values
  const [property, setProperty] = useState({
    title: '',
    priceRange: '',
    location: '',
    description: '',
    amenities: [],
    image: '',
  });
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]);

  // Fetch property data on component mount
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/propApi/properties/${propertyId}`);
        console.log(response.data); // Log the data to see if it's correct
        setProperty(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching property:', error);
        setLoading(false);
      }
    };

    fetchProperty();
  }, [propertyId]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProperty((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle amenities (assuming it's a comma-separated string)
  const handleAmenitiesChange = (e) => {
    const amenitiesList = e.target.value.split(',').map((item) => item.trim());
    setProperty((prevState) => ({
      ...prevState,
      amenities: amenitiesList,
    }));
  };

  // Handle form submission (update property)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]); // Reset errors

    // Validation (simple example)
    if (!property.title || !property.priceRange || !property.location) {
      setErrors(['All fields are required']);
      return;
    }

    try {
      const response = await axios.put(`http://localhost:4000/propApi/updateProperty/${propertyId}`, property);
      if (response.status === 200) {
        alert('Property updated successfully!');
        navigate(`/property/${propertyId}`); // Redirect to property details page
      }
    } catch (error) {
      console.error('Error updating property:', error);
      alert('Failed to update property. Please try again.');
    }
  };

  return (
    <div className="update-property-container">
      <div className="header text-center">
        <h1>Edit Property</h1>
        <p>Update your property details</p>
      </div>

      {loading ? (
        <div className="loading text-center">
          <p>Loading property...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="property-form">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={property.title || ''}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="priceRange">Price Range</label>
            <input
              type="text"
              id="priceRange"
              name="priceRange"
              value={property.priceRange || ''}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={property.location || ''}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={property.description || ''}
              onChange={handleChange}
              className="form-control"
              rows="4"
            />
          </div>

          <div className="form-group">
            <label htmlFor="amenities">Amenities (comma-separated)</label>
            <input
              type="text"
              id="amenities"
              name="amenities"
              value={property.amenities.join(', ') || ''}
              onChange={handleAmenitiesChange}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label htmlFor="image">Image URL</label>
            <input
              type="text"
              id="image"
              name="image"
              value={property.image || ''}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          {errors.length > 0 && (
            <div className="error-messages">
              {errors.map((error, index) => (
                <p key={index} className="text-danger">{error}</p>
              ))}
            </div>
          )}

          <button type="submit" className="btn-submit">
            Update Property
          </button>
        </form>
      )}
    </div>
  );
};

export default EditUser;
