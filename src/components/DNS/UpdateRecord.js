import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { updateDNSRecord } from '../../services/dnsService';
import useAuth from '../../hooks/useAuth';
import './CreateRecord.css';

const UpdateRecord = () => {
  const location = useLocation();
  const { zoneId, record } = location.state;
  const [formData, setFormData] = useState({
    Name: '',
    Type: '',
    TTL: 300,
    ResourceRecords: [{ Value: '' }],
  });
  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (record) {
      setFormData({
        Name: record.Name,
        Type: record.Type,
        TTL: record.TTL,
        ResourceRecords: record.ResourceRecords,
      });
    }
  }, [record]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'ResourceRecords') {
      setFormData({
        ...formData,
        ResourceRecords: [{ Value: value }],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    //   await axios.put(`${API_URL}/record`, formData, getAuthConfig(token));
    await updateDNSRecord(auth.token, zoneId, formData);
    navigate('/dns/list'); // Adjust the path as necessary
    } catch (error) {
      console.error('Error updating DNS record:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Update DNS Record</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Name
            <input
              type="text"
              name="Name"
              value={formData.Name}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Type
            <input
              type="text"
              name="Type"
              value={formData.Type}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            TTL
            <input
              type="number"
              name="TTL"
              value={formData.TTL}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Value
            <input
              type="text"
              name="ResourceRecords"
              value={formData.ResourceRecords[0].Value}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <button type="submit">Update Record</button>
      </form>
    </div>
  );
};

export default UpdateRecord;
