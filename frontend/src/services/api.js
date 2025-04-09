import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const athleteService = {
  getAll: async () => {
    const response = await apiClient.get('/athletes');
    return response.data;
  },
  getById: async (id) => {
    const response = await apiClient.get(`/athletes/${id}`);
    return response.data;
  },
  create: async (data) => {
    const response = await apiClient.post('/athletes', data);
    return response.data;
  },
  update: async (id, data) => {
    const response = await apiClient.put(`/athletes/${id}`, data);
    return response.data;
  },
  delete: async (id) => {
    const response = await apiClient.delete(`/athletes/${id}`);
    return response.data;
  },
  getByCategory: async (categoryId) => {
    const response = await apiClient.get(`/athletes/category/${categoryId}`);
    return response.data;
  }
};

export const competitionService = {
  getAll: async () => {
    const response = await apiClient.get('/competitions');
    return response.data;
  },
  getById: async (id) => {
    const response = await apiClient.get(`/competitions/${id}`);
    return response.data;
  },
  create: async (data) => {
    const response = await apiClient.post('/competitions', data);
    return response.data;
  },
  update: async (id, data) => {
    const response = await apiClient.put(`/competitions/${id}`, data);
    return response.data;
  },
  delete: async (id) => {
    const response = await apiClient.delete(`/competitions/${id}`);
    return response.data;
  }
};

export const timeService = {
  getAll: async () => {
    const response = await apiClient.get('/times');
    return response.data;
  },
  getById: async (id) => {
    const response = await apiClient.get(`/times/${id}`);
    return response.data;
  },
  create: async (data) => {
    const response = await apiClient.post('/times', data);
    return response.data;
  },
  update: async (id, data) => {
    const response = await apiClient.put(`/times/${id}`, data);
    return response.data;
  },
  delete: async (id) => {
    const response = await apiClient.delete(`/times/${id}`);
    return response.data;
  },
  getWinnersByCompetition: async (competitionId) => {
    const response = await apiClient.get(`/times/winners/${competitionId}`);
    return response.data;
  }
};

export const categoryService = {
  getAll: async () => {
    const response = await apiClient.get('/categories');
    return response.data;
  },
  getById: async (id) => {
    const response = await apiClient.get(`/categories/${id}`);
    return response.data;
  },
  create: async (data) => {
    const response = await apiClient.post('/categories', data);
    return response.data;
  },
  update: async (id, data) => {
    const response = await apiClient.put(`/categories/${id}`, data);
    return response.data;
  },
  delete: async (id) => {
    const response = await apiClient.delete(`/categories/${id}`);
    return response.data;
  }
};

export default apiClient;