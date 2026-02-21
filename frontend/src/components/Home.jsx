// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
//  import './Home.css';
// import { Link } from 'react-router-dom';

// const Home = () => {
//   const [properties, setProperties] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch all properties when the component mounts
//   useEffect(() => {
//     const fetchProperties = async () => {
//       try {
//         const response = await axios.get('http://localhost:4000/propApi/getAllproperties');
//         setProperties(response.data);
//         console.log("response",response.data);
        
//       } catch (error) {
//         console.error('Error fetching properties:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProperties();
//   }, []);

//   return (
//     <div className="home-container">
//       <div className="header text-center">
//         <h1>Explore Our Properties</h1>
//         <p>Find the perfect property that meets your needs</p>
//       </div>

//       {/* Loading State */}
//       {loading ? (
//         <div className="loading text-center">
//           <p>Loading properties...</p>
//         </div>
//       ) : (
//         <div className="row mt-4 property-grid">
//           {properties.length > 0 ? (
//             properties.map((property) => (
//               <div className="col-lg-4 col mb-4" key={property._id}>
//                 <div className="card property-card">
//                   {/* Image in the card */}
//                   <img
//                     src={`http://localhost:4000${property.image}`}
//                     className="card-img-top"
//                     alt={property.title}
//                     style={{ height: '200px', objectFit: 'cover' }}
//                   />
//                   {/* <img
//                     src={property.firstImage} // Use the first image from the response
//                     className="card-img-top"
//                     alt="Property"
//                     style={{ height: '200px', objectFit: 'cover' }}
//                   /> */}
//                   <div className="card-body">
//                     <h5 className="card-title">{property.title}</h5>
//                     <p className="card-text">Price: {property.priceRange}</p>
//                     <p className="card-text">Location: {property.location}</p>
//                     <p className="card-text description">
//                       {property.description.length > 100
//                         ? property.description.substring(0, 100) + '...'
//                         : property.description}
//                     </p>
//                     <p className="card-text amenities">
//                       <strong>Amenities:</strong> {property.amenities.join(', ')}
//                     </p>
//                     <Link to={`/property/${property._id}`} className="btn btn-primary"> More Details </Link>
             
           
//                   </div>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p className="text-center">No properties available at the moment.</p>
//           )}
//         </div>

        
//       )}

//        {/* Luxury Houses Video Section */}
//        <div className="video-section mt-5 text-center">
//         <h2>Experience Luxury Living</h2>
//         <p>Watch this video to get inspired by luxury homes</p>
//         <video
//           controls
//           width="80%"
//           style={{
//             borderRadius: '10px',
//             boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//             marginTop: '20px',
//           }}
//         >
//           <source
//             src="https://videos.pexels.com/video-files/29385643/12657708_2560_1440_50fps.mp4" // Replace with your video URL
//             type="video/mp4"
//           />
//           Your browser does not support the video tag.
//         </video>
//       </div>
//     </div>
//   );
// };

// export default Home;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';
import { Link } from 'react-router-dom';

const Home = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchLocation, setSearchLocation] = useState(''); // State for location search
  const [filteredProperties, setFilteredProperties] = useState([]); // State for filtered properties

  // List of available locations for the search bar
  const locations = [
    'Pune',
    'Mumbai',
    'Nashik',
    'Aurangabad',
    'Nagpur',
    'Bangalore',
    'Kerala',
  ];

  // Fetch all properties when the component mounts
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get('http://localhost:4000/propApi/getAllproperties');
        setProperties(response.data);
        setFilteredProperties(response.data); // Initially, show all properties
        console.log("response", response.data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // Filter properties based on selected location
  useEffect(() => {
    if (searchLocation) {
      const filtered = properties.filter(property =>
        property.location.toLowerCase().includes(searchLocation.toLowerCase())
      );
      setFilteredProperties(filtered);
    } else {
      setFilteredProperties(properties); // If no location is selected, show all properties
    }
  }, [searchLocation, properties]);

  return (
    <div className="home-container">
      <div className="header text-center">
        <h1>Explore Our Properties</h1>
        <p>Find the perfect property that meets your needs</p>
      </div>

      {/* Location Search Bar */}
      <div className="location-search text-center ">
        <select
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
          className="form-control"
        >
          <option value="">Select Property By Location</option>
          {locations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="loading text-center">
          <p>Loading properties...</p>
        </div>
      ) : (
        <div className="row mt-4 property-grid">
          {filteredProperties.length > 0 ? (
            filteredProperties.map((property) => (
              <div className="col-lg-4 col mb-4" key={property._id}>
                <div className="card property-card">
                  {/* Image in the card */}
                  <img
                    src={`http://localhost:4000${property.image}`}
                    className="card-img-top"
                    alt={property.title}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{property.title}</h5>
                    <p className="card-text">Price: {property.priceRange}</p>
                    <p className="card-text">Location: {property.location}</p>
                    <p className="card-text description">
                      {property.description.length > 100
                        ? property.description.substring(0, 100) + '...'
                        : property.description}
                    </p>
                    <p className="card-text amenities">
                      <strong>Amenities:</strong> {property.amenities.join(', ')}
                    </p>
                    <Link to={`/property/${property._id}`} className="btn btn-primary">
                      More Details
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No properties available for the selected location.</p>
          )}
        </div>
      )}

      {/* Luxury Houses Video Section */}
      <div className="video-section mt-5 text-center">
        <h2>Experience Luxury Living</h2>
        <p>Watch this video to get inspired by luxury homes</p>
        <video
          controls
          width="80%"
          style={{
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            marginTop: '20px',
          }}
        >
          <source
            src="https://videos.pexels.com/video-files/29385643/12657708_2560_1440_50fps.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default Home;
