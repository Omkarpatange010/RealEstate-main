// components/UserProfileDropdown.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserProfileDropdown.css'; // Add styling for the dropdown menu

const UserProfileDropdown = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();

  // Toggle dropdown
  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  // Signout function
  const signout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setDropdownOpen(false); // Close dropdown
    navigate('/login'); // Redirect to login page
  };

  // Fetch user details (from localStorage or API)
  useEffect(() => {
    const storedName = localStorage.getItem('userName') || 'Guest User';
    const storedEmail = localStorage.getItem('userEmail') || 'guest@example.com';
    setUserName(storedName);
    setUserEmail(storedEmail);
  }, []);

  return (
    <div className="user-profile-dropdown">
      <i
        className="fas fa-user-circle user-icon"
        onClick={toggleDropdown}
      ></i>
      {dropdownOpen && (
        <div className="dropdown-menu">
          <p>Name: {userName}</p>
          <p>Email: {userEmail}</p>
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent dropdown close on click
              signout(); // Perform signout
            }}
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfileDropdown;
