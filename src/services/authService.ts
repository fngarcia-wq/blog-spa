import blogApi from '../api/blogApi';
import { handleApiError } from '../utils/errorHandler';
import type { 
  AuthResponse, 
  LoginCredentials, 
  RegisterData, 
  User
} from '../types/api';

export const authService = {
  /**
   * Verificar conexión con el servidor
   * GET /api/hello
   */
  hello: async (): Promise<{ message: string }> => {
    try {
      const response = await blogApi.get('/hello');
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Registrar nuevo usuario
   * POST /api/register
   */
  register: async (userData: RegisterData): Promise<AuthResponse> => {
    try {
      const response = await blogApi.post<AuthResponse>('/register', userData);

      // Guardar token automáticamente
      if (response.data.access_token) {
        localStorage.setItem('access_token', response.data.access_token);
      }

      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Iniciar sesión
   * POST /api/login
   */
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    try {
      const response = await blogApi.post<AuthResponse>('/login', credentials);

      // Guardar token
      if (response.data.access_token) {
        localStorage.setItem('access_token', response.data.access_token);
      }

      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Obtener información del usuario autenticado
   * GET /api/user
   */
  getCurrentUser: async (): Promise<User> => {
    try {
      const response = await blogApi.get<User>('/user');
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Cerrar sesión
   * GET /api/logout
   */
  logout: async (): Promise<{ message: string }> => {
    try {
      const response = await blogApi.get('/logout');
      return response.data;
    } finally {
      // Limpiar token siempre
      localStorage.removeItem('access_token');
    }
  },

  /**
   * Verificar si el usuario está autenticado
   */
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('access_token');
  },

  /**
   * Obtener token actual
   */
  getToken: (): string | null => {
    return localStorage.getItem('access_token');
  }
};
