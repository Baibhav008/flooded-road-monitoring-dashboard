import React, { useState } from 'react';
import data from '../Data/municipalData.json';
import axios from 'axios';

const Municipal = () => {
    const [search, setSearch] = useState('');

    const handleSearch = (event) => {
        setSearch(event.target.value);
    };

    const handleSendReminder = (ph, municipalOfficer, areaName, lastAlert, alertType) => {
        const phoneNumber = "+919025844030";
        const message = `
From: Municipal Monitoring
To: ${municipalOfficer}
This is to remind you that ${alertType} has occurred at ${areaName} on ${lastAlert}.
As per our records, no action has been taken.

We expect immediate action/response from your team towards the issue.
Thank you.`;
        axios.post('http://localhost:3001/send-sms', { phoneNumber, message })
            .then(response => {
                alert('Message sent successfully');
                console.log(response);
            })
            .catch(error => {
                alert('Error sending message: ' + error.message);
                console.log(error);
            });
    };

    const filteredData = data.filter((record) =>
        record.cityName.toLowerCase().includes(search.toLowerCase()) ||
        record.areaName.toLowerCase().includes(search.toLowerCase()) ||
        record.municipalOffice.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#000', color: '#fff' }}>
            <h1 style={{ color: '#ffcc00' }}>Municipal Alerts</h1>
            <input
                type="text"
                placeholder="Search by City, Area, or Municipal Office"
                value={search}
                onChange={handleSearch}
                style={{
                    padding: '10px',
                    marginBottom: '20px',
                    width: '300px',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                    backgroundColor: '#333',
                    color: '#fff',
                    fontSize: '16px'
                }}
            />
            <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                marginBottom: '20px',
                backgroundColor: '#000',
                color: '#fff'
            }}>
                <thead>
                    <tr style={{ backgroundColor: '#222' }}>
                        <th style={{ padding: '12px', border: '1px solid #444' }}>City Name</th>
                        <th style={{ padding: '12px', border: '1px solid #444' }}>Area Name</th>
                        <th style={{ padding: '12px', border: '1px solid #444' }}>Municipal Office</th>
                        <th style={{ padding: '12px', border: '1px solid #444' }}>Municipal Officer</th>
                        <th style={{ padding: '12px', border: '1px solid #444' }}>Phone Number</th>
                        <th style={{ padding: '12px', border: '1px solid #444' }}>Last Alert</th>
                        <th style={{ padding: '12px', border: '1px solid #444' }}>Alert Type</th>
                        <th style={{ padding: '12px', border: '1px solid #444' }}>Action Time</th>
                        <th style={{ padding: '12px', border: '1px solid #444' }}>Send Reminder</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((record, index) => (
                        <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#222' : '#333' }}>
                            <td style={{ padding: '12px', border: '1px solid #444' }}>{record.cityName}</td>
                            <td style={{ padding: '12px', border: '1px solid #444' }}>{record.areaName}</td>
                            <td style={{ padding: '12px', border: '1px solid #444' }}>{record.municipalOffice}</td>
                            <td style={{ padding: '12px', border: '1px solid #444' }}>{record.municipalOfficer}</td>
                            <td style={{ padding: '12px', border: '1px solid #444' }}>{record.phoneNo}</td>
                            <td style={{ padding: '12px', border: '1px solid #444' }}>{record.lastAlert}</td>
                            <td style={{ padding: '12px', border: '1px solid #444' }}>{record.alertType}</td>
                            <td style={{ padding: '12px', border: '1px solid #444' }}>{record.actionTime || 'N/A'}</td>
                            <td style={{ padding: '12px', border: '1px solid #444' }}>
                                {record.actionTime === '' && (
                                    <button
                                        onClick={() => handleSendReminder(record.phoneNo, record.municipalOfficer, record.areaName, record.lastAlert, record.alertType)}
                                        style={{
                                            backgroundColor: '#4CAF50',
                                            color: 'white',
                                            padding: '10px 20px',
                                            border: 'none',
                                            borderRadius: '5px',
                                            cursor: 'pointer',
                                            transition: 'background-color 0.3s ease',
                                            fontSize: '16px'
                                        }}
                                        onMouseOver={(e) => e.target.style.backgroundColor = '#45a049'}
                                        onMouseOut={(e) => e.target.style.backgroundColor = '#4CAF50'}
                                    >
                                        Send Reminder
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Municipal;
