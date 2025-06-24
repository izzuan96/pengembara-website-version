import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import './MapView.css';

export default function MapView({
  center = [3.1390, 101.6869],
  zoom = 10,
  places = []
}) {
  return (
    <div className="map-container">
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={false}
        style={{ height: '400px', width: '100%' }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {places.map(p =>
          p.lat && p.lng ? (
            <Marker
              key={p.id}
              position={[Number(p.lat), Number(p.lng)]}
            >
              <Popup>{p.name}</Popup>
            </Marker>
          ) : null
        )}
      </MapContainer>
    </div>
  );
}
