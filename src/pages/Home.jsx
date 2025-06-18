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
        // Normalize names by stripping leading numbers and dots:
        const normalized = raw.map(p => ({
          ...p,
          name: p.name.replace(/^\s*\d+\.\s*/, '').trim(),
        }));

        // Filter out any entry whose name:
        //  • contains "bubbles"
        //  • starts with "Admission tickets"
        //  • matches a rating pattern like "4.4 of 5"
        //  • is too short or purely numeric/punctuation
        const filtered = normalized.filter(p => {
          const name = p.name;
          if (!name) return false;
          // drop if contains "bubbles"
          if (/bubbles/i.test(name)) return false;
          // drop if "Admission tickets"
          if (/^Admission tickets?/i.test(name)) return false;
          // drop if it looks like a rating "x.x of 5"
          if (/^\d+(\.\d+)? of 5\b/.test(name)) return false;
          // drop if it's mostly numbers/punctuation under 5 chars
          if (/^[\d\.\,\s-]{1,5}$/.test(name)) return false;
          return true;
        });

        setPlaces(filtered);
        setVisibleCount(PAGE_SIZE);
      })
      .catch(err => {
        console.error(err);
        setPlaces([]);
      })
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
          <p className="no-results">No places found.</p>
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
