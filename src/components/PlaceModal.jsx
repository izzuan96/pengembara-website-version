import React from 'react';
import './PlaceModal.css';
import FavoriteButton from './FavoriteButton';

export default function PlaceModal({ place, onClose }) {
  if (!place) return null;
  return (
    <div className="pm-overlay" onClick={onClose}>
      <div className="pm-content" onClick={e => e.stopPropagation()}>
        <button className="pm-close" onClick={onClose}>×</button>
        {place.image && <img src={place.image} alt={place.name} className="pm-image" />}
        <h2>{place.name}</h2>
        <p>{place.description || 'No description available.'}</p>
        <FavoriteButton placeId={place.id} placeName={place.name} />
      </div>
    </div>
  );
}
