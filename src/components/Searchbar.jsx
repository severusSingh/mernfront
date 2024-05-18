import React, { useState } from 'react';
import axios from 'axios';


const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    console.log('Search query:', searchQuery);
    try {
      const formattedQuery = searchQuery.toLowerCase().replace(/\s+/g, '-');
      const response = await axios.get(`https://mernback-a2n5.onrender.com/api/v1/tours?slug=${formattedQuery}`);
      const searchData = response.data.data.tours;
      console.log('Search results:', searchData);
      onSearch(searchData);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <form className="nav__search" onSubmit={handleSearchSubmit}>
      <button type="submit" className="nav__search-btn">
        <svg>
          <use xlinkHref="../../public/img/icons.svg#icon-search">Search</use>
        </svg>
      </button>
      <input
        type="text"
        placeholder="Search tours"
        className="nav__search-input"
        value={searchQuery}
        onChange={handleSearchInputChange}
      />
    </form>
  );
};

export default SearchBar;
