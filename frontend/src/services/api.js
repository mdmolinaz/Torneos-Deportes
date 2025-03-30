import axios from 'axios';

// Configuración base de axios
const API_URL = 'http://localhost:3000/api';

// Crear instancia de axios para mejor control
const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000, // 10 segundos de timeout
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Interceptor para agregar token a las peticiones
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Interceptor para manejar errores globalmente
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Manejo de errores HTTP
    if (error.response) {
      const { status } = error.response;
      
      if (status === 401) {
        // Token inválido o expirado - redirigir a login
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      } else if (status === 403) {
        // Acceso prohibido
        return Promise.reject(new Error('No tienes permisos para acceder a este recurso'));
      } else if (status === 404) {
        // Recurso no encontrado
        return Promise.reject(new Error('Recurso no encontrado'));
      } else if (status >= 500) {
        // Error del servidor
        return Promise.reject(new Error('Error en el servidor. Por favor, inténtalo más tarde'));
      }
    } else if (error.request) {
      // La petición fue hecha pero no hubo respuesta
      return Promise.reject(new Error('No se recibió respuesta del servidor'));
    } else {
      // Error al configurar la petición
      return Promise.reject(new Error('Error al configurar la petición'));
    }
    
    return Promise.reject(error);
  }
);

// Servicio de autenticación
export const authService = {
  login: async (email, password) => {
    try {
      const response = await apiClient.post('/auth/login', { email, password });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Credenciales inválidas');
    }
  },
  
  register: async (name, email, password) => {
    try {
      const response = await apiClient.post('/auth/register', { name, email, password });
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.error || 
                          (error.response?.status === 409 ? 'El email ya está registrado' : 'Error al registrar usuario');
      throw new Error(errorMessage);
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
};

// Servicio de atletas
export const athleteService = {
  getAll: async () => {
    try {
      const response = await apiClient.get('/athletes');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Error al obtener atletas');
    }
  },
  
  getById: async (id) => {
    try {
      const response = await apiClient.get(`/athletes/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Error al obtener el atleta');
    }
  },
  
  create: async (athleteData) => {
    try {
      const response = await apiClient.post('/athletes', athleteData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Error al crear atleta');
    }
  },
  
  update: async (id, athleteData) => {
    try {
      const response = await apiClient.put(`/athletes/${id}`, athleteData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Error al actualizar atleta');
    }
  },
  
  delete: async (id) => {
    try {
      const response = await apiClient.delete(`/athletes/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Error al eliminar atleta');
    }
  },

  search: async (query) => {
    try {
      const response = await apiClient.get('/athletes/search', { params: { q: query } });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Error al buscar atletas');
    }
  }
};

// Servicio de competencias
export const competitionService = {
  getAll: async () => {
    try {
      const response = await apiClient.get('/competitions');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Error al obtener competencias');
    }
  },
  
  getById: async (id) => {
    try {
      const response = await apiClient.get(`/competitions/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Error al obtener la competencia');
    }
  },
  
  create: async (competitionData) => {
    try {
      const response = await apiClient.post('/competitions', competitionData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Error al crear competencia');
    }
  },
  
  update: async (id, competitionData) => {
    try {
      const response = await apiClient.put(`/competitions/${id}`, competitionData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Error al actualizar competencia');
    }
  },
  
  delete: async (id) => {
    try {
      const response = await apiClient.delete(`/competitions/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Error al eliminar competencia');
    }
  },

  getUpcoming: async () => {
    try {
      const response = await apiClient.get('/competitions/upcoming');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Error al obtener próximas competencias');
    }
  }
};

// Servicio de tiempos/resultados
export const timeService = {
  getAll: async () => {
    try {
      const response = await apiClient.get('/times');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Error al obtener tiempos');
    }
  },
  
  getById: async (id) => {
    try {
      const response = await apiClient.get(`/times/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Error al obtener el tiempo');
    }
  },
  
  create: async (timeData) => {
    try {
      const response = await apiClient.post('/times', timeData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Error al registrar tiempo');
    }
  },
  
  update: async (id, timeData) => {
    try {
      const response = await apiClient.put(`/times/${id}`, timeData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Error al actualizar tiempo');
    }
  },
  
  delete: async (id) => {
    try {
      const response = await apiClient.delete(`/times/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Error al eliminar tiempo');
    }
  },

  getByCompetition: async (competitionId) => {
    try {
      const response = await apiClient.get(`/times/competition/${competitionId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Error al obtener tiempos de la competencia');
    }
  },

  getByAthlete: async (athleteId) => {
    try {
      const response = await apiClient.get(`/times/athlete/${athleteId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Error al obtener tiempos del atleta');
    }
  }
};

// Servicio de categorías (añadido)
export const categoryService = {
  getAll: async () => {
    try {
      const response = await apiClient.get('/categories');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Error al obtener categorías');
    }
  },
  
  getById: async (id) => {
    try {
      const response = await apiClient.get(`/categories/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Error al obtener la categoría');
    }
  }
};

// Exportar el cliente por si se necesita acceso directo
export default apiClient;