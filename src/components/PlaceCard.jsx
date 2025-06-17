// src/components/PlaceCard.jsx
import React from 'react';
import './PlaceCard.css';

const PLACEHOLDER = 'https://via.placeholder.com/400x300?text=No+Image';

export default function PlaceCard({ place }) {
  const src = place.image || PLACEHOLDER;

  return (
    <article className="place-card">
      <img
        className="place-card-img"
        src={src}
        alt={place.name}
        loading="lazy"
        onError={e => { e.currentTarget.src = PLACEHOLDER; }}
      />
      <div className="place-card-body">
        <h5>{place.name}</h5>
        <p>{place.location || 'Unknown location'}</p>
      </div>
    </article>
  );
}
