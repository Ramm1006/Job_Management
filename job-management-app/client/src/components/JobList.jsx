import React from 'react';
import JobCard from './JobCard';

const JobList = ({ jobs }) => {
  return (
    <div className="job-list">
      {jobs.map(job => (
        <JobCard key={job._id || job.id} job={job} />
      ))}
    </div>
  );
};

export default JobList;