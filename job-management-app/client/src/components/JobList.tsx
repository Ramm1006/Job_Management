import React from 'react';
import JobCard from './JobCard';
import { Job } from '../types';

interface Props {
  jobs: Job[];
}

const JobList: React.FC<Props> = ({ jobs }) => {
  return (
    <div className="job-list">
      {jobs.map(job => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
};

export default JobList;