import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './SellerPropertyDetails.css'; // Import your custom CSS

const SellerPropertyDeatils = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all properties when the component mounts
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get('http://localhost:4000/propApi/getAllproperties');
        setProperties(response.data);
        console.log('response', response.data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // Handle property deletion
  const handleDeleteProperty = async (propertyId) => {
    try {
      const response = await axios.delete(`http://localhost:4000/propApi/deleteProperty/${propertyId}`);
      if (response.status === 200) {
        alert('Property deleted successfully!');
        // Refresh the list of properties after deletion
        setProperties(properties.filter(property => property._id !== propertyId));
      }
    } catch (error) {
      console.error('Error deleting property:', error);
      alert('Failed to delete property. Please try again.');
    }
  };

  return (
    <div className="property-container">
      <div className="header text-center">
        <h1>Explore Our Properties</h1>
        <p>Find the perfect property that meets your needs</p>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="loading text-center">
          <p>Loading properties...</p>
        </div>
      ) : (
        <div className="property-grid">
          {properties.length > 0 ? (
            properties.map((property) => (
              <div className="property-card" key={property._id}>
                <div className="property-image">
                  <img
                    src={`http://localhost:4000${property.image}`}
                    alt={property.title}
                  />
                </div>
                <div className="property-details">
                  <h5>{property.title}</h5>
                  <p><strong>Price:</strong> {property.priceRange}</p>
                  <p><strong>Location:</strong> {property.location}</p>
                  <p>
                    <strong>Description:</strong>
                    {property.description.length > 100
                      ? property.description.substring(0, 100) + '...'
                      : property.description}
                  </p>
                  <p>
                    <strong>Amenities:</strong> {property.amenities.join(', ')}
                  </p>

                  {/*
                  <Link to={`/property/${property._id}`} className="btn-more-details">
                    More Details
                  </Link> */}

                  {/* Delete Button */}
                  <button
                    className="btn-delete"
                    onClick={() => handleDeleteProperty(property._id)}
                  >
                    Delete Property
                  </button>

           {   /* update LINK */}
           <Link to={`/edit-user/${property._id}`} className="btn-update">
                Update Property
                </Link>


                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No properties available at the moment.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SellerPropertyDeatils;
