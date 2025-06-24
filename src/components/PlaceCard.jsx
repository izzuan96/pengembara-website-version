import React from 'react';
import './PlaceCard.css';

const PLACEHOLDER = 'https://via.placeholder.com/400x300?text=No+Image';

export default function PlaceCard({ place }) {
  const imgSrc        = place.image || PLACEHOLDER;
  const locationText  = place.state || place.location || 'Unknown location';

  return (
    <article className="place-card">
      {/* Image container (4:3) */}
      <div className="place-card-image-wrapper">
        <img
          src={imgSrc}
          alt={place.name}
          loading="lazy"
          onError={e => { e.currentTarget.src = PLACEHOLDER; }}
        />
      </div>

      {/* Separate info block below */}
      <div className="place-card-info">
        <h5 className="place-card-name">{place.name}</h5>
        <p className="place-card-state">{locationText}</p>
      </div>
    </article>
  );
}
