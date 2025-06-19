import React, { useState } from 'react';
import { SearchFilters } from '../types';

interface Props {
  onSearch: (filters: SearchFilters) => void;
}

const SearchBar: React.FC<Props> = ({ onSearch }) => {
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    type: '',
    location: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(filters);
  };

  const handleReset = () => {
    const emptyFilters: SearchFilters = {
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