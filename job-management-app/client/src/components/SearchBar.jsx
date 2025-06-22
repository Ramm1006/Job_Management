import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [filters, setFilters] = useState({
    query: '',
    type: '',
    location: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(filters);
  };

  const handleReset = () => {
    const emptyFilters = {
      query: '',
      type: '',
      location: ''
    };
    setFilters(emptyFilters);
    onSearch(emptyFilters);
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <div className="search-inputs">
        <input
          type="text"
          placeholder="Search jobs by title, company, or keywords..."
          value={filters.query}
          onChange={e => setFilters({ ...filters, query: e.target.value })}
        />
        <select
          value={filters.type}
          onChange={e => setFilters({ ...filters, type: e.target.value })}
        >
          <option value="">All Types</option>
          <option value="full-time">Full Time</option>
          <option value="part-time">Part Time</option>
          <option value="contract">Contract</option>
        </select>
        <input
          type="text"
          placeholder="Location"
          value={filters.location}
          onChange={e => setFilters({ ...filters, location: e.target.value })}
        />
        <div className="search-buttons">
          <button type="submit">Search</button>
          <button type="button" onClick={handleReset}>Reset</button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;