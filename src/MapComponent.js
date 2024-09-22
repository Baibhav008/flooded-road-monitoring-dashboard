// src/MapComponent.js
import React, { useRef, useState } from 'react';
import { MapContainer, TileLayer, Polyline, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { FaMapMarkerAlt } from 'react-icons/fa';

const blockedRoad = [
  [25.633097, 85.106084],
  [25.634788, 85.107112]
];

const blockedRoads = [
  [
    [25.633097, 85.106084],
    [25.634788, 85.107112]
  ],
  [
    [25.6149, 85.1363],
    [25.6157, 85.1395]
  ],
  [
    [25.6120, 85.1412],
    [25.6165, 85.1440]
  ],
  [
    [25.6165, 85.1348],
    [25.6177, 85.1365]
  ],
  [
    [25.6118, 85.1378],
    [25.6148, 85.1395]
  ],
  [
    [25.6135, 85.1400],
    [25.6185, 85.1430]
  ]
];

const prevRoute = [
  [25.632819, 85.105911],
  [25.636025, 85.107885]
];

const newRoute = [
  [25.632819, 85.105911],
  [25.633166, 85.105942],
  [25.633672, 85.104816],
  [25.634271, 85.103489],
  [25.635998, 85.104465],
  [25.634939, 85.107198],
  [25.636025, 85.107885]
];

const greenIcon = L.divIcon({
  html: `<div style="color: green; font-size: 24px;"><i class="fa fa-map-marker-alt"></i></div>`,
  className: 'custom-icon'
});

const redIcon = L.divIcon({
  html: `<div style="color: red; font-size: 24px;"><i class="fa fa-map-marker-alt"></i></div>`,
  className: 'custom-icon'
});

const MapComponent = () => {
  const mapRef = useRef();
  const [showPrevRoute, setShowPrevRoute] = useState(false);
  const [showBlockedRoad, setShowBlockedRoad] = useState(false);
  const [showNewRoute, setShowNewRoute] = useState(false);

  const handleZoomIn = () => {
    const map = mapRef.current;
    if (map) {
      map.setZoom(map.getZoom() + 1);
    }
  };

  const handleZoomOut = () => {
    const map = mapRef.current;
    if (map) {
      map.setZoom(map.getZoom() - 1);
    }
  };

  const handleGetRoute = () => {
    setShowPrevRoute(true);
    setShowBlockedRoad(false);
    setShowNewRoute(false);
  };

  const handleShowFloodedRoads = () => {
    setShowPrevRoute(false);
    setShowBlockedRoad(true);
    setShowNewRoute(true);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#f0f0f0' }}>
      <MapContainer center={[25.634567, 85.106980]} zoom={15} style={{ height: '400px', width: '800px', border: '2px solid #ccc', borderRadius: '8px' }} ref={mapRef}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {showBlockedRoad && blockedRoads.map((road, index) => (
          <Polyline key={index} positions={road} color="blue" />
        ))}
        {showPrevRoute && <Polyline positions={prevRoute} color="green" />}
        {showNewRoute && <Polyline positions={newRoute} color="green" />}
        <Marker position={[25.632819, 85.105911]} icon={greenIcon} />
        <Marker position={[25.636025, 85.107885]} icon={redIcon} />
      </MapContainer>
      <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
        <button style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px' }} onClick={handleZoomIn}>Zoom In</button>
        <button style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '4px' }} onClick={handleZoomOut}>Zoom Out</button>
        <button style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer', backgroundColor: '#2196F3', color: 'white', border: 'none', borderRadius: '4px' }} onClick={handleGetRoute}>Get Route</button>
        <button style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer', backgroundColor: '#FF9800', color: 'white', border: 'none', borderRadius: '4px' }} onClick={handleShowFloodedRoads}>Show Flooded Roads</button>
      </div>
    </div>
  );
};

export default MapComponent;
