import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';


ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const data = {
  "cities": [
    {
      "name": "Mumbai",
      "areas": [
        {
          "name": "Colaba",
          "coordinates": "18.9218° N, 72.8325° E",
          "lastUpdated": "2024-11-01",
          "municipalAuthority": "Mumbai Municipal Corporation",
          "officer": "Mr. Rajesh Kumar",
          "graphs": {
            "waterLevel": {
              "dates": ["2024-10-01", "2024-10-02", "2024-10-03", "2024-10-04", "2024-10-05", "2024-10-06", "2024-10-07"],
              "values": [15, 17, 16, 18, 20, 22, 25]
            },
            "toxicGasLevel": {
              "dates": ["2024-10-01", "2024-10-02", "2024-10-03", "2024-10-04", "2024-10-05", "2024-10-06", "2024-10-07"],
              "values": [6, 7, 8, 9, 10, 11, 12]
            },
            "flammableGasLevel": {
              "dates": ["2024-10-01", "2024-10-02", "2024-10-03", "2024-10-04", "2024-10-05", "2024-10-06", "2024-10-07"],
              "values": [2, 3, 4, 5, 6, 7, 8]
            }
          },
          "predictions": {
            "waterLevel": {
              "dates": ["2024-10-08", "2024-10-09", "2024-10-10", "2024-10-11", "2024-10-12"],
              "values": [26, 27, 28, 30, 32]
            },
            "toxicGasLevel": {
              "dates": ["2024-10-08", "2024-10-09", "2024-10-10", "2024-10-11", "2024-10-12"],
              "values": [13, 14, 15, 16, 17]
            },
            "flammableGasLevel": {
              "dates": ["2024-10-08", "2024-10-09", "2024-10-10", "2024-10-11", "2024-10-12"],
              "values": [9, 10, 11, 12, 13]
            }
          },
          "generalInsight": "Colaba is experiencing an increase in water levels and gas emissions. Measures are being taken to address the situation."
        },
        {
          "name": "Andheri",
          "coordinates": "19.0896° N, 72.8267° E",
          "lastUpdated": "2024-11-01",
          "municipalAuthority": "Mumbai Municipal Corporation",
          "officer": "Ms. Sunita Desai",
          "graphs": {
            "waterLevel": {
              "dates": ["2024-10-01", "2024-10-02", "2024-10-03", "2024-10-04", "2024-10-05", "2024-10-06", "2024-10-07"],
              "values": [10, 12, 11, 14, 13, 15, 16]
            },
            "toxicGasLevel": {
              "dates": ["2024-10-01", "2024-10-02", "2024-10-03", "2024-10-04", "2024-10-05", "2024-10-06", "2024-10-07"],
              "values": [4, 5, 6, 7, 8, 9, 10]
            },
            "flammableGasLevel": {
              "dates": ["2024-10-01", "2024-10-02", "2024-10-03", "2024-10-04", "2024-10-05", "2024-10-06", "2024-10-07"],
              "values": [3, 4, 5, 6, 7, 8, 9]
            }
          },
          "predictions": {
            "waterLevel": {
              "dates": ["2024-10-08", "2024-10-09", "2024-10-10", "2024-10-11", "2024-10-12"],
              "values": [17, 18, 19, 20, 21]
            },
            "toxicGasLevel": {
              "dates": ["2024-10-08", "2024-10-09", "2024-10-10", "2024-10-11", "2024-10-12"],
              "values": [11, 12, 13, 14, 15]
            },
            "flammableGasLevel": {
              "dates": ["2024-10-08", "2024-10-09", "2024-10-10", "2024-10-11", "2024-10-12"],
              "values": [10, 11, 12, 13, 14]
            }
          },
          "generalInsight": "Andheri is seeing gradual increases in water and gas levels, ongoing monitoring is recommended."
        }
      ]
    }
  ]
};

const GraphAndTable = () => {
  const [selectedCity, setSelectedCity] = useState("Mumbai");
  const [selectedArea, setSelectedArea] = useState("Colaba");

  const cityData = data.cities.find(city => city.name === selectedCity);
  const areaData = cityData?.areas.find(area => area.name === selectedArea);

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
    setSelectedArea(cityData.areas[0].name); // Default to first area when city changes
  };

  const handleAreaChange = (e) => {
    setSelectedArea(e.target.value);
  };

  // Format chart data
  const formatChartData = (graphData) => {
    return {
      labels: graphData.dates,
      datasets: [
        {
          label: `Level (in ${graphData === areaData.graphs.waterLevel ? 'cm' : 'PPM'})`,
          data: graphData.values,
          fill: false,
          borderColor: 'rgba(75,192,192,1)',  // Bright color for the line
          tension: 0.1
        }
      ]
    };
  };

  return (
    <div style={{ backgroundColor: '#333', color: 'white', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#ecf0f1', textAlign: 'center' }}>Environmental Data for Mumbai</h1>

      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <label htmlFor="city-select" style={{ marginRight: '10px', fontSize: '16px' }}>Select City: </label>
        <select id="city-select" onChange={handleCityChange} value={selectedCity} style={{ padding: '10px', fontSize: '16px', color: '#333' }}>
          {data.cities.map(city => (
            <option key={city.name} value={city.name} style={{ color: '#333' }}>{city.name}</option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <label htmlFor="area-select" style={{ marginRight: '10px', fontSize: '16px' }}>Select Area: </label>
        <select id="area-select" onChange={handleAreaChange} value={selectedArea} style={{ padding: '10px', fontSize: '16px', color: '#333' }}>
          {cityData?.areas.map(area => (
            <option key={area.name} value={area.name} style={{ color: '#333' }}>{area.name}</option>
          ))}
        </select>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap', marginBottom: '20px' }}>
        {/* Graphs */}
        <div style={{ width: '500px', height: '300px', overflow: 'auto', margin: '0 auto' }}>
          <h3 style={{ textAlign: 'center' }}>Water Level (in cm)</h3>
          <div style={{ width: '100%', height: '100%', overflow: 'auto' }}>
            <Line data={formatChartData(areaData.graphs.waterLevel)} options={{
              responsive: true,
              maintainAspectRatio: false,
              elements: {
                point: {
                  radius: 5,
                  backgroundColor: 'rgba(75, 192, 192, 1)'
                }
              },
              plugins: {
                legend: { position: 'top', labels: { color: '#fff' } },
                tooltip: {
                  backgroundColor: '#000',
                  titleColor: '#fff',
                  bodyColor: '#fff'
                }
              },
              scales: {
                x: { ticks: { color: '#fff' }, grid: { color: 'rgba(255, 255, 255, 0.1)' } },
                y: { ticks: { color: '#fff' }, grid: { color: 'rgba(255, 255, 255, 0.1)' } }
              }
            }} height={200} width={500} />
          </div>
        </div>

        <div style={{ width: '500px', height: '300px', overflow: 'auto', margin: '0 auto' }}>
          <h3 style={{ textAlign: 'center' }}>Toxic Gas Level (in PPM)</h3>
          <div style={{ width: '100%', height: '100%', overflow: 'auto' }}>
            <Line data={formatChartData(areaData.graphs.toxicGasLevel)} options={{
              responsive: true,
              maintainAspectRatio: false,
              elements: { point: { radius: 5, backgroundColor: 'rgba(255, 99, 132, 1)' } },
              plugins: {
                legend: { position: 'top', labels: { color: '#fff' } },
                tooltip: { backgroundColor: '#000', titleColor: '#fff', bodyColor: '#fff' }
              },
              scales: {
                x: { ticks: { color: '#fff' }, grid: { color: 'rgba(255, 255, 255, 0.1)' } },
                y: { ticks: { color: '#fff' }, grid: { color: 'rgba(255, 255, 255, 0.1)' } }
              }
            }} height={200} width={500} />
          </div>
        </div>

        <div style={{ width: '500px', height: '300px', overflow: 'auto', margin: '0 auto' }}>
          <h3 style={{ textAlign: 'center' }}>Flammable Gas Level (in PPM)</h3>
          <div style={{ width: '100%', height: '100%', overflow: 'auto' }}>
            <Line data={formatChartData(areaData.graphs.flammableGasLevel)} options={{
              responsive: true,
              maintainAspectRatio: false,
              elements: { point: { radius: 5, backgroundColor: 'rgba(255, 159, 64, 1)' } },
              plugins: {
                legend: { position: 'top', labels: { color: '#fff' } },
                tooltip: { backgroundColor: '#000', titleColor: '#fff', bodyColor: '#fff' }
              },
              scales: {
                x: { ticks: { color: '#fff' }, grid: { color: 'rgba(255, 255, 255, 0.1)' } },
                y: { ticks: { color: '#fff' }, grid: { color: 'rgba(255, 255, 255, 0.1)' } }
              }
            }} height={200} width={500} />
          </div>
        </div>
      </div>

      {/* Tables and Insights */}
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ textAlign: 'center' }}>Tables</h2>
        {/* Water Level Table */}
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ textAlign: 'center' }}>Water Level Data (in cm)</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid #ddd', padding: '8px', color: 'white' }}>Date</th>
                <th style={{ border: '1px solid #ddd', padding: '8px', color: 'white' }}>Level (cm)</th>
                <th style={{ border: '1px solid #ddd', padding: '8px', color: 'white' }}>Predicted Level (cm)</th>
              </tr>
            </thead>
            <tbody>
              {areaData.graphs.waterLevel.dates.map((date, index) => (
                <tr key={date}>
                  <td style={{ border: '1px solid #ddd', padding: '8px', color: 'white' }}>{date}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px', color: 'white' }}>{areaData.graphs.waterLevel.values[index]}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px', color: 'white' }}>{areaData.predictions.waterLevel.values[index]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Toxic Gas Level Table */}
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ textAlign: 'center' }}>Toxic Gas Level Data (in PPM)</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid #ddd', padding: '8px', color: 'white' }}>Date</th>
                <th style={{ border: '1px solid #ddd', padding: '8px', color: 'white' }}>Level (PPM)</th>
                <th style={{ border: '1px solid #ddd', padding: '8px', color: 'white' }}>Predicted Level (PPM)</th>
              </tr>
            </thead>
            <tbody>
              {areaData.graphs.toxicGasLevel.dates.map((date, index) => (
                <tr key={date}>
                  <td style={{ border: '1px solid #ddd', padding: '8px', color: 'white' }}>{date}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px', color: 'white' }}>{areaData.graphs.toxicGasLevel.values[index]}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px', color: 'white' }}>{areaData.predictions.toxicGasLevel.values[index]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Flammable Gas Level Table */}
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ textAlign: 'center' }}>Flammable Gas Level Data (in PPM)</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid #ddd', padding: '8px', color: 'white' }}>Date</th>
                <th style={{ border: '1px solid #ddd', padding: '8px', color: 'white' }}>Level (PPM)</th>
                <th style={{ border: '1px solid #ddd', padding: '8px', color: 'white' }}>Predicted Level (PPM)</th>
              </tr>
            </thead>
            <tbody>
              {areaData.graphs.flammableGasLevel.dates.map((date, index) => (
                <tr key={date}>
                  <td style={{ border: '1px solid #ddd', padding: '8px', color: 'white' }}>{date}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px', color: 'white' }}>{areaData.graphs.flammableGasLevel.values[index]}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px', color: 'white' }}>{areaData.predictions.flammableGasLevel.values[index]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h2 style={{ textAlign: 'center' }}>General Insight</h2>
        <p>{areaData.generalInsight}</p>
      </div>
    </div>
  );
};

export default GraphAndTable;
