// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import "./PropertyDetails.css"; // Import a CSS file for styling

// const PropertyDetails = () => {
//   const { id } = useParams(); // Get the property ID from the URL
//   const [property, setProperty] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     // Fetch property details using the ID
//     const fetchPropertyDetails = async () => {
//       try {
//         const response = await axios.get(`http://localhost:4000/propApi/properties/${id}`);
//         setProperty(response.data);
//         setLoading(false);
//       } catch (err) {
//         setError("Failed to load property details. Please try again.");
//         setLoading(false);
//       }
//     };

//     fetchPropertyDetails();
//   }, [id]);

//   if (loading) return <p>Loading property details...</p>;
//   if (error) return <p className="text-danger">{error}</p>;

//   const { title, priceRange, location, description, amenities, image, bhk, carpetArea } = property;

//   return (
//     <div className="container mt-4" style={{ width: '90%' }}>
//     <div className="card">
//       <div className="row">
//         {/* Left side: Property image */}
//         <div className="col-md-6">
//           {image ? (
//             <img
//               src={`http://localhost:4000${image}`}
//               alt={title}
//               className="card-img"
//               style={{ objectFit: 'cover', width: '100%', height: '100%' }}
//             />
//           ) : (
//             <div className="card-img" style={{ backgroundColor: '#f0f0f0', height: '100%' }}>
//               <p className="text-center" style={{ paddingTop: '100px' }}>No image available</p>
//             </div>
//           )}
//         </div>
  
//         {/* Right side: Property details */}
//         <div className="col-md-6">
//           <div className="card-body">
//             <h5 className="card-title">{title}</h5>
//             <p className="card-text"><strong>Price:</strong> {priceRange}</p>
//             <p className="card-text"><strong>Location:</strong> {location}</p>
//             <p className="card-text"><strong>Description:</strong> {description}</p>
//             <p className="card-text"><strong>Amenities:</strong> {amenities && amenities.join(", ")}</p>
//             <p className="card-text"><strong>BHK:</strong> {5} BHK</p>
//             <p className="card-text"><strong>Carpet Area:</strong> 3600 - 4600 sq. ft.</p>
//             <p className="card-text"><strong>Property Type:</strong> Home</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
  
  
//   );
// };

// export default PropertyDetails;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal, Form, Alert } from "react-bootstrap"; // Import Bootstrap components
import { useParams } from "react-router-dom"; // useParams for property ID
import "./PropertyDetails.css"; // Import custom CSS

const PropertyDetails = () => {
  const { id } = useParams(); // Get the property ID from the URL
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false); // State to handle modal visibility
  const [buyerName, setBuyerName] = useState(""); // State to store buyer's name
  const [buyerMobile, setBuyerMobile] = useState(""); // State to store buyer's mobile
  const [formError, setFormError] = useState(""); // State to store form validation errors
  const [successMessage, setSuccessMessage] = useState(""); // State for success message

  useEffect(() => {
    // Fetch property details using the ID
    const fetchPropertyDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/propApi/properties/${id}`);
        setProperty(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load property details. Please try again.");
        setLoading(false);
      }
    };

    fetchPropertyDetails();
  }, [id]);

  const handleShowModal = () => setShowModal(true); // Show modal
  const handleCloseModal = () => {
    setShowModal(false);
    setFormError("");
    setBuyerName("");
    setBuyerMobile("");
  };

  const handleBuyerSubmit = async () => {
    // Validate form fields
    if (!buyerName || !buyerMobile || buyerMobile.length !== 10 || !/^\d+$/.test(buyerMobile)) {
      setFormError("Please provide a valid name and a 10-digit mobile number.");
      return;
    }

    try {
      // Submit buyer's details to the backend
      const response = await axios.post("http://localhost:4000/intBuyerRouterApi", {
        name: buyerName,
        mobile: buyerMobile,
        propertyId: id, // Pass the property ID
      });

      if (response.status === 201) {
        setSuccessMessage("Your interest has been submitted successfully!");
        handleCloseModal();
      } else {
        setFormError("Failed to submit your interest. Please try again.");
      }
    } catch (err) {
      setFormError("An error occurred while submitting your interest. Please try again.");
    }
  };

  if (loading) return <p>Loading property details...</p>;
  if (error) return <Alert variant="danger">{error}</Alert>;

  const { title, priceRange, location, description, amenities, image } = property;

  return (
    <div className="container mt-4">
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      
      {/* Property Image and Details */}
      <div className="property-details">
        {/* Left side: Property image */}
        <div className="property-image">
          {image ? (
            <img
              src={`http://localhost:4000${image}`}
              alt={title}
              className="property-image-img"
              width={530}
              height={300}
            />
          ) : (
            <div className="property-image-placeholder">
              <p>No image available</p>
            </div>
          )}
        </div>

        {/* Right side: Property details */}
        <div className="property-info">
          <h2>{title}</h2>
          <p><strong>Price:</strong> {priceRange}</p>
          <p><strong>Location:</strong> {location}</p>
          <p><strong>Description:</strong> {description}</p>
          <p><strong>Amenities:</strong> {amenities && amenities.join(", ")}</p>
          <p><strong>Property Type:</strong> Home</p>

          {/* Buy button */}
          <Button variant="primary"  className="btn center-btn" onClick={handleShowModal}>
            Interested in this Property
          </Button>
        </div>
      </div>
     {/* Modal for Buyer Details */}
     <div className="cont">
  <Modal show={showModal} onHide={handleCloseModal} className="custom-modal">
    <Modal.Header closeButton className="modal-header">
      <Modal.Title>Buyer Details</Modal.Title>
    </Modal.Header>
    <Modal.Body className="modal-body">
      {/* {formError && <Alert variant="danger">{formError}</Alert>} */}
      <Form>
        <Form.Group className="mb-3" controlId="buyerName">
          <Form.Control
            type="text"
            placeholder="Enter your name"
            value={buyerName}
            onChange={(e) => setBuyerName(e.target.value)}
            className="bordered-input"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="buyerMobile">
          <Form.Control
            type="text"
            placeholder="Enter your mobile number"
            value={buyerMobile}
            onChange={(e) => setBuyerMobile(e.target.value)}
            className="bordered-input"
          />
        </Form.Group>
      </Form>
    </Modal.Body>
    <Modal.Footer className="modal-footer">
      <Button variant="secondary" onClick={handleCloseModal} className="btnClose">
        Go Back
      </Button>
      <Button variant="primary" onClick={handleBuyerSubmit} className="btnClose">
        Submit
      </Button>
    </Modal.Footer>
  </Modal>
  {/* {successMessage && <Alert variant="success">{successMessage}</Alert>} */}
</div>

    </div>
  );
};

export default PropertyDetails;


