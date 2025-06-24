// src/components/FilterSidebar.jsx
import React, { useState } from 'react';
import './FilterSidebar.css';

export default function FilterSidebar({ onApply, sortBy, locationFilter }) {
  const [open, setOpen] = useState(false);

  return (
    <aside className={`filter-sidebar ${open ? 'open' : ''}`}>
      <button
        className="filter-toggle"
        onClick={() => setOpen(o => !o)}
      >
        {open ? 'Hide Filters' : 'Show Filters'}
      </button>
      {open && (
        <div className="filter-content">
          <label>Sort by:</label>
          <select value={sortBy} onChange={e => onApply({ sort: e.target.value })}>
            <option value="name-asc">Name A → Z</option>
            <option value="name-desc">Name Z → A</option>
          </select>

          <label>Location:</label>
          <input
            type="text"
            placeholder="e.g. Kelantan"
            value={locationFilter}
            onChange={e => onApply({ location: e.target.value })}
          />

          <button onClick={() => onApply({})} className="apply-btn">
            Apply
          </button>
        </div>
      )}
    </aside>
  );
}
