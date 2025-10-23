import { QueryClient } from '@tanstack/react-query';

const isDevelopment = import.meta.env.DEV;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // En desarrollo: datos frescos más frecuentemente
      staleTime: isDevelopment ? 1000 * 10 : 1000 * 60 * 5, // 10s vs 5min
      gcTime: 1000 * 60 * 10, // 10 minutos
      retry: isDevelopment ? 1 : 3, // Menos reintentos en dev
      refetchOnWindowFocus: !isDevelopment, // Solo en producción
      
      // Network-based configuration
      networkMode: 'online', // 'online' | 'always' | 'offlineFirst'
      
      // Error handling
      throwOnError: false, // Usar Error Boundaries
    },
    mutations: {
      retry: 1,
      networkMode: 'online',
    },
  },
});