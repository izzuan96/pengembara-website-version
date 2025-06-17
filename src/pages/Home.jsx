// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import '../App.css';
import './Home.css';
import MapView from '../components/MapView';
import PlaceCard from '../components/PlaceCard';
import { searchPlaces } from '../api/places';

export default function Home() {
  const [places, setPlaces]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams]        = useSearchParams();
  const q = searchParams.get('q') || '';

  const PAGE_SIZE = 20;
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => {
    setLoading(true);
    searchPlaces(q)
      .then(raw => {
        // normalize names & filter only when searching
        const norm = raw.map(p => ({
          ...p,
          name: p.name.replace(/^\s*\d+\.\s*/, '').trim()
        }));
        const filtered = q
          ? norm.filter(p =>
              !/bubbles/i.test(p.name) &&
              !/^Admission tickets/i.test(p.name)
            )
          : norm;

        setPlaces(filtered);
        setVisibleCount(PAGE_SIZE);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [q]);

  const loadMore = () =>
    setVisibleCount(c => Math.min(places.length, c + PAGE_SIZE));

  const visiblePlaces = places.slice(0, visibleCount);

  return (
    <main className="home-page">
      <div className="container my-4">
        {loading ? (
          <p className="loading-text">Loading…</p>
        ) : places.length === 0 ? (
          <p className="no-results">No places to show.</p>
        ) : (
          <>
            <MapView
              center={[3.1390, 101.6869]}
              zoom={10}
              places={places.filter(p => p.lat && p.lng)}
            />

            <div className="listings">
              {visiblePlaces.map(p => (
                <Link
                  key={p.id}
                  to={`/place/${p.id}`}
                  className="listing-link"
                >
                  <PlaceCard place={p} />
                </Link>
              ))}
            </div>

            {visibleCount < places.length && (
              <div className="load-more-wrapper">
                <button
                  className="load-more-btn"
                  onClick={loadMore}
                >
                  Show {Math.min(PAGE_SIZE, places.length - visibleCount)} more
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
