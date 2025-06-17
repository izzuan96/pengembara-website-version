// src/pages/PlaceDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

import { searchPlaces } from '../api/places';

export default function PlaceDetail() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);

  useEffect(() => {
    // load all places then pick the one with matching id
    searchPlaces().then(raw => {
      const found = raw.find(p => p.id.toString() === id);
      setPlace(found || null);
    }).catch(console.error);
  }, [id]);

  if (place === null) return <p className="p-4">Loading…</p>;

  return (
    <div className="container py-4">
      <Link to="/" className="btn btn-link mb-3">← Back</Link>
      <h1>{place.name}</h1>
      {place.image && (
        <img
          src={place.image}
          alt={place.name}
          className="img-fluid rounded mb-4"
          loading="lazy"
        />
      )}
      <p>{place.description || 'No description available.'}</p>
      <p><strong>Location:</strong> {place.location || 'Unknown'}</p>
    </div>
  );
}
