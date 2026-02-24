import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import RegisterDetails from './components/RegisterDetails';
import BuyerDashboard from './components/BuyerDashboard';
 import SellerDashboard from './components/SellerDashboard';
import Map from './components/Map';
import CreateProperty from './components/CreateProperty';
// import ProjectSearch from './components/ProjectSearch';
import UserProfile from './components/UserProfile';
import './App.css'
// import 'leaflet/dist/leaflet.css';
import PropertySearch from './components/PropertySearch';
import PrivateRoute from './components/PrivateRoute'
import PropertyDetails from './components/PropertyDetails';
import SellerPropertyDetails from './components/SellerPropertyDetails';
import EditUser from './components/EditUser';

const App = () => {
   return (
//     <Router>
//         <div
//         style={{
//           backgroundImage: `url(${RealEstateImg})`, // Correct usage of the imported image
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//           minHeight: '100vh', // Ensure the background covers the full height
//         }}
//       >
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<RegisterDetails />} />
//         <Route path="/property/:id" element={<PropertyDetail />} />
//          <Route path="/dashboard" element={<Dashboard />} />
//          <Route path="/buyer-dashboard" element={<BuyerDashboard />} />
//          <Route path="/buyer-dashboard" element={<SellerDashboard />} />
//       </Routes>
//       </div>
//     </Router>
//   );
// };

<Router>
  <Navbar />
  <div className="main-content">
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/property/:id" element={<PropertyDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<RegisterDetails />} />
      {/* <Route path="/user-profile" element={<UserProfile />} /> */}

      {/* Protected routes */}
      <Route path="/buyer-dashboard" element={<PrivateRoute element={<BuyerDashboard />} />} />
      <Route path="/seller-dashboard" element={<PrivateRoute element={<SellerDashboard />} />} />
      <Route path="/create-property" element={<PrivateRoute element={<CreateProperty />} />} />
      <Route path="/property-search" element={<PrivateRoute element={<PropertySearch />} />} />

      <Route path="/seller-property-details" element={<PrivateRoute element={<SellerPropertyDetails />} />} /> 
      <Route path="/edit-user/:propertyId" element={<PrivateRoute element={<EditUser />} />} />
    </Routes>

  </div>
</Router>

   )}

export default App;
