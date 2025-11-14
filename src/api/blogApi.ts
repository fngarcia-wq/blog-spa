import axios from 'axios';

const blogApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:80/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request Interceptor - Agregar token automáticamente
blogApi.interceptors.request.use(
  (config) => {
    // Primero intentar con token de Auth0, luego con token legacy
    const auth0Token = localStorage.getItem('auth0_token');
    const legacyToken = localStorage.getItem('access_token');
    const token = auth0Token || legacyToken;
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Log en desarrollo
    if (import.meta.env.DEV) {
      console.log(`🚀 ${config.method?.toUpperCase()} ${config.url}`, config.data);
    }

    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response Interceptor - Manejo de errores global
blogApi.interceptors.response.use(
  (response) => {
    // Log en desarrollo
    if (import.meta.env.DEV) {
      console.log(`✅ ${response.status} ${response.config.url}`, response.data);
    }
    return response;
  },
  async (error) => {
    // Manejo de token expirado (401)
    if (error.response?.status === 401) {
      // Limpiar tokens y redirigir a home
      localStorage.removeItem('access_token');
      localStorage.removeItem('auth0_token');
      window.location.href = '/';
    }

    // Log de errores en desarrollo
    if (import.meta.env.DEV) {
      console.error('❌ Response Error:', {
        status: error.response?.status,
        data: error.response?.data,
        url: error.config?.url
      });
    }

    return Promise.reject(error);
  }
);

export default blogApi;
