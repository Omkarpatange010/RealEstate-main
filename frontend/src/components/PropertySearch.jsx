
import './PropertySearch.css'
import React,{useState} from 'react'
import axios from 'axios';

const PropertySearch = () => {
    const [properties, setProperties] = useState([]);
    const [location, setLocation] = useState('');
    const [priceRange, setPriceRange] = useState(''); 
    const [loading, setLoading] = useState(false);
  
    const locations = ['Pune', 'Mumbai', 'Nashik', 'Aurangabad', 'Nagpur', 'Bangalore', 'Kerala'];
    const priceRanges = ['5000000-6000000', '6000000-10000000', '10000000-20000000', '20000000-30000000'];  // Add price ranges
  
    const handleSearch = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:4000/propApi/getAllproperties', {
          params: { location, priceRange }  // Include priceRange in request
        });
        console.log("response", response);
        setProperties(response.data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
      setLoading(false);
    };
  return (
    <div className="container mt-4">
    <h2>Search Properties</h2>

    {/* Form in inline format */}
    <div className="form-inline">
      <div className="form-group mr-3">
        <label>Location</label>
        <select
          className="form-control"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        >
          <option value="">Select Location</option>
          {locations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range Dropdown */}
      <div className="form-group mr-3">
        <label>Price Range</label>
        <select
          className="form-control"
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
        >
          <option value="">Select Price Range</option>
          {priceRanges.map((range) => (
            <option key={range} value={range}>
              {range}
            </option>
          ))}
        </select>
      </div>

      <button className="btn btn-primary" onClick={handleSearch}>
        Search
      </button>
    </div>

    {/* Loading and Properties Display */}
    {loading ? (
      <p>Loading properties...</p>
    ) : (
      <div className="row mt-4">
        {properties.length > 0 ? (
          properties.map((property) => (
            <div className="col mb-4" key={property._id}>
              <div className="card">
                <img
                //   src={property.image}
                src={`http://localhost:4000${property.image}`}
                  className="card-img-top"
                  alt={property.title}
                  style={{ height: '200px', objectFit: 'cover' }}
                  onError={(e) => {
                    // Fallback to a placeholder if the image fails to load
                    e.target.src = 'https://via.placeholder.com/200';
                  }}
                />
                <div className="card-body">
                  <h5 className="card-title">{property.title}</h5>
                  <p className="card-text">Price: {property.priceRange}</p>
                  <p className="card-text">Location: {property.location}</p>
                  <p className="card-text">Description: {property.description}</p>
                  <p className="card-text">
                    <strong>Amenities:</strong> {property.amenities.join(', ')}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No properties found for this location and price range.</p>
        )}
      </div>
    )}
  </div>
  )
}

export default PropertySearch