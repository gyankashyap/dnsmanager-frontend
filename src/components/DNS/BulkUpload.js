import React, { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router-dom';
import { bulkUploadDNSRecords } from '../../services/dnsService';
import './BulkUpload.css';

const BulkUpload = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();
  const { auth } = useAuth();
  const location = useLocation();
  const { zoneId } = location.state;  

  useEffect(() => {
    if (!zoneId) {
      alert('No Zone ID provided');
      navigate('/dns/list');
    }
  }, [zoneId, navigate]);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    console.log("handleFileChange");
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a CSV file to upload.');
      return;
    }
    console.log("Handle Upload 1", file);

    const formData = new FormData();
    formData.append('file', file);

    console.log("Handle Upload 2", formData);

    try {
      await bulkUploadDNSRecords(auth.token, zoneId, formData);
      alert('DNS records created successfully');
      navigate('/dns/list');
    } catch (err) {
      console.error('Error uploading file:', err);
      setError('Failed to upload file.');
      setSuccess(null);
    }
  };



  return (
    <div className="bulk-upload-container">
      <h1>Bulk Record Upload</h1>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
    </div>
  );
};

export default BulkUpload;

