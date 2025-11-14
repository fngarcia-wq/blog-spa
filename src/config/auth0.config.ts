/**
 * Auth0 Configuration
 * 
 * Configuración centralizada para Auth0
 */

export const auth0Config = {
  domain: import.meta.env.VITE_AUTH0_DOMAIN || '',
  clientId: import.meta.env.VITE_AUTH0_CLIENT_ID || '',
  authorizationParams: {
    redirect_uri: import.meta.env.VITE_AUTH0_REDIRECT_URI || window.location.origin,
    // Audience es opcional - solo necesario si validas tokens en el backend
    ...(import.meta.env.VITE_AUTH0_AUDIENCE && {
      audience: import.meta.env.VITE_AUTH0_AUDIENCE,
    }),
  },
  // Configuración de caché para mejor rendimiento
  cacheLocation: 'localstorage' as const,
  // Usar refresh tokens para mantener la sesión
  useRefreshTokens: true,
};

// Validar que las variables requeridas estén configuradas
export const validateAuth0Config = (): boolean => {
  if (!auth0Config.domain) {
    console.error('VITE_AUTH0_DOMAIN no está configurado');
    return false;
  }
  if (!auth0Config.clientId) {
    console.error('VITE_AUTH0_CLIENT_ID no está configurado');
    return false;
  }
  return true;
};
