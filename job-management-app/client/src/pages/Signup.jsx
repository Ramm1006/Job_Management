import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: '',
    password: '',
    role: 'user'
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      const data = await response.json();
      if (response.ok) {
        navigate('/login');
      } else {
        setError(data.message || 'Signup failed');
      }
    } catch (error) {
      setError('An error occurred during signup');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Create Your Account</h2>
        <p className="auth-subtitle">Join our job platform to find your next opportunity</p>
        {error && <div className="auth-error">{error}</div>}
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={userData.email}
              onChange={e => setUserData({ ...userData, email: e.target.value })}
              placeholder="Enter your email"
              required
              disabled={isLoading}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={userData.password}
              onChange={e => setUserData({ ...userData, password: e.target.value })}
              placeholder="Create a password"
              required
              disabled={isLoading}
              minLength={6}
            />
          </div>
          <div className="form-group">
            <label htmlFor="role">Account Type</label>
            <select
              id="role"
              value={userData.role}
              onChange={e => setUserData({ ...userData, role: e.target.value })}
              disabled={isLoading}
            >
              <option value="user">Job Seeker</option>
              <option value="admin">Employer</option>
            </select>
          </div>
          <button type="submit" disabled={isLoading} className="auth-button">
            {isLoading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>
        <p className="auth-switch">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
