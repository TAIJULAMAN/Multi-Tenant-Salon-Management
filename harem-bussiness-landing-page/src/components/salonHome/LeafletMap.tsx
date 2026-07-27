"use client";

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Fix for default marker icons
const icon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function LeafletMap() {
  const position: [number, number] = [40.7128, -74.0060]; // New York coords

  return (
    <MapContainer 
      center={position} 
      zoom={13} 
      scrollWheelZoom={true}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />
      <Marker position={position} icon={icon}>
        <Popup>
          <div className="font-manrope">
            <h4 className="font-bold">Harem Salon</h4>
            <p className="text-sm">New York, NY</p>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
}
