import React, { useState } from 'react';
import './SearchBar.css';

export default function SearchBar({ onSearch }) {
  const [q, setQ] = useState('');
  const submit = e => {
    e.preventDefault();
    onSearch(q);
  };

  return (
    <form className="search-bar" onSubmit={submit}>
      <input
        type="text"
        placeholder="Where to?"
        value={q}
        onChange={e => setQ(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
}
