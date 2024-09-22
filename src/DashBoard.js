import React, { useState } from 'react';
import sampleData from './sampleData.json';
import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const DashBoard = () => {
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedLocality, setSelectedLocality] = useState('');
    const [showAll, setShowAll] = useState(false);

    const cities = Object.keys(sampleData);

    const handleCityChange = (e) => {
        setSelectedCity(e.target.value);
        setSelectedLocality('');
        setShowAll(false);
    };

    const handleLocalityChange = (e) => {
        setSelectedLocality(e.target.value);
        setShowAll(false);
    };

    const handleShowAll = () => {
        setShowAll(true);
        setSelectedLocality('');
    };

    const renderMarkers = (latArray, longArray, color) => {
        return latArray.map((lat, index) => (
            <Marker
                key={index}
                position={[lat, longArray[index]]}
                icon={L.divIcon({
                    className: 'custom-icon',
                    html: `<div style="background-color: ${color}; width: 10px; height: 10px; border-radius: 50%;"></div>`
                })}
            />
        ));
    };

    const renderPolyline = (latArray, longArray, color) => {
        const positions = latArray.map((lat, index) => [lat, longArray[index]]);
        return <Polyline positions={positions} color={color} />;
    };

    const ZoomControl = () => {
        const map = useMap();
        return (
            <div style={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)', zIndex: 1000 }}>
                <button onClick={() => map.zoomIn()} style={{ margin: '5px', padding: '10px', backgroundColor: '#333', color: '#fff', border: 'none', borderRadius: '5px' }}>Zoom In</button>
                <button onClick={() => map.zoomOut()} style={{ margin: '5px', padding: '10px', backgroundColor: '#333', color: '#fff', border: 'none', borderRadius: '5px' }}>Zoom Out</button>
            </div>
        );
    };

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f0f0f0', minHeight: '100vh', padding: '20px' }}>
            <nav style={{ backgroundColor: '#333', padding: '1rem', color: '#fff', borderRadius: '5px' }}>
                <h1 style={{ display: 'inline', marginRight: '2rem' }}>Smart Overflow and Flood Monitoring</h1>
                <a href="#dashboard" style={{ color: '#fff', marginRight: '1rem' }}>Dashboard</a>
                <a href="#historical" style={{ color: '#fff', marginRight: '1rem' }}>Historical Record</a>
                <a href="#map" style={{ color: '#fff' }}>Map</a>
            </nav>
            <div style={{ padding: '1rem', backgroundColor: '#fff', borderRadius: '5px', marginTop: '20px' }}>
                <label>
                    Select City:
                    <select
                        value={selectedCity}
                        onChange={handleCityChange}
                        style={{ marginLeft: '1rem', padding: '0.5rem', borderRadius: '5px', border: '1px solid #ccc' }}
                    >
                        <option value="">--Select City--</option>
                        {cities.map((city) => (
                            <option key={city} value={city}>{city}</option>
                        ))}
                    </select>
                </label>
                {selectedCity && (
                    <div style={{ marginTop: '1rem' }}>
                        <label>
                            Select Locality:
                            <select
                                value={selectedLocality}
                                onChange={handleLocalityChange}
                                style={{ marginLeft: '1rem', padding: '0.5rem', borderRadius: '5px', border: '1px solid #ccc' }}
                            >
                                <option value="">--Select Locality--</option>
                                {Object.keys(sampleData[selectedCity]).map((locality) => (
                                    <option key={locality} value={locality}>{locality}</option>
                                ))}
                            </select>
                            <button onClick={handleShowAll} style={{ marginLeft: '1rem', padding: '0.5rem', borderRadius: '5px', border: '1px solid #ccc' }}>
                                Show All
                            </button>
                        </label>
                    </div>
                )}
            </div>
            {selectedCity && (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
                    <MapContainer
                        center={[sampleData[selectedCity][selectedLocality]?.citylat || sampleData[selectedCity][Object.keys(sampleData[selectedCity])[0]].citylat, sampleData[selectedCity][selectedLocality]?.citylong || sampleData[selectedCity][Object.keys(sampleData[selectedCity])[0]].citylong]}
                        zoom={13}
                        style={{ height: '500px', width: '80%', borderRadius: '5px', border: '1px solid #ccc' }}
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        {showAll
                            ? Object.keys(sampleData[selectedCity]).flatMap(locality =>
                                [
                                    renderMarkers(sampleData[selectedCity][locality].redDotlat, sampleData[selectedCity][locality].redDotlong, 'red'),
                                    renderMarkers(sampleData[selectedCity][locality].yellowDotlat, sampleData[selectedCity][locality].yellowDotlong, 'yellow'),
                                    renderPolyline(sampleData[selectedCity][locality].floodlat, sampleData[selectedCity][locality].floodlong, 'blue')
                                ]
                            )
                            : selectedLocality && (
                                <>
                                    {renderMarkers(sampleData[selectedCity][selectedLocality].redDotlat, sampleData[selectedCity][selectedLocality].redDotlong, 'red')}
                                    {renderMarkers(sampleData[selectedCity][selectedLocality].yellowDotlat, sampleData[selectedCity][selectedLocality].yellowDotlong, 'yellow')}
                                    {renderPolyline(sampleData[selectedCity][selectedLocality].floodlat, sampleData[selectedCity][selectedLocality].floodlong, 'blue')}
                                </>
                            )}
                        <ZoomControl />
                    </MapContainer>
                    <div style={{ marginLeft: '20px', padding: '8px', backgroundColor: '#fff', borderRadius: '5px', border: '1px solid #ccc', width: '20%', textAlign: 'left' }}>
                        <h3 style={{ margin: '0 0 10px 0' }}>Legend</h3>
                        <p style={{ margin: '0' }}>
                            <span style={{ display: 'inline-block', width: '10px', height: '10px', backgroundColor: 'red', borderRadius: '50%', marginRight: '5px' }}></span>
                            Toxic Gas Accumulation
                        </p>
                        <p style={{ margin: '0' }}>
                            <span style={{ display: 'inline-block', width: '10px', height: '10px', backgroundColor: 'yellow', borderRadius: '50%', marginRight: '5px' }}></span>
                            Flammable Gas Accumulation
                        </p>
                        <p style={{ margin: '0' }}>
                            <span style={{ display: 'inline-block', width: '10px', height: '10px', backgroundColor: 'blue', marginRight: '5px' }}></span>
                            Flooded Road
                        </p>
                    </div>

                </div>
            )}
        </div>
    );
};

export default DashBoard;
