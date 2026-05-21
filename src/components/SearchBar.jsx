// src/components/SearchBar.jsx
import React from 'react';

const SearchBar = ({ setSearchTerm }) => {
  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="Search for a country..."
        className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;