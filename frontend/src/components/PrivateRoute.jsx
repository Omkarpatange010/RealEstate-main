import React from 'react';
import { Navigate } from 'react-router-dom';

// A custom Route component to protect routes
const PrivateRoute = ({ element, ...rest }) => {
  // Check if the user is authenticated
  const token = localStorage.getItem('token');
  
    console.log("token in local storage", token);
    
  // If not authenticated, redirect to login
  if (!token) {
    return <Navigate to="/login" />;
  }

  // If authenticated, render the element (protected route)
  return element;
};

export default PrivateRoute;
