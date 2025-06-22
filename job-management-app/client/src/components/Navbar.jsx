import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem('role');
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      {token ? (
        <>
          <Link to="/" className="nav-brand">Naukri Lite</Link>
          <div className="nav-links">
            <Link to="/">Home</Link>
            {role === 'admin' && <Link to="/post-job">Post a Job</Link>}
            <button onClick={handleLogout}>Logout</button>
          </div>
        </>
      ) : (
        <div className="auth-nav">
          <span className="nav-brand">Job Board</span>
          <div className="nav-links">
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;