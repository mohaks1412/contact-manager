'use client';

import React, { useState } from 'react';
import { Search, X, Command } from 'lucide-react';

const SearchBar = ({ onSearch, placeholder = "Search directory..." }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  const clearSearch = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <div className="relative w-full group">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Search className={`h-4 w-4 transition-colors duration-300 ${
          query ? 'text-[#8B5E3C]' : 'text-[#C2B280]'
        }`} />
      </div>
      
      <input
        type="text"
        spellCheck="false"
        className="w-full pl-11 pr-12 py-3.5 bg-[#F5F5DC] border border-[#D2B48C] rounded-2xl 
                   text-[#3E2723] text-sm font-medium placeholder:text-[#A68A64]
                   focus:border-[#8B5E3C] focus:ring-4 focus:ring-[#8B5E3C]/10 
                   transition-all duration-300 outline-none
                   shadow-[0_2px_10px_rgba(62,39,35,0.05)] group-hover:shadow-md"
        placeholder={placeholder}
        value={query}
        onChange={handleSearch}
      />
      
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
        {query &&
          <button
            onClick={clearSearch}
            className="p-1.5 rounded-lg text-[#8B5E3C] hover:bg-[#8B5E3C]/10 
                       transition-all duration-200 active:scale-90"
          >
            <X className="h-4 w-4" />
          </button>
        }
      </div>
    </div>
  );
};

export default SearchBar;