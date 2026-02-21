import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the form from refreshing on submit
    const formErrors = {};
    
    // Email format validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!email) {
      formErrors.email = 'Email is required';
    } else if (!emailRegex.test(email)) {
      formErrors.email = 'Please enter a valid Gmail address (e.g., test@gmail.com)';
    }
    if (!password) formErrors.password = 'Password is required';
    setErrors(formErrors);
    
    if (Object.keys(formErrors).length > 0) return; // Stop submission if errors exist

    try {
      setLoading(true); // Start loading state
      const response = await axios.post('http://localhost:4000/userApi/loginUser', { email, password });

      // Extract token and role from response
      const { token, role } = response.data;

      // Store token and role in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      console.log("token",token);
      

      // Handle successful login and redirect based on role
      if (response.status === 200) {
        alert('Login successful! Redirecting...');
        
        // Redirect based on role
        if (role === 'buyer') {
          navigate('/');
        } else if (role === 'seller') {
          navigate('/');
        } else if (role === 'agent') {
          navigate('/agent-dashboard');
        } else {
          navigate('/'); // Default route if no role is matched
        }
      }
    } catch (error) {
      setLoading(false); // Stop loading if error occurs
      console.error('Error in login user:', error);
      alert('Error logging in. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1>Login</h1>
        
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          className="input-field"
        />
        {errors.email && <p className="error-text">{errors.email}</p>}

        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          className="input-field"
        />
        {errors.password && <p className="error-text">{errors.password}</p>}

        <button onClick={handleLogin} className="login-button" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <p>Not registered yet? <Link to="/register" className="register-link">Register here</Link></p>
      </div>
    </div>
  );
};

export default Login;
