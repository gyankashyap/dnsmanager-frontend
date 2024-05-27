import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:5000/dns/records', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRecords(response.data.ResourceRecordSets);
      } catch (error) {
        console.error('Error fetching records:', error);
        alert('Failed to fetch DNS records');
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (name, type) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete('/dns/record', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { name, type },
      });
      setRecords(records.filter(record => !(record.Name === name && record.Type === type)));
    } catch (error) {
      console.error('Error deleting record:', error);
      alert('Failed to delete DNS record');
    }
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>TTL</th>
            <th>Value</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={`${record.Name}-${record.Type}`}>
              <td>{record.Name}</td>
              <td>{record.Type}</td>
              <td>{record.TTL}</td>
              <td>{record.ResourceRecords.map(rr => rr.Value).join(', ')}</td>
              <td>
                <button onClick={() => handleDelete(record.Name, record.Type)}>Delete</button>
                {/* Add update functionality as needed */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
