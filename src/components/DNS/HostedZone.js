import React, { useState } from "react";
import { deleteDNSRecord } from "../../services/dnsService";
import useAuth from "../../hooks/useAuth";
import "./HostedZone.css";
import { useNavigate } from "react-router-dom";

const HostedZone = ({ zoneId, zone, records }) => {
  const { auth } = useAuth();
  const navigate = useNavigate();

  const [newRecords, setNewRecords] = useState(records);

  const handleDelete = async (zoneId, record) => {
    try {
      await deleteDNSRecord(auth.token, zoneId, record);
      setNewRecords(
        records.filter((r) => r.Name !== record.Name || r.Type !== record.Type)
      );
      alert(
        `Record ${record.Name} of type ${record.Type} deleted successfully.`
      );
    } catch (error) {
      console.error("Error deleting DNS record:", error);
    }
  };

  const handleUpdate = (zoneId, record) => {
    navigate("/dns/update", { state: { zoneId, record } });
  };

  const handleCreate = (zoneId) => {
    navigate("/dns/create", { state: { zoneId } });
  };

  const handleBulkUpload = (zoneId) => {
    navigate("/dns/bulk-upload", { state: { zoneId } });
  };

  return (
    <div className="hosted-zone">
      <h2>{zone.Name}</h2>
      <div className="actions">
        <button onClick={() => handleCreate(zoneId)}>Upload Record</button>
        <button onClick={() => handleBulkUpload(zoneId)}>
          Bulk Upload Records
        </button>
      </div>
      <div className="table-container">
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
            {newRecords.map((record) => (
              <tr key={`${record.Name}-${record.Type}`}>
                <td>{record.Name}</td>
                <td>{record.Type}</td>
                <td>{record.TTL}</td>
                <td>{record.ResourceRecords.map((r) => r.Value).join(", ")}</td>
                <td>
                  <button
                    className="update-btn"
                    onClick={() => handleUpdate(zoneId, record)}
                  >
                    Update
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(zoneId, record)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HostedZone;
