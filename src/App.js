// src/App.js
import React, { lazy, Suspense } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Navbar from './components/Navbar';
import PlaceModal from './components/PlaceModal';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Lazy‐loaded pages:
const Home        = lazy(() => import('./pages/Home'));
const PlaceDetail = lazy(() => import('./pages/PlaceDetail'));

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Suspense fallback={<div className="text-center my-5">Loading…</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/place/:id" element={<PlaceDetail />} />
        </Routes>
      </Suspense>
      <PlaceModal onClose={() => { /* handled inside PlaceDetail or Home */ }} />
    </BrowserRouter>
  );
}
