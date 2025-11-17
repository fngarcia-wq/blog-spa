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
  const audience = import.meta.env.VITE_AUTH0_AUDIENCE as string | undefined;
  const defaultScope = (import.meta.env.VITE_AUTH0_SCOPE as string | undefined) || undefined;

  // Obtener el token de Auth0 cuando el usuario está autenticado
  useEffect(() => {
    const getToken = async () => {
      if (isAuthenticated) {
        try {
          const accessToken = await getAccessTokenSilently(
            audience
              ? { authorizationParams: { audience, ...(defaultScope ? { scope: defaultScope } : {}) } }
              : undefined
          );
          setToken(accessToken);
          // Guardar en localStorage para uso en axios interceptors
          localStorage.setItem('auth0_token', accessToken);
          // Imprimir token en consola tras login/refresh
          try {
            console.log('[Auth0] ✅ Token obtenido exitosamente');
            console.log('[Auth0] Audience configurado:', audience || '(sin audience)');
            console.log('[Auth0] Token segments:', accessToken.split('.').length, '(debe ser 3 para JWT válido)');
            console.log('[Auth0] Access Token:', accessToken);
            console.log('[Auth0] Bearer (copia y pega en curl):');
            console.log(`Bearer ${accessToken}`);
            
            // Decodificar payload para debug (sin validar firma)
            if (accessToken.split('.').length === 3) {
              try {
                const payload = JSON.parse(atob(accessToken.split('.')[1]));
                console.log('[Auth0] Token Payload:', payload);
                console.log('[Auth0] Token Audience (aud):', payload.aud);
                console.log('[Auth0] Token Expires:', new Date(payload.exp * 1000).toLocaleString());
              } catch {}
            }
          } catch {}
        } catch (error: any) {
          console.error('Error obteniendo token:', error);
          
          // Si falta el refresh token o hay error de audience, hacer logout
          if (error?.error === 'missing_refresh_token' || 
              error?.message?.includes('Missing Refresh Token') ||
              error?.message?.includes('invalid_grant')) {
            console.warn('[Auth0] Token inválido o expirado. Limpiando sesión...');
            localStorage.removeItem('auth0_token');
            // Opcionalmente, redirigir al login
            // auth0Logout({ logoutParams: { returnTo: window.location.origin } });
          }
        }
      } else {
        setToken(null);
        localStorage.removeItem('auth0_token');
      }
    };

    getToken();
  }, [isAuthenticated, getAccessTokenSilently, audience, defaultScope]);

  // Utilidades de desarrollo: exponer helpers en window para obtener/inspeccionar token
  useEffect(() => {
    if (import.meta.env.DEV) {
      (window as any).auth0Token = token;
      (window as any).printAuth0Token = async () => {
        try {
          const t = await getAccessTokenSilently(
            audience
              ? { authorizationParams: { audience, ...(defaultScope ? { scope: defaultScope } : {}) } }
              : undefined
          );
          console.log('[Auth0] Bearer (copia y pega en curl):');
          console.log(`Bearer ${t}`);
          return t;
        } catch (e) {
          console.error('No se pudo obtener token con getAccessTokenSilently:', e);
          throw e;
        }
      };
      (window as any).auth0ClearCache = () => {
        localStorage.clear();
        sessionStorage.clear();
        console.log('[Auth0] Caché limpiada. Recarga la página.');
      };
    }
  }, [token, getAccessTokenSilently, audience, defaultScope]);

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
    localStorage.removeItem('access_token');
    auth0Logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  // Función para forzar re-login (útil cuando cambia el audience)
  const forceRelogin = async () => {
    console.log('[Auth0] Forzando re-login para actualizar tokens...');
    await logout();
    // Pequeño delay para asegurar limpieza
    setTimeout(() => {
      login();
    }, 500);
  };

  return {
    isAuthenticated,
    isLoading,
    user: backendUser,
    auth0User,
    token,
    login,
    logout,
    forceRelogin,
    getAccessTokenSilently,
  };
}
