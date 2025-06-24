import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import PlaceDetail from './pages/PlaceDetail';

export default function App() {
  return (
    <BrowserRouter basename="/pengembara">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/place/:id" element={<PlaceDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
