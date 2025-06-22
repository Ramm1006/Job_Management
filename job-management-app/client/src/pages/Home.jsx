import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import JobList from '../components/JobList';

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchJobs = async (filters) => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();
      
      if (filters?.query) queryParams.append('query', filters.query);
      if (filters?.type) queryParams.append('type', filters.type);
      if (filters?.location) queryParams.append('location', filters.location);

      const response = await fetch(`http://localhost:5000/api/jobs?${queryParams}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch jobs');
      }

      setJobs(data);
      setError(null);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Error fetching jobs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="home">
      <SearchBar onSearch={fetchJobs} />
      {error && <div className="error-message">{error}</div>}
      {loading ? (
        <div className="loading">Loading jobs...</div>
      ) : (
        <JobList jobs={jobs} />
      )}
    </div>
  );
};

export default Home;