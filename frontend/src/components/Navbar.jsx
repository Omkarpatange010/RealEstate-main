import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css'; 
import UserProfile from './UserProfile';  // Import UserProfile component

const Navbar = () => {
  const navigate = useNavigate();

  // Function to handle signout
  const signout = () => {
    // Clear authentication tokens
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    // Redirect to the login page after signout
    navigate('/login');
  };

  // Get the role from localStorage and determine if the user is logged in
  const role = localStorage.getItem('role');
  const isLoggedIn = Boolean(localStorage.getItem('token')); // Check if a token exists

  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        
        {/* Render Create Property link if the user is logged in and not a buyer */}
        {isLoggedIn && role !== 'buyer' && (
          <li><Link to="/create-property">Create Property</Link></li>
        )}
        
        <li><Link to="/property-search">Property Search</Link></li>
        
        {/* Render Seller Property Details link only if the user is a seller */}
        {isLoggedIn && role === 'seller' && (
        <>
          <li><Link to="/seller-property-details">Seller Property Details</Link></li>
          <li><Link to="/seller-dashboard">Seller Dashboard</Link></li>
        </>
         
        )}

        {/* Conditionally render login, register, and signout based on login status */}
        {!isLoggedIn ? (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        ) : (
          <li>
            <button className="dropdown-item" onClick={signout}>Sign Out</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;

//  <nav>
  //     <ul>
  //       <li><Link to="/">Home</Link></li>
  //       <li><Link to="/create-Property">Create Property</Link></li>
  //       <li><Link to="/Property-search">Property Search</Link></li>
  //       <li><Link to="/map">Map</Link></li>
  //       {/* <li><Link to="/message">Messages</Link></li> */}
  //       <li><Link to="/login">Login</Link></li>
  //       <li><Link to="/register">Register</Link></li>
  //     <li><button className="dropdown-item" onClick={signout}>Sign Out</button></li>
  //     </ul>
  //   </nav>