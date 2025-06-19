import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Job } from '../types';
import EditJobForm from '../components/EditJobForm';

const JobDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const role = localStorage.getItem('role');

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/api/jobs/${id}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch job');
        }

        setJob(data);
        setError(null);
      } catch (error) {
        console.error('Error fetching job:', error);
        setError(error instanceof Error ? error.message : 'Error fetching job');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchJob();
    }
  }, [id]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleUpdate = async (updatedData: Job) => {
    try {
      const response = await fetch(`http://localhost:5000/api/jobs/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
      });

      if (!response.ok) {
        throw new Error('Failed to update job');
      }

      const updated = await response.json();
      setJob(updated);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating job:', error);
    }
  };

  if (loading) return <div className="job-details-loading">Loading...</div>;
  if (error) return <div className="job-details-error">Error: {error}</div>;
  if (!job) return <div className="job-details-not-found">Job not found</div>;

  return (
    <div className="job-details">
      <button onClick={() => navigate('/')} className="back-button">
        Back to Jobs
      </button>
      
      {role === 'admin' && !isEditing && (
        <button onClick={handleEdit} className="edit-button">
          Edit Job
        </button>
      )}

      {isEditing ? (
        <EditJobForm
          job={job}
          onSubmit={handleUpdate}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <>
          <h1>{job.title}</h1>
          <h2>{job.company}</h2>
          <div className="job-info">
            <p><strong>Location:</strong> {job.location}</p>
            <p><strong>Type:</strong> {job.type}</p>
            <p><strong>Salary:</strong> {job.salary}</p>
          </div>
          <div className="description">
            <h3>Description</h3>
            <p>{job.description}</p>
          </div>
          <div className="requirements">
            <h3>Requirements</h3>
            <ul>
              {job.requirements?.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default JobDetails;