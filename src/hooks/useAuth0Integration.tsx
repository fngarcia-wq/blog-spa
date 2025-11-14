import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import type { User } from '../types/api';

/**
 * Hook personalizado que integra Auth0 con el backend Laravel
 * 
 * Este hook maneja:
 * - Obtener el token de Auth0
 * - Sincronizar el usuario con el backend
 * - Proporcionar información del usuario
 */
export function useAuth0Integration() {
  const {
    isAuthenticated,
    isLoading,
    user: auth0User,
    loginWithRedirect,
    logout: auth0Logout,
    getAccessTokenSilently,
  } = useAuth0();

  const [backendUser, setBackendUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Obtener el token de Auth0 cuando el usuario está autenticado
  useEffect(() => {
    const getToken = async () => {
      if (isAuthenticated) {
        try {
          const accessToken = await getAccessTokenSilently();
          setToken(accessToken);
          // Guardar en localStorage para uso en axios interceptors
          localStorage.setItem('auth0_token', accessToken);
        } catch (error) {
          console.error('Error obteniendo token:', error);
        }
      } else {
        setToken(null);
        localStorage.removeItem('auth0_token');
      }
    };

    getToken();
  }, [isAuthenticated, getAccessTokenSilently]);

  // Sincronizar usuario de Auth0 con el backend (opcional)
  useEffect(() => {
    const syncUserWithBackend = async () => {
      if (isAuthenticated && auth0User && token) {
        // Aquí puedes hacer una llamada al backend para sincronizar el usuario
        // Por ejemplo: POST /api/auth0/sync con el token de Auth0
        // El backend puede crear o actualizar el usuario en su base de datos
        
        // Por ahora, mapeamos el usuario de Auth0 a nuestro formato
        // Nota: En producción, deberías obtener el ID del backend después de sincronizar
        const mappedUser: User = {
          id: 0, // Temporal - el backend debe asignar el ID real
          name: auth0User.name || '',
          email: auth0User.email || '',
          email_verified_at: auth0User.email_verified ? new Date().toISOString() : null,
          created_at: auth0User.updated_at || new Date().toISOString(),
          updated_at: auth0User.updated_at || new Date().toISOString(),
        };
        
        setBackendUser(mappedUser);
      } else {
        setBackendUser(null);
      }
    };

    syncUserWithBackend();
  }, [isAuthenticated, auth0User, token]);

  const login = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: window.location.pathname,
      },
    });
  };

  const logout = () => {
    localStorage.removeItem('auth0_token');
    auth0Logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  return {
    isAuthenticated,
    isLoading,
    user: backendUser,
    auth0User,
    token,
    login,
    logout,
    getAccessTokenSilently,
  };
}
