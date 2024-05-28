import axios from 'axios';

const API_URL = `https://dnsmanager-backend-ri0o.onrender.com/auth`;

export const login = async (username, password) => {
  const response = await axios.post(`${API_URL}/login`, { username, password });
  return response.data;
};

export const signup = async (username, password) => {
  const response = await axios.post(`${API_URL}/signup`, { username, password });
  return response.data;
};
