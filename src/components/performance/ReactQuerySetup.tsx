import React from "react";
import "./ReactQuerySetup.css";

const ReactQuerySetup: React.FC = () => {
  return (
    <div className="react-query-setup">
      <div className="demo-header">
        <h2>🔧 React Query Setup</h2>
        <p>
          Configuración inicial de TanStack Query para gestión eficiente de
          datos
        </p>
      </div>

      {/* ¿Qué es React Query? */}
      <section className="what-is-section">
        <h3>🤔 ¿Qué es TanStack Query (React Query)?</h3>
        <div className="query-benefits">
          <div className="benefit-card">
            <div className="benefit-icon">📡</div>
            <h4>Data Fetching</h4>
            <p>Gestión inteligente de llamadas HTTP con cache automático</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">⚡</div>
            <h4>Cache Management</h4>
            <p>
              Cache automático con invalidación y sincronización inteligente
            </p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">🔄</div>
            <h4>Background Updates</h4>
            <p>Actualizaciones automáticas en segundo plano</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">🛠️</div>
            <h4>DevTools</h4>
            <p>Herramientas de desarrollo para debugging avanzado</p>
          </div>
        </div>
      </section>

      {/* Instalación */}
      <section className="installation-section">
        <h3>📦 Instalación</h3>
        <div className="install-commands">
          <div className="command-block">
            <h4>Con npm:</h4>
            <pre>
              <code>npm install @tanstack/react-query</code>
            </pre>
          </div>
          <div className="command-block">
            <h4>Con yarn:</h4>
            <pre>
              <code>yarn add @tanstack/react-query</code>
            </pre>
          </div>
          <div className="command-block">
            <h4>DevTools (opcional pero recomendado):</h4>
            <pre>
              <code>npm install @tanstack/react-query-devtools</code>
            </pre>
          </div>
        </div>
      </section>

      {/* Configuración Básica */}
      <section className="basic-setup">
        <h3>⚙️ Configuración Básica</h3>

        <div className="setup-steps">
          <div className="step-card">
            <div className="step-number">1</div>
            <div className="step-content">
              <h4>Crear el QueryClient</h4>
              <p>El QueryClient gestiona todas las consultas y cache</p>
              <pre>
                <code>{`// src/lib/queryClient.ts
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Datos válidos por 5 minutos
      staleTime: 1000 * 60 * 5,
      // Cache por 10 minutos
      gcTime: 1000 * 60 * 10,
      // Reintentar fallas hasta 3 veces
      retry: 3,
      // No refetch automático al hacer focus
      refetchOnWindowFocus: false,
    },
    mutations: {
      // Reintentar mutaciones fallidas
      retry: 1,
    },
  },
});`}</code>
              </pre>
            </div>
          </div>

          <div className="step-card">
            <div className="step-number">2</div>
            <div className="step-content">
              <h4>Configurar el Provider</h4>
              <p>Envolver la aplicación con QueryClientProvider</p>
              <pre>
                <code>{`// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from './lib/queryClient';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      {/* DevTools solo en desarrollo */}
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  </React.StrictMode>
);`}</code>
              </pre>
            </div>
          </div>

          <div className="step-card">
            <div className="step-number">3</div>
            <div className="step-content">
              <h4>Opcional: Error Boundary</h4>
              <p>Manejar errores globales de queries</p>
              <pre>
                <code>{`// src/components/QueryErrorBoundary.tsx
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="error-fallback">
      <h2>¡Oops! Algo salió mal</h2>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Intentar de nuevo</button>
    </div>
  );
}

export function QueryErrorBoundary({ children }) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onReset={reset}
        >
          {children}
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}`}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Configuración Avanzada */}
      <section className="advanced-config">
        <h3>🚀 Configuración Avanzada</h3>

        <div className="config-tabs">
          <div className="config-tab">
            <h4>🎯 Configuración por Entorno</h4>
            <pre>
              <code>{`// src/lib/queryClient.ts
import { QueryClient } from '@tanstack/react-query';

const isDevelopment = process.env.NODE_ENV === 'development';

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
  
  // Configuración del cache
  queryCache: new QueryCache({
    onError: (error, query) => {
      // Log errores globalmente
      console.error('Query Error:', error, query);
    },
  }),
  
  mutationCache: new MutationCache({
    onError: (error, variables, context, mutation) => {
      // Log errores de mutaciones
      console.error('Mutation Error:', error, mutation);
    },
  }),
});`}</code>
            </pre>
          </div>

          <div className="config-tab">
            <h4>🔧 Persistencia del Cache</h4>
            <pre>
              <code>{`// src/lib/queryPersister.ts
import { persistQueryClient } from '@tanstack/react-query-persist-client-core';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';

// Crear persister para localStorage
const localStoragePersister = createSyncStoragePersister({
  storage: window.localStorage,
  key: 'REACT_QUERY_OFFLINE_CACHE',
  throttleTime: 1000, // Guardar cada segundo máximo
});

// Configurar persistencia
export const setupQueryPersistence = (queryClient) => {
  persistQueryClient({
    queryClient,
    persister: localStoragePersister,
    maxAge: 1000 * 60 * 60 * 24, // 24 horas
    hydrateOptions: {
      // Configuraciones de hidratación
    },
    dehydrateOptions: {
      // Solo persistir consultas exitosas
      shouldDehydrateQuery: (query) => {
        const queryIsSuccessful = query.state.status === 'success';
        return queryIsSuccessful;
      },
    },
  });
};`}</code>
            </pre>
          </div>

          <div className="config-tab">
            <h4>🌐 Configuración de Network</h4>
            <pre>
              <code>{`// src/lib/networkConfig.ts
import { onlineManager, focusManager } from '@tanstack/react-query';

// Configurar detección de conexión
onlineManager.setEventListener((setOnline) => {
  return window.addEventListener('online', () => setOnline(true)) &&
         window.addEventListener('offline', () => setOnline(false));
});

// Configurar detección de focus
focusManager.setEventListener((handleFocus) => {
  // Solo refetch si la ventana ha estado oculta más de 5 segundos
  let hidden = false;
  let timeout: NodeJS.Timeout;
  
  const onVisibilityChange = () => {
    if (document.hidden) {
      hidden = true;
      timeout = setTimeout(() => {
        // Si sigue oculta después de 5s, marcamos para refetch
        if (document.hidden) {
          focusManager.setFocused(false);
        }
      }, 5000);
    } else {
      clearTimeout(timeout);
      if (hidden) {
        hidden = false;
        handleFocus();
      }
    }
  };
  
  document.addEventListener('visibilitychange', onVisibilityChange);
  
  return () => {
    document.removeEventListener('visibilitychange', onVisibilityChange);
  };
});`}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* DevTools */}
      <section className="devtools-section">
        <h3>🛠️ React Query DevTools</h3>
        <div className="devtools-info">
          <div className="devtools-features">
            <h4>🔍 Características de DevTools:</h4>
            <ul>
              <li>📊 Visualizar todas las queries activas</li>
              <li>🕐 Ver estados y tiempos de cache</li>
              <li>🔄 Forzar invalidaciones y refetch</li>
              <li>📈 Métricas de performance</li>
              <li>🐛 Debugging de errores</li>
            </ul>
          </div>

          <div className="devtools-usage">
            <h4>🚀 Cómo usar DevTools:</h4>
            <pre>
              <code>{`// Importar en desarrollo
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MyApp />
      
      {/* DevTools flotantes */}
      <ReactQueryDevtools 
        initialIsOpen={false}
        position="bottom-right"
        toggleButtonProps={{
          style: {
            marginLeft: '5px',
            transform: \`scale(.7)\`,
            transformOrigin: 'bottom right',
          }
        }}
      />
    </QueryClientProvider>
  );
}`}</code>
            </pre>
          </div>
        </div>

        <div className="devtools-tips">
          <h4>💡 Tips para DevTools:</h4>
          <div className="tips-grid">
            <div className="tip-card">
              <span className="tip-icon">🎯</span>
              <p>
                <strong>Query Inspector:</strong> Haz clic en cualquier query
                para ver detalles completos
              </p>
            </div>
            <div className="tip-card">
              <span className="tip-icon">🔄</span>
              <p>
                <strong>Manual Refetch:</strong> Usa los botones para probar
                refetch y invalidación
              </p>
            </div>
            <div className="tip-card">
              <span className="tip-icon">📊</span>
              <p>
                <strong>Performance:</strong> Monitorea fetch times y cache hits
              </p>
            </div>
            <div className="tip-card">
              <span className="tip-icon">🚫</span>
              <p>
                <strong>Producción:</strong> Las DevTools se excluyen
                automáticamente del build
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Siguiente Paso */}
      <section className="next-steps">
        <h3>🎯 Próximos Pasos</h3>
        <div className="next-steps-content">
          <p>
            Una vez configurado React Query, podrás usar <code>useQuery</code>{" "}
            para fetching de datos, <code>useMutation</code> para
            actualizaciones, y aprovechar todas las optimizaciones automáticas.
          </p>

          <div className="benefits-preview">
            <h4>🎉 Lo que obtienes automáticamente:</h4>
            <div className="benefits-list">
              <div className="benefit-item">
                <span className="benefit-check">✅</span>
                <span>Cache inteligente con invalidación automática</span>
              </div>
              <div className="benefit-item">
                <span className="benefit-check">✅</span>
                <span>Estados de loading, error y success manejados</span>
              </div>
              <div className="benefit-item">
                <span className="benefit-check">✅</span>
                <span>Refetch automático en focus y reconexión</span>
              </div>
              <div className="benefit-item">
                <span className="benefit-check">✅</span>
                <span>Optimistic updates y rollback automático</span>
              </div>
              <div className="benefit-item">
                <span className="benefit-check">✅</span>
                <span>Paginación y infinite queries sin esfuerzo</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ReactQuerySetup;
