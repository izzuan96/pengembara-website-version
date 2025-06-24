// src/components/Sidebar.jsx
import React, { useState, useEffect } from 'react'
import SortSelect from './SortSelect'
import './Sidebar.css'

export default function Sidebar({
  onSortChange,
  onFilterApply,
  locationFilter
}) {
  // local input state
  const [location, setLocation] = useState(locationFilter || '')

  // if parent ever clears locationFilter, sync it here
  useEffect(() => {
    setLocation(locationFilter || '')
  }, [locationFilter])

  // helper to fire your parent callback
  const applyFilters = () =>
    onFilterApply({ location: location.trim() })

  // helper to clear everything
  const clearFilters = () => {
    setLocation('')
    onFilterApply({ location: '' })
  }

  return (
    <div className="sidebar-static">
      <div className="filter-group">
        <label htmlFor="sort-select">Sort by:</label>
        <SortSelect id="sort-select" onChange={onSortChange} />
      </div>

      <div className="filter-group">
        <label htmlFor="loc-input">Location:</label>
        <input
          id="loc-input"
          type="text"
          placeholder="e.g. Kelantan"
          value={location}
          onChange={e => setLocation(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') applyFilters()
          }}
        />
      </div>

      <div className="filter-actions">
        <button className="apply-btn" onClick={applyFilters}>
          Filters
        </button>
        <button className="clear-btn" onClick={clearFilters}>
          Clear
        </button>
      </div>
    </div>
  )
}
