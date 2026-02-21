import React, {useState} from 'react'
import './RegisterDetails.css'
import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom';

const RegisterDetails = () => {
  const[name,setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('buyer'); // Default role
  // const [errors, setErrors] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // For showing loading state
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const formErrors = {};
    if (!name) formErrors.name = 'Name is required';
    if (!email) formErrors.email = 'Email is required';
    if (!password) formErrors.password = 'Password is required';
    // if (!termsAccepted) formErrors.terms = 'You must accept the Terms & Conditions';
    setErrors(formErrors)

      // If there are any errors, prevent form submission
      if (Object.keys(formErrors).length > 0) {
        return;
      }
  
    setLoading(true);

    try {
        const response = await axios.post('http://localhost:4000/userApi/register', {
          name,
          email,
          password,
          role,
        });
        console.log("response",response);
        // const { token } = response.data;
        // localStorage.setItem('token', token)
        ;
        if (response.status === 201) {
          alert('Registration successful! Redirecting to login...');
          navigate('/login');
        } else {
          alert('Registration failed.');
        }
      } catch (error) {
        console.error('Error registering user:', error);
        setErrors(error.response?.data?.message || 'Registration failed.');
      }finally {
        setLoading(false); // Reset loading state
      }
    
    
  }
  return (
    <div className="register-container">
    <div className="register-form">
      <h2>New User Registration</h2>
<p>Create an Account to Avail the Best Real Estate Solutions</p>
      <input
        type="text"
        placeholder="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="input-field"
      />
      {errors.name && <p className="error-text">{errors.name}</p>}
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
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="input-field"
      >
        <option value="buyer">Buyer</option>
        <option value="seller">Seller</option>
        <option value="agent">Agent</option>
      </select>
      <button onClick={handleRegister} className="register-button" disabled={loading}>
      {loading ? 'Registering...' : 'Register'}
      </button>
      {errors.general && <p className="error-text">{errors.general}</p>}
      <p>
          Already Registered? <Link to="/login">Login here</Link>
        </p>
    </div>
  </div>
  )
}

export default RegisterDetails