import React, { useState, useEffect } from 'react';
import './FavoriteButton.css';

export default function FavoriteButton({ placeId, placeName }) {
  const [isFav, setIsFav] = useState(false);
  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem('favs')||'[]');
    setIsFav(favs.includes(placeId));
  }, [placeId]);

  const toggle = () => {
    const favs = JSON.parse(localStorage.getItem('favs')||'[]');
    let update;
    if (isFav) {
      update = favs.filter(id => id!==placeId);
      setIsFav(false);
    } else {
      update = [...favs, placeId];
      setIsFav(true);
    }
    localStorage.setItem('favs', JSON.stringify(update));
    alert(isFav ? 'Removed from favorites' : `${placeName} added to favorites!`);
  };

  return (
    <button className={`fav-btn ${isFav?'favorited':''}`} onClick={toggle}>
      {isFav ? '♥ Favorited' : '♡ Add to Favorites'}
    </button>
  );
}
