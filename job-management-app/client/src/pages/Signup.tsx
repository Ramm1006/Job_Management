import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { SignupData } from '../types';

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<SignupData>({
    email: '',
    password: '',
    role: 'user'
  });
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
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

      if (!response.ok) {
        throw new Error(data.message || 'Signup failed');
      }

      console.log('Signup successful:', data);
      navigate('/login');
    } catch (error) {
      console.error('Signup error:', error);
      setError(error instanceof Error ? error.message : 'An error occurred during signup');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Create Account</h2>
        {error && <div className="auth-error">{error}</div>}
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              required
              value={userData.email}
              onChange={e => setUserData({ ...userData, email: e.target.value })}
              disabled={isLoading}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              required
              value={userData.password}
              onChange={e => setUserData({ ...userData, password: e.target.value })}
              disabled={isLoading}
              minLength={6}
            />
          </div>
          <div className="form-group">
            <label htmlFor="role">Account Type</label>
            <select
              id="role"
              value={userData.role}
              onChange={e => setUserData({ ...userData, role: e.target.value as 'admin' | 'user' })}
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
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
