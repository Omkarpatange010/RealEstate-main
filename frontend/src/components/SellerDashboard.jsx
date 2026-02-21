import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Alert } from "react-bootstrap"; // Import Bootstrap components
import "./SellerDashboard.css"; // Import your CSS if any

const SellerDashboard = () => {
  const [interestedBuyers, setInterestedBuyers] = useState([]); // State to store buyers
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(""); // Error state

  useEffect(() => {
    // Fetch the interested buyers list from the backend
    const fetchInterestedBuyers = async () => {
      try {
        const response = await axios.get("http://localhost:4000/intBuyerRouterApi/getAllinterested");
        setInterestedBuyers(response.data); // Assuming the response data is an array of interested buyers
        setLoading(false);
      } catch (err) {
        setError("Failed to load interested buyers. Please try again.");
        setLoading(false);
      }
    };

    fetchInterestedBuyers();
  }, []);

  if (loading) return <p>Loading interested buyers...</p>;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div className="container mt-4">
      <h3>Interested Buyers</h3>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Mobile Number</th>
            <th>Property ID</th>
            {/* <th>title</th> */}
            <th>Date of Interest</th>
          </tr>
        </thead>
        {/* console.log(buyer.propertyId);  */}
        <tbody>
          
          {interestedBuyers.map((buyer) => (
            <tr key={buyer._id}> {/* Assuming each buyer has a unique ID */}
              <td>{buyer.name}</td>
              <td>{buyer.mobile}</td>
              <td>{buyer.propertyId}</td>
              {/* <td>{buyer.propertyId ? buyer.propertyId.title : 'No Property Title'}</td>  */}
              <td>{new Date(buyer.createdAt).toLocaleDateString()}</td> {/* Displaying the date of interest */}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};


export default SellerDashboard;

