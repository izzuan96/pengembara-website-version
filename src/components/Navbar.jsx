import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const initial = params.get('q') || '';

  const [term, setTerm] = useState(initial);

  const onSubmit = e => {
    e.preventDefault();
    const q = term.trim();
    // Update URL to /?q=yourTerm (or just / if empty)
    if (q) {
      navigate(`/?q=${encodeURIComponent(q)}`);
    } else {
      navigate(`/`);
    }
  };

  return (
    <nav className="navbar-custom">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          <img
            src={`${process.env.PUBLIC_URL}/icons/logo.png`}
            alt="Pengembara"
            className="navbar-logo"
          />
        </Link>

        <form className="search-form d-flex" onSubmit={onSubmit}>
          <input
            type="search"
            className="form-control search-input"
            placeholder="Where to?"
            value={term}
            onChange={e => setTerm(e.target.value)}
          />
          <button type="submit" className="btn btn-primary search-btn">
            Search
          </button>
        </form>
      </div>
    </nav>
  );
}
