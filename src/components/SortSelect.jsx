import React from 'react';
import './SortSelect.css';

export default function SortSelect({ onChange }) {
  return (
    <select onChange={e => onChange(e.target.value)}>
      <option value="name-asc">Name A → Z</option>
      <option value="name-desc">Name Z → A</option>
    </select>
  );
}
