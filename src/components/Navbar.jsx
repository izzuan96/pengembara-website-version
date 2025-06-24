import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import { FiFilter } from 'react-icons/fi';
import './Navbar.css';

export default function Navbar() {
  const navigate = useNavigate();

  const handleSearch = q => {
    navigate(`/?q=${encodeURIComponent(q)}`);
  };

  return (
    <header className="navbar-custom">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo-link">
          <img
            src={`${process.env.PUBLIC_URL}/icons/logo.png`}
            alt="Pengembara"
            className="navbar-logo"
          />
        </Link>

        {/* Search */}
        <div className="navbar-search-wrapper">
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>

      {/* Filter button */}
      <div className="btn-container">
        <button
          className="filter-btn"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasFilters"
          aria-controls="offcanvasFilters"
        >
          <FiFilter size={19} />
        </button>
      </div>
    </header>
  );
}
