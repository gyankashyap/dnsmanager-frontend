import React, { useState, useEffect } from 'react';
import { createDNSRecord } from '../../services/dnsService';
import useAuth from '../../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router-dom';
import './CreateRecord.css';

const CreateRecord = () => {

  const location = useLocation();
  const { zoneId } = location.state;

  const { auth } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Name: '',
    Type: 'A',
    TTL: 300,
    ResourceRecords: [{ Value: '' }],
  });

  useEffect(() => {
    if (!zoneId) {
      alert('No Zone ID provided');
      navigate('/dns/list');
    }
  }, [zoneId, navigate]);

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
      console.log(formData);
      await createDNSRecord(auth.token, zoneId, formData);
      alert('DNS record created successfully');
      navigate('/dns/list');
    } catch (error) {
      alert('Error creating DNS record');
    }
  };


  return (
    <div className="form-container">
      <h2>Create DNS Record</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            name="Name"
            type="text"
            value={formData.Name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Type</label>
          <select name="Type" value={formData.Type} onChange={handleChange}>
            <option value="A">A</option>
            <option value="AAAA">AAAA</option>
            <option value="CNAME">CNAME</option>
          </select>
        </div>
        <div>
          <label>TTL</label>
          <input
            name="TTL"
            type="number"
            value={formData.TTL}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Value</label>
          <input
            name="ResourceRecords"
            type="text"
            value={formData.ResourceRecords[0].Value}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>    
  );
};

export default CreateRecord;


