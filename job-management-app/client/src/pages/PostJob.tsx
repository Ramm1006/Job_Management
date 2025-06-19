import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Job } from '../types';

const PostJob: React.FC = () => {
  const navigate = useNavigate();
  const [jobData, setJobData] = useState<Omit<Job, '_id'>>({
    title: '',
    company: '',
    location: '',
    type: 'full-time',
    salary: '',
    description: '',
    requirements: [],
    postedDate: new Date().toISOString()
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jobData)
      });
      
      if (response.ok) {
        navigate('/');
      }
    } catch (error) {
      console.error('Error posting job:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="post-job-form">
      <h2>Post a New Job</h2>
      <input
        type="text"
        placeholder="Job Title"
        value={jobData.title}
        onChange={e => setJobData({ ...jobData, title: e.target.value })}
      />
      <input
        type="text"
        placeholder="Company"
        value={jobData.company}
        onChange={e => setJobData({ ...jobData, company: e.target.value })}
      />
      <input
        type="text"
        placeholder="Location"
        value={jobData.location}
        onChange={e => setJobData({ ...jobData, location: e.target.value })}
      />
      <select
        value={jobData.type}
        onChange={e => setJobData({ ...jobData, type: e.target.value as 'full-time' | 'part-time' | 'contract' })}
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
      />
      <textarea
        placeholder="Job Description"
        value={jobData.description}
        onChange={e => setJobData({ ...jobData, description: e.target.value })}
      />
      <input
        type="text"
        placeholder="Requirements (comma separated)"
        value={jobData.requirements.join(', ')}
        onChange={e => setJobData({ ...jobData, requirements: e.target.value.split(',').map(req => req.trim()) })}
      />
      <button type="submit">Post Job</button>
    </form>
  );
};

export default PostJob;