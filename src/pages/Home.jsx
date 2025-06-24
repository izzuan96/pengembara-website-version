// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import MapView   from '../components/MapView';
import PlaceCard from '../components/PlaceCard';
import Sidebar   from '../components/Sidebar';
import { searchPlaces } from '../api/places';
import './Home.css';

export default function Home() {
  const [places, setPlaces]           = useState([]);
  const [filtered, setFiltered]       = useState([]);
  const [sortBy, setSortBy]           = useState('name-asc');
  const [locFilter, setLocFilter]     = useState('');
  const [visibleCount, setVisibleCount] = useState(20);

  // Utility to strip off leading "1. ", "10. ", etc.
  const normalizeName = name =>
    name.replace(/^\s*\d+\.\s*/, '').trim();

  // Clean raw data: strip numeric prefixes, drop bubbles/ticket labels
  const cleanData = raw =>
    raw
      .map(p => ({ ...p, name: normalizeName(p.name) }))
      .filter(p =>
        !/bubbles/i.test(p.name) &&
        !/^Admission tickets/i.test(p.name)
      );

  // 1) Fetch & clean on mount
  useEffect(() => {
    searchPlaces()
      .then(raw => {
        setPlaces(cleanData(raw || []));
      })
      .catch(console.error);
  }, []);

  // 2) Apply sort & location filter
  useEffect(() => {
    let arr = [...places];

    if (locFilter.trim()) {
      arr = arr.filter(p =>
        (p.state || p.location || '')
          .toLowerCase()
          .includes(locFilter.toLowerCase())
      );
    }

    arr.sort((a,b) => {
      const na = a.name.toLowerCase();
      const nb = b.name.toLowerCase();
      return sortBy === 'name-asc'
        ? na.localeCompare(nb)
        : nb.localeCompare(na);
    });

    setFiltered(arr);
    setVisibleCount(20);
  }, [places, sortBy, locFilter]);

  const showMore = () => setVisibleCount(v => v + 20);

  return (
    <>
      {/* Offcanvas Drawer for Filters */}
      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="offcanvasFilters"
        aria-labelledby="offcanvasFiltersLabel"
      >
        <div className="offcanvas-header">
          <h5 id="offcanvasFiltersLabel">Filters</h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
          />
        </div>
        <div className="offcanvas-body">
          <Sidebar
            onSortChange={setSortBy}
            onFilterApply={({ location }) => setLocFilter(location)}
            locationFilter={locFilter}
          />
        </div>
      </div>

      {/* Main content */}
      <div className="home-container">
        <main className="home-main">
          <MapView
            center={[3.1390, 101.6869]}
            zoom={8}
            places={filtered.filter(p => p.lat && p.lng)}
          />

          <div className="place-grid">
            {filtered.slice(0, visibleCount).map(p => (
              <PlaceCard key={p.id} place={p} />
            ))}
          </div>

          {visibleCount < filtered.length && (
            <button className="show-more" onClick={showMore}>
              Show more ({filtered.length - visibleCount})
            </button>
          )}
        </main>
      </div>
    </>
  );
}
