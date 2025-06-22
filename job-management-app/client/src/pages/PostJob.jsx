import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PostJob = () => {
  const navigate = useNavigate();
  const [jobData, setJobData] = useState({
    title: '',
    company: '',
    location: '',
    type: 'full-time',
    salary: '',
    description: '',
    requirements: [],
    postedDate: new Date().toISOString()
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jobData)
      });
      if (response.ok) {
        navigate('/');
      } else {
        const data = await response.json();
        setError(data.message || 'Error posting job');
      }
    } catch (error) {
      setError('Error posting job');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="post-job-form">
      <h2>Post a New Job</h2>
      {error && <div className="auth-error">{error}</div>}
      <input
        type="text"
        placeholder="Job Title"
        value={jobData.title}
        onChange={e => setJobData({ ...jobData, title: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Company"
        value={jobData.company}
        onChange={e => setJobData({ ...jobData, company: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Location"
        value={jobData.location}
        onChange={e => setJobData({ ...jobData, location: e.target.value })}
        required
      />
      <select
        value={jobData.type}
        onChange={e => setJobData({ ...jobData, type: e.target.value })}
        required
      >
        <option value="full-time">Full Time</option>
        <option value="part-time">Part Time</option>
        <option value="contract">Contract</option>
      </select>
      <input
        type="text"
        placeholder="Salary"
        value={jobData.salary}
        onChange={e => setJobData({ ...jobData, salary: e.target.value })}
        required
      />
      <textarea
        placeholder="Job Description"
        value={jobData.description}
        onChange={e => setJobData({ ...jobData, description: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Requirements (comma separated)"
        value={jobData.requirements.join(', ')}
        onChange={e => setJobData({ ...jobData, requirements: e.target.value.split(',').map(req => req.trim()) })}
        required
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Posting...' : 'Post Job'}
      </button>
    </form>
  );
};

export default PostJob;