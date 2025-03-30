import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

// Configura axios para incluir el token en las peticiones
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  login: async (email, password) => {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });
    return response.data;
  },
  register: async (name, email, password) => {
    const response = await axios.post(`${API_URL}/auth/register`, { name, email, password });
    return response.data;
  },
};

export const athleteService = {
  getAll: async () => {
    const response = await axios.get(`${API_URL}/athletes`);
    return response.data;
  },
  create: async (athleteData) => {
    const response = await axios.post(`${API_URL}/athletes`, athleteData);
    return response.data;
  },
  update: async (id, athleteData) => {
    const response = await axios.put(`${API_URL}/athletes/${id}`, athleteData);
    return response.data;
  },
  delete: async (id) => {
    const response = await axios.delete(`${API_URL}/athletes/${id}`);
    return response.data;
  },
};

export const competitionService = {
  getAll: async () => {
    const response = await axios.get(`${API_URL}/competitions`);
    return response.data;
  },
  create: async (competitionData) => {
    const response = await axios.post(`${API_URL}/competitions`, competitionData);
    return response.data;
  },
  update: async (id, competitionData) => {
    const response = await axios.put(`${API_URL}/competitions/${id}`, competitionData);
    return response.data;
  },
  delete: async (id) => {
    const response = await axios.delete(`${API_URL}/competitions/${id}`);
    return response.data;
  },
};

export const timeService = {
  getAll: async () => {
    const response = await axios.get(`${API_URL}/times`);
    return response.data;
  },
  create: async (timeData) => {
    const response = await axios.post(`${API_URL}/times`, timeData);
    return response.data;
  },
  update: async (id, timeData) => {
    const response = await axios.put(`${API_URL}/times/${id}`, timeData);
    return response.data;
  },
  delete: async (id) => {
    const response = await axios.delete(`${API_URL}/times/${id}`);
    return response.data;
  },
};