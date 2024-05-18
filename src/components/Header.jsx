import React, { useContext, useState } from 'react';
import { UserContext } from '../context/userContext';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import SearchBar from './Searchbar';

function Header() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (results) => {
    setSearchResults(results);
  };

  // Check if user or user.data is undefined
  const userName = user && user.data && user.data.name ? user.data.name.split(' ')[0] : '';

  return (
    <header className="header">
      <nav className="nav nav--tours">
        <Link to="/" className="nav__el">Natours</Link>
        <SearchBar onSearch={handleSearch} />  
        {searchResults.length > 0 && (
          <div className="search-results">
            <h2>Search Results</h2>
            <ul className="search-results-list">
              {searchResults.map((tour) => (
                <li key={tour._id} className="search-results-item">
                  <Link
                    to={`/tours/${tour._id}`}
                    onClick={() => navigate(`/tours/${tour._id}`)}
                    className="search-results-link">
                    {tour.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
        {/* <form className="nav__search">
          <button className="nav__search-btn">
            <svg>
              <use xlinkHref="../../public/img/icons.svg#icon-search"></use>
            </svg>
          </button>
          <input
            type="text"
            placeholder="Search tours"
            className="nav__search-input"
          />
        </form> */}
      </nav>
      <div className="header__logo">
        <img src="/img/logo-white.png" alt="Natours" />
      </div>
      {user ? (
        <nav className="nav nav--user">
          <Link to={`/profile/${user.data._id}`} className="nav__el">
            <img src={`https://mernback-a2n5.onrender.com/uploads/${user.data.photo}`} alt={`Photoof${userName}`} className="nav__user-img" />
            <span>{userName}</span>
          </Link>
          <Link to="/logout" className="nav__el nav__el--logout">Log out</Link>
        </nav>
      ) : (
        <nav className="nav nav--user">
          <Link to="/login" className="nav__el">Log in</Link>
          <Link to="/register" className="nav__el nav__el--cta">Sign up</Link>
        </nav>
      )}
    </header>
  );
}

export default Header;
