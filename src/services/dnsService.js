// import axios from 'axios';

// const API_URL = 'http://localhost:3000/dns';

// const getAuthConfig = (token) => ({
//   headers: { Authorization: `Bearer ${token}` },
// });

// export const createDNSRecord = async (token, record) => {
//   const response = await axios.post(`${API_URL}/record`, record, getAuthConfig(token));
//   return response.data;
// };

// export const getDNSRecords = async (token) => {
//   const response = await axios.get(`${API_URL}/records`, getAuthConfig(token));
//   return response.data;
// };

// export const updateDNSRecord = async (token, record) => {
//   const response = await axios.put(`${API_URL}/record`, record, getAuthConfig(token));
//   return response.data;
// };

// export const deleteDNSRecord = async (token, record) => {
//   const response = await axios.delete(`${API_URL}/record`, {
//     ...getAuthConfig(token),
//     data: record,
//   });
//   return response.data;
// };

// export const bulkUploadDNSRecords = async (token, file) => {
//   const formData = new FormData();
//   formData.append('file', file);

//   const response = await axios.post(`${API_URL}/bulk-upload`, formData, getAuthConfig(token));
//   return response.data;
// };

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

// export const getDNSRecords = async (token, zoneId) => {
//   const response = await axios.get(`${API_URL}/records`, zoneId, getAuthConfig(token));
//   return response.data;
// };

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

// export const bulkUploadDNSRecords = async (token, formData) => {
//   //const response = await axios.post(`${API_URL}/bulk-upload`, formData, getAuthConfig(token));
//   const response = await axios.post(`${API_URL}/bulk-upload`, formData, {
//     ...getAuthConfig(token),
//     headers: {
//       ...getAuthConfig(token).headers,
//       'Content-Type': 'multipart/form-data',
//     },
//   });
//   return response.data;
// };

