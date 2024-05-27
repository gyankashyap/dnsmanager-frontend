
import React, { useEffect, useState } from 'react';
import { getAllHostedZones } from '../../services/dnsService';
import useAuth from '../../hooks/useAuth';
import './HostedZoneList.css';
import { useNavigate } from 'react-router-dom';
import HostedZone from './HostedZone';

const HostedZoneList = () => {
  const [zones, setZones] = useState([]);  
  const { auth } = useAuth();
  const navigate = useNavigate();

  const extractZoneId = (zoneId) => {
    return zoneId.split('/hostedzone/')[1];
  };

  useEffect(() => {
    const fetchHostedZones = async () => {
      try {
        const data = await getAllHostedZones(auth.token);
        setZones(data);
      } catch (err) {
        // setError('Failed to fetch hosted zones');
        console.error('Error:', err);
      }
    };

    fetchHostedZones();
  }, [auth.token]);
  

  return (
    <div className="hosted-zone-list">
      <h2>Hosted Zones</h2>
      {zones.map((zoneData) => (
        <HostedZone key={extractZoneId(zoneData.zone.Id)} zoneId={extractZoneId(zoneData.zone.Id)} zone={zoneData.zone} records={zoneData.records} />
      ))}
    </div>
  );
};

export default HostedZoneList;
