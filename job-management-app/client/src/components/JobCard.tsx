import React from 'react';
import { Link } from 'react-router-dom';
import { Job } from '../types';

interface Props {
  job: Job;
}

const JobCard: React.FC<Props> = ({ job }) => {
  return (
    <div className="job-card">
      <h3>{job.title}</h3>
      <p>{job.company}</p>
      <p>{job.location}</p>
      <p>{job.type}</p>
      <p>{job.salary}</p>
      <Link to={`/jobs/${job._id}`}>View Details</Link>
    </div>
  );
};

export default JobCard;