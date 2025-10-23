import React, { useState, lazy, Suspense } from "react";
import "./CodeSplittingDemo.css";

// Componentes para mostrar diferentes estrategias
const LazyComponent1 = lazy(
  () => import(/* webpackChunkName: "feature-a" */ "./demo-chunks/FeatureA")
);

const LazyComponent2 = lazy(
  () => import(/* webpackChunkName: "feature-b" */ "./demo-chunks/FeatureB")
);

const LazyComponent3 = lazy(
  () => import(/* webpackChunkName: "admin-panel" */ "./demo-chunks/AdminPanel")
);

const CodeSplittingDemo: React.FC = () => {
  const [activeStrategy, setActiveStrategy] = useState<string>("");
  const [loadedChunks, setLoadedChunks] = useState<Set<string>>(new Set());

  const handleStrategyClick = (strategy: string) => {
    setActiveStrategy(strategy);
    setLoadedChunks((prev) => new Set([...prev, strategy]));
  };

  return (
    <div className="code-splitting-demo">
      <div className="demo-header">
        <h2>📦 Code Splitting</h2>
        <p>Estrategias para dividir tu bundle en chunks más pequeños</p>
      </div>

      {/* Explicación Conceptual */}
      <section className="concept-section">
        <h3>🎯 ¿Qué es Code Splitting?</h3>
        <div className="concept-grid">
          <div className="concept-card">
            <div className="concept-icon">📦</div>
            <h4>Bundle Splitting</h4>
            <p>
              Divide tu aplicación en múltiples archivos JavaScript más pequeños
            </p>
          </div>
          <div className="concept-card">
            <div className="concept-icon">🚀</div>
            <h4>Carga Incremental</h4>
            <p>Carga solo el código que necesitas en cada momento</p>
          </div>
          <div className="concept-card">
            <div className="concept-icon">⚡</div>
            <h4>Performance Mejorado</h4>
            <p>Tiempo de carga inicial más rápido y mejor cache</p>
          </div>
        </div>
      </section>

      {/* Análisis de Bundle */}
      <section className="bundle-analysis">
        <h3>📊 Análisis de Bundle</h3>
        <div className="bundle-comparison">
          <div className="bundle-card before">
            <h4>❌ Sin Code Splitting</h4>
            <div className="bundle-visual">
              <div className="bundle-chunk single">
                <span className="chunk-name">main.js</span>
                <span className="chunk-size">2.8MB</span>
              </div>
            </div>
            <div className="bundle-stats">
              <div className="stat-item">
                <span>Tiempo de carga inicial:</span>
                <span className="stat-bad">8-12s</span>
              </div>
              <div className="stat-item">
                <span>Cache efficiency:</span>
                <span className="stat-bad">Baja</span>
              </div>
            </div>
          </div>

          <div className="bundle-card after">
            <h4>✅ Con Code Splitting</h4>
            <div className="bundle-visual">
              <div className="bundle-chunk main">
                <span className="chunk-name">main.js</span>
                <span className="chunk-size">180KB</span>
              </div>
              <div className="bundle-chunk feature">
                <span className="chunk-name">feature-a.js</span>
                <span className="chunk-size">120KB</span>
              </div>
              <div className="bundle-chunk feature">
                <span className="chunk-name">feature-b.js</span>
                <span className="chunk-size">95KB</span>
              </div>
              <div className="bundle-chunk admin">
                <span className="chunk-name">admin.js</span>
                <span className="chunk-size">200KB</span>
              </div>
            </div>
            <div className="bundle-stats">
              <div className="stat-item">
                <span>Tiempo de carga inicial:</span>
                <span className="stat-good">1-2s</span>
              </div>
              <div className="stat-item">
                <span>Cache efficiency:</span>
                <span className="stat-good">Alta</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Interactivo */}
      <section className="interactive-demo">
        <h3>💡 Demo Interactivo</h3>
        <p>Haz clic en las estrategias para ver code splitting en acción:</p>

        <div className="strategy-buttons">
          <button
            className={`strategy-btn ${
              activeStrategy === "route-based" ? "active" : ""
            }`}
            onClick={() => handleStrategyClick("route-based")}
          >
            🛤️ Route-based Splitting
            {loadedChunks.has("route-based") && (
              <span className="loaded-indicator">✅ Cargado</span>
            )}
          </button>

          <button
            className={`strategy-btn ${
              activeStrategy === "feature-based" ? "active" : ""
            }`}
            onClick={() => handleStrategyClick("feature-based")}
          >
            🎯 Feature-based Splitting
            {loadedChunks.has("feature-based") && (
              <span className="loaded-indicator">✅ Cargado</span>
            )}
          </button>

          <button
            className={`strategy-btn ${
              activeStrategy === "conditional" ? "active" : ""
            }`}
            onClick={() => handleStrategyClick("conditional")}
          >
            🔐 Conditional Loading
            {loadedChunks.has("conditional") && (
              <span className="loaded-indicator">✅ Cargado</span>
            )}
          </button>
        </div>

        <div className="demo-content">
          {activeStrategy === "route-based" && (
            <Suspense
              fallback={
                <div className="loading">Cargando Route Component...</div>
              }
            >
              <LazyComponent1 />
            </Suspense>
          )}

          {activeStrategy === "feature-based" && (
            <Suspense
              fallback={
                <div className="loading">Cargando Feature Component...</div>
              }
            >
              <LazyComponent2 />
            </Suspense>
          )}

          {activeStrategy === "conditional" && (
            <Suspense
              fallback={<div className="loading">Cargando Admin Panel...</div>}
            >
              <LazyComponent3 />
            </Suspense>
          )}

          {!activeStrategy && (
            <div className="placeholder">
              <p>
                👆 Selecciona una estrategia para ver code splitting en acción
              </p>
              <div className="network-info">
                <p>
                  💡 <strong>Tip:</strong> Abre las DevTools → Network para ver
                  los chunks cargándose dinámicamente
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Estrategias de Code Splitting */}
      <section className="strategies-section">
        <h3>🛠️ Estrategias de Implementación</h3>

        <div className="strategy-grid">
          <div className="strategy-card">
            <h4>🛤️ Route-based Splitting</h4>
            <p>División por rutas - la más común y efectiva</p>
            <pre>
              <code>{`// Router con lazy loading
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Cada ruta es un chunk separado
const HomePage = lazy(() => import('./pages/Home'));
const AboutPage = lazy(() => import('./pages/About'));
const ContactPage = lazy(() => import('./pages/Contact'));
const AdminPage = lazy(() => import('./pages/Admin'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

// Resultado: 4 chunks separados
// ✅ main.js (router + layout)
// ✅ home.js (solo cuando visitas /)
// ✅ about.js (solo cuando visitas /about)
// ✅ admin.js (solo cuando visitas /admin)`}</code>
            </pre>
          </div>

          <div className="strategy-card">
            <h4>🎯 Feature-based Splitting</h4>
            <p>División por funcionalidades específicas</p>
            <pre>
              <code>{`// Split por features grandes
const ChatWidget = lazy(() => 
  import(/* webpackChunkName: "chat" */ './features/Chat')
);

const DataVisualization = lazy(() => 
  import(/* webpackChunkName: "charts" */ './features/Charts')
);

const VideoPlayer = lazy(() => 
  import(/* webpackChunkName: "video" */ './features/VideoPlayer')
);

function Dashboard({ activeFeature }) {
  return (
    <div>
      <Suspense fallback={<FeatureLoader />}>
        {activeFeature === 'chat' && <ChatWidget />}
        {activeFeature === 'charts' && <DataVisualization />}
        {activeFeature === 'video' && <VideoPlayer />}
      </Suspense>
    </div>
  );
}

// Ventajas:
// ✅ Features pesadas no bloquean la carga inicial
// ✅ Mejor cache (chart library no se recarga si chat cambia)
// ✅ Desarrollo modular`}</code>
            </pre>
          </div>

          <div className="strategy-card">
            <h4>🔐 Conditional Splitting</h4>
            <p>Carga basada en permisos o condiciones</p>
            <pre>
              <code>{`// Split condicional por roles
const AdminPanel = lazy(() => 
  import(/* webpackChunkName: "admin" */ './admin/AdminPanel')
);

const UserDashboard = lazy(() => 
  import(/* webpackChunkName: "user" */ './user/Dashboard')
);

const ModeratorTools = lazy(() => 
  import(/* webpackChunkName: "moderator" */ './moderator/Tools')
);

function App({ user }) {
  return (
    <Suspense fallback={<RoleBasedLoader />}>
      {user.role === 'admin' && <AdminPanel />}
      {user.role === 'user' && <UserDashboard />}
      {user.role === 'moderator' && <ModeratorTools />}
    </Suspense>
  );
}

// Resultado:
// ✅ Los usuarios normales nunca descargan código de admin
// ✅ Reduce el bundle para cada tipo de usuario
// ✅ Mejor seguridad (código admin no está en cliente normal)`}</code>
            </pre>
          </div>

          <div className="strategy-card">
            <h4>📚 Library Splitting</h4>
            <p>División de bibliotecas grandes</p>
            <pre>
              <code>{`// Split de bibliotecas pesadas
const PDFViewer = lazy(() => 
  import(/* webpackChunkName: "pdf" */ './components/PDFViewer')
);

const RichTextEditor = lazy(() => 
  import(/* webpackChunkName: "editor" */ './components/Editor')
);

const MapComponent = lazy(() => 
  import(/* webpackChunkName: "maps" */ './components/Map')
);

// En PDFViewer.tsx
import * as pdfjsLib from 'pdfjs-dist'; // 2MB library
// En Editor.tsx  
import { Editor } from '@tiptap/react'; // 800KB library
// En Map.tsx
import 'leaflet'; // 500KB library

// Sin splitting: 3.3MB en bundle inicial
// Con splitting: Cada chunk se carga solo cuando se necesita

// Configuración webpack adicional:
module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\\\/]node_modules[\\\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
};`}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* Webpack Configuration */}
      <section className="webpack-config">
        <h3>⚙️ Configuración Avanzada</h3>

        <div className="config-tabs">
          <div className="config-tab">
            <h4>📦 webpack.config.js</h4>
            <pre>
              <code>{`module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        // Vendor libraries
        vendor: {
          test: /[\\\\/]node_modules[\\\\/]/,
          name: 'vendors',
          chunks: 'all',
          priority: 10,
        },
        // React/React-DOM
        react: {
          test: /[\\\\/]node_modules[\\\\/](react|react-dom)[\\\\/]/,
          name: 'react',
          chunks: 'all',
          priority: 20,
        },
        // Common code
        common: {
          name: 'common',
          minChunks: 2,
          chunks: 'all',
          priority: 5,
          reuseExistingChunk: true,
        },
        // Large libraries
        charts: {
          test: /[\\\\/]node_modules[\\\\/](chart\\.js|recharts|d3)[\\\\/]/,
          name: 'charts',
          chunks: 'all',
          priority: 15,
        },
      },
    },
  },
};`}</code>
            </pre>
          </div>

          <div className="config-tab">
            <h4>⚡ Vite Configuration</h4>
            <pre>
              <code>{`// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          'react-vendor': ['react', 'react-dom'],
          'router-vendor': ['react-router-dom'],
          'ui-vendor': ['@mui/material', '@emotion/react'],
          
          // Feature chunks
          'admin': ['./src/pages/admin/index.ts'],
          'dashboard': ['./src/pages/dashboard/index.ts'],
          'charts': ['./src/components/charts/index.ts'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  
  // Configuración adicional para análisis
  define: {
    __CHUNK_ANALYSIS__: process.env.ANALYZE === 'true',
  },
});`}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* Mejores Prácticas */}
      <section className="best-practices">
        <h3>✅ Mejores Prácticas</h3>
        <div className="practices-grid">
          <div className="practice-item good">
            <div className="practice-icon">✅</div>
            <div className="practice-content">
              <h4>Empezar con route-based splitting</h4>
              <p>
                Es la forma más fácil y efectiva de implementar code splitting
              </p>
            </div>
          </div>

          <div className="practice-item good">
            <div className="practice-icon">✅</div>
            <div className="practice-content">
              <h4>Agrupar dependencias relacionadas</h4>
              <p>Bibliotecas que se usan juntas deben ir en el mismo chunk</p>
            </div>
          </div>

          <div className="practice-item good">
            <div className="practice-icon">✅</div>
            <div className="practice-content">
              <h4>Usar webpackChunkName</h4>
              <p>Nombres descriptivos facilitan el debugging y monitoreo</p>
            </div>
          </div>

          <div className="practice-item bad">
            <div className="practice-icon">❌</div>
            <div className="practice-content">
              <h4>No crear chunks muy pequeños</h4>
              <p>
                Chunks &lt;20KB pueden ser contraproducentes por el overhead
                HTTP
              </p>
            </div>
          </div>

          <div className="practice-item good">
            <div className="practice-icon">✅</div>
            <div className="practice-content">
              <h4>Preload chunks críticos</h4>
              <p>Usa rel="preload" para chunks que se necesitarán pronto</p>
            </div>
          </div>

          <div className="practice-item good">
            <div className="practice-icon">✅</div>
            <div className="practice-content">
              <h4>Monitorear métricas de carga</h4>
              <p>Trackea tiempo de carga de chunks en producción</p>
            </div>
          </div>
        </div>
      </section>

      {/* Herramientas de Análisis */}
      <section className="analysis-tools">
        <h3>🔧 Herramientas de Análisis</h3>
        <div className="tools-grid">
          <div className="tool-card">
            <h4>📊 webpack-bundle-analyzer</h4>
            <p>
              Visualiza el tamaño de tu bundle y encuentra oportunidades de
              optimización
            </p>
            <div className="tool-command">
              <code>npm install --save-dev webpack-bundle-analyzer</code>
            </div>
          </div>

          <div className="tool-card">
            <h4>🎯 Rollup Plugin Visualizer</h4>
            <p>Para proyectos con Vite/Rollup - análisis visual del bundle</p>
            <div className="tool-command">
              <code>npm install --save-dev rollup-plugin-visualizer</code>
            </div>
          </div>

          <div className="tool-card">
            <h4>🌐 Lighthouse CI</h4>
            <p>Monitoreo continuo de performance en CI/CD</p>
            <div className="tool-command">
              <code>npm install -g @lhci/cli</code>
            </div>
          </div>

          <div className="tool-card">
            <h4>📈 Web.dev Measure</h4>
            <p>Herramienta online para analizar Core Web Vitals</p>
            <div className="tool-command">
              <code>https://web.dev/measure/</code>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CodeSplittingDemo;
