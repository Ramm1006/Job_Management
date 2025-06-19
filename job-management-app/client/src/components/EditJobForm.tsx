import React, { useState } from 'react';
import { Job } from '../types';

interface Props {
  job: Job;
  onSubmit: (updatedJob: Job) => void;
  onCancel: () => void;
}

const EditJobForm: React.FC<Props> = ({ job, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<Job>(job);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="edit-job-form">
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          value={formData.title}
          onChange={e => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="company">Company</label>
        <input
          id="company"
          type="text"
          value={formData.company}
          onChange={e => setFormData({ ...formData, company: e.target.value })}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="location">Location</label>
        <input
          id="location"
          type="text"
          value={formData.location}
          onChange={e => setFormData({ ...formData, location: e.target.value })}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="type">Type</label>
        <select
          id="type"
          value={formData.type}
          onChange={e => setFormData({ ...formData, type: e.target.value as Job['type'] })}
        >
          <option value="full-time">Full Time</option>
          <option value="part-time">Part Time</option>
          <option value="contract">Contract</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="salary">Salary</label>
        <input
          id="salary"
          type="text"
          value={formData.salary}
          onChange={e => setFormData({ ...formData, salary: e.target.value })}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={formData.description}
          onChange={e => setFormData({ ...formData, description: e.target.value })}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="requirements">Requirements (comma separated)</label>
        <input
          id="requirements"
          type="text"
          value={formData.requirements.join(', ')}
          onChange={e => setFormData({
            ...formData,
            requirements: e.target.value.split(',').map(req => req.trim())
          })}
          required
        />
      </div>

      <div className="button-group">
        <button type="submit" className="save-button">Save Changes</button>
        <button type="button" onClick={onCancel} className="cancel-button">Cancel</button>
      </div>
    </form>
  );
};

export default EditJobForm;
