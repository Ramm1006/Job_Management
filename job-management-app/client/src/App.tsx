import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import JobDetails from './pages/JobDetails';
import PostJob from './pages/PostJob';
import Login from './pages/Login';
import Signup from './pages/Signup';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to="/signup" />;
  return <>{children}</>;
};

const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const role = localStorage.getItem('role');
  if (role !== 'admin') return <Navigate to="/" />;
  return <>{children}</>;
};

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const token = localStorage.getItem('token');
  if (token) return <Navigate to="/" />;
  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            } />
            <Route path="/signup" element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            } />
            <Route path="/login" element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } />
            <Route path="/jobs/:id" element={
              <PrivateRoute>
                <JobDetails />
              </PrivateRoute>
            } />
            <Route path="/post-job" element={
              <AdminRoute>
                <PostJob />
              </AdminRoute>
            } />
            <Route path="*" element={<Navigate to="/signup" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;