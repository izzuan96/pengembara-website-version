import { useState } from 'react';
import './SearchBar.css';

export default function SearchBar({ onSearch }) {
  const [q, setQ] = useState('');

  const submit = e => {
    e.preventDefault();
    onSearch(q);
  };

  return (
    <form className="search-form d-flex" onSubmit={submit}>
      <input
        type="search"
        className="form-control search-input"
        placeholder="Where to?"
        value={q}
        onChange={e => setQ(e.target.value)}
      />
      <button type="submit" className="btn btn-primary ms-2">
        Search
      </button>
    </form>
  );
}
