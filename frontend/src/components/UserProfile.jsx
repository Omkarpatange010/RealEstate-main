import React,{useState,useEffect} from 'react'
import './UserProfile.css'


const UserProfile = () => {
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    role: ''
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user')); // Get user data from localStorage
    if (user) {
      setUserInfo({
        name: user.name,
        email: user.email,
        role: user.role
      });
    }
  }, []);

  return (
    <div className="dropdown">
      {userInfo.name ? (
        <>
          <button className="dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            {userInfo.name}
          </button>
          <ul className="dropdown-menu">
            <li><p className="dropdown-item">Name: {userInfo.name}</p></li>
            <li><p className="dropdown-item">Email: {userInfo.email}</p></li>
            <li><p className="dropdown-item">Role: {userInfo.role}</p></li>
            <li><button className="dropdown-item" onClick={() => {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                window.location.href = '/login';  // Redirect to login page
              }}>Sign Out</button></li>
          </ul>
        </>
      ) : (
        <p className="dropdown-item">Not logged in</p>
      )}
    </div>
  );
};

export default UserProfile;
