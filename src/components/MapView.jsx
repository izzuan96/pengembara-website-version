import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import './MapView.css';

export default function MapView({ center, places, zoom = 10 }) {
  return (
    <MapContainer center={center} zoom={zoom} className="map-container">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {places.map(p => (
        <Marker key={p.id} position={[p.lat, p.lng]}>
          <Popup>
            <strong>{p.name}</strong><br />{p.location}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
