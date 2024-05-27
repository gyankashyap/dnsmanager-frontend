import axios from 'axios';

const API_URL = `${process.env.API_URL}/dns`;

const getAuthConfig = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

export const createDNSRecord = async (token, zoneId , record) => {
  const response = await axios.post(`${API_URL}/record`, { zoneId, ...record }, getAuthConfig(token));
  return response.data;
};

export const getAllHostedZones = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/hosted-zones`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error fetching hosted zones and DNS records');
  }
};

export const getDNSRecords = async (token, zoneId) => {
  const response = await axios.get(`${API_URL}/records?zoneId=${zoneId}`, getAuthConfig(token));
  return response.data;
};


export const updateDNSRecord = async (token, zoneId, record) => {
  const response = await axios.put(`${API_URL}/record`, { zoneId, ...record }, getAuthConfig(token));
  return response.data;
};

export const deleteDNSRecord = async (token, zoneId, record) => {
  const response = await axios.delete(`${API_URL}/record`, {
    ...getAuthConfig(token),
    data: { zoneId, ...record },
  });
  return response.data;
};

export const bulkUploadDNSRecords = async (token, zoneId, formData) => {
  const config = {
    ...getAuthConfig(token),
    headers: {
      ...getAuthConfig(token).headers,
      'Content-Type': 'multipart/form-data',
    },
  };

  const response = await axios.post(`${API_URL}/bulk-upload?zoneId=${zoneId}`, formData, config);
  return response.data;
};
