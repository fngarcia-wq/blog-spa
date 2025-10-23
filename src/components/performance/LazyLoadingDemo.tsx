import React, { Suspense, useState, lazy } from "react";
import "./LazyLoadingDemo.css";

// Componentes simulados
const HeavyChartComponent = () => (
  <div className="heavy-component">
    <h4>📊 Gráfico Pesado</h4>
    <div className="fake-chart">
      <div className="chart-bar" style={{ height: "60%" }}></div>
      <div className="chart-bar" style={{ height: "80%" }}></div>
      <div className="chart-bar" style={{ height: "40%" }}></div>
      <div className="chart-bar" style={{ height: "90%" }}></div>
      <div className="chart-bar" style={{ height: "70%" }}></div>
    </div>
    <p>Simulando un componente de 2MB que tarda 2s en cargar</p>
  </div>
);

const HeavyTableComponent = () => {
  const tableRows = Array.from({ length: 5 }, (_, i) => (
    <div key={i} className="table-row">
      <span>Usuario {i + 1}</span>
      <span>datos@email.com</span>
      <span>Activo</span>
    </div>
  ));

  return (
    <div className="heavy-component">
      <h4>📋 Tabla Grande</h4>
      <div className="fake-table">{tableRows}</div>
      <p>Simulando una tabla con 10,000 registros</p>
    </div>
  );
};

const HeavyMapComponent = () => (
  <div className="heavy-component">
    <h4>🗺️ Mapa Interactivo</h4>
    <div className="fake-map">
      <div className="map-marker" style={{ top: "20%", left: "30%" }}>
        📍
      </div>
      <div className="map-marker" style={{ top: "60%", left: "70%" }}>
        📍
      </div>
      <div className="map-marker" style={{ top: "40%", left: "50%" }}>
        📍
      </div>
    </div>
    <p>Simulando Google Maps o similar (1.5MB)</p>
  </div>
);

// Simulamos componentes pesados que se cargan dinámicamente
const HeavyChart = lazy(
  () =>
    new Promise<{ default: React.ComponentType }>((resolve) =>
      setTimeout(() => resolve({ default: HeavyChartComponent }), 2000)
    )
);

const HeavyTable = lazy(
  () =>
    new Promise<{ default: React.ComponentType }>((resolve) =>
      setTimeout(() => resolve({ default: HeavyTableComponent }), 1500)
    )
);

const HeavyMap = lazy(
  () =>
    new Promise<{ default: React.ComponentType }>((resolve) =>
      setTimeout(() => resolve({ default: HeavyMapComponent }), 1000)
    )
);

// Componente de loading personalizado
const LoadingSpinner: React.FC<{ message: string }> = ({ message }) => (
  <div className="loading-container">
    <div className="spinner"></div>
    <p>{message}</p>
  </div>
);

const LazyLoadingDemo: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("");
  const [loadTimes, setLoadTimes] = useState<Record<string, number>>({});

  const handleTabClick = (tabName: string) => {
    if (activeTab !== tabName) {
      const startTime = performance.now();
      setActiveTab(tabName);

      // Determinar tiempo de simulación
      let simulationTime = 1000;
      if (tabName === "chart") {
        simulationTime = 2000;
      } else if (tabName === "table") {
        simulationTime = 1500;
      }

      // Simular el tiempo de carga
      setTimeout(() => {
        const endTime = performance.now();
        setLoadTimes((prev) => ({
          ...prev,
          [tabName]: endTime - startTime,
        }));
      }, simulationTime);
    }
  };

  return (
    <div className="lazy-loading-demo">
      <div className="demo-header">
        <h2>⚡ Lazy Loading</h2>
        <p>React.lazy() y Suspense para optimizar la carga inicial</p>
      </div>

      {/* Explicación Conceptual */}
      <section className="concept-section">
        <h3>🎯 ¿Qué es Lazy Loading?</h3>
        <div className="concept-grid">
          <div className="concept-card">
            <div className="concept-icon">🚀</div>
            <h4>Carga Bajo Demanda</h4>
            <p>Los componentes se cargan solo cuando el usuario los necesita</p>
          </div>
          <div className="concept-card">
            <div className="concept-icon">📦</div>
            <h4>Bundle Splitting</h4>
            <p>Divide automáticamente tu JavaScript en chunks más pequeños</p>
          </div>
          <div className="concept-card">
            <div className="concept-icon">⚡</div>
            <h4>Tiempo Inicial Menor</h4>
            <p>La aplicación arranca más rápido cargando menos código</p>
          </div>
        </div>
      </section>

      {/* Ejemplo Práctico */}
      <section className="practical-demo">
        <h3>💡 Demo Interactivo</h3>
        <p>Haz clic en las pestañas para ver lazy loading en acción:</p>

        <div className="demo-tabs">
          <button
            className={`demo-tab ${activeTab === "chart" ? "active" : ""}`}
            onClick={() => handleTabClick("chart")}
          >
            📊 Gráfico Pesado (2MB)
            {Boolean(loadTimes.chart) && (
              <span className="load-time">
                ⏱️ {Math.round(loadTimes.chart)}ms
              </span>
            )}
          </button>
          <button
            className={`demo-tab ${activeTab === "table" ? "active" : ""}`}
            onClick={() => handleTabClick("table")}
          >
            📋 Tabla Grande (1.2MB)
            {Boolean(loadTimes.table) && (
              <span className="load-time">
                ⏱️ {Math.round(loadTimes.table)}ms
              </span>
            )}
          </button>
          <button
            className={`demo-tab ${activeTab === "map" ? "active" : ""}`}
            onClick={() => handleTabClick("map")}
          >
            🗺️ Mapa Interactivo (1.5MB)
            {Boolean(loadTimes.map) && (
              <span className="load-time">
                ⏱️ {Math.round(loadTimes.map)}ms
              </span>
            )}
          </button>
        </div>

        <div className="demo-content">
          {activeTab === "chart" && (
            <Suspense
              fallback={<LoadingSpinner message="Cargando gráfico..." />}
            >
              <HeavyChart />
            </Suspense>
          )}
          {activeTab === "table" && (
            <Suspense fallback={<LoadingSpinner message="Cargando tabla..." />}>
              <HeavyTable />
            </Suspense>
          )}
          {activeTab === "map" && (
            <Suspense fallback={<LoadingSpinner message="Cargando mapa..." />}>
              <HeavyMap />
            </Suspense>
          )}
          {!activeTab && (
            <div className="placeholder">
              <p>👆 Selecciona una pestaña para ver lazy loading en acción</p>
            </div>
          )}
        </div>
      </section>

      {/* Código de Ejemplo */}
      <section className="code-examples">
        <h3>💻 Implementación</h3>

        <div className="code-comparison">
          <div className="code-block">
            <h4>❌ Sin Lazy Loading</h4>
            <pre>
              <code>{`// ❌ Todos los componentes se cargan al inicio
import HeavyChart from './HeavyChart';
import HeavyTable from './HeavyTable';
import HeavyMap from './HeavyMap';

function App() {
  const [activeTab, setActiveTab] = useState('');
  
  return (
    <div>
      {activeTab === 'chart' && <HeavyChart />}
      {activeTab === 'table' && <HeavyTable />}
      {activeTab === 'map' && <HeavyMap />}
    </div>
  );
}

// Bundle inicial: 4.7MB 😱
// Tiempo de carga inicial: 8-12 segundos`}</code>
            </pre>
          </div>

          <div className="code-block">
            <h4>✅ Con Lazy Loading</h4>
            <pre>
              <code>{`// ✅ Componentes se cargan bajo demanda
import { lazy, Suspense } from 'react';

const HeavyChart = lazy(() => import('./HeavyChart'));
const HeavyTable = lazy(() => import('./HeavyTable'));
const HeavyMap = lazy(() => import('./HeavyMap'));

function App() {
  const [activeTab, setActiveTab] = useState('');
  
  return (
    <div>
      <Suspense fallback={<LoadingSpinner />}>
        {activeTab === 'chart' && <HeavyChart />}
        {activeTab === 'table' && <HeavyTable />}
        {activeTab === 'map' && <HeavyMap />}
      </Suspense>
    </div>
  );
}

// Bundle inicial: 120KB 🎉
// Tiempo de carga inicial: 1-2 segundos`}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* Patrones Avanzados */}
      <section className="advanced-patterns">
        <h3>🚀 Patrones Avanzados</h3>

        <div className="pattern-grid">
          <div className="pattern-card">
            <h4>🎯 Route-based Splitting</h4>
            <pre>
              <code>{`// Lazy loading por rutas
const HomePage = lazy(() => import('./pages/Home'));
const AboutPage = lazy(() => import('./pages/About'));
const ContactPage = lazy(() => import('./pages/Contact'));

function App() {
  return (
    <Router>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
}`}</code>
            </pre>
          </div>

          <div className="pattern-card">
            <h4>🔄 Conditional Loading</h4>
            <pre>
              <code>{`// Carga condicional basada en permisos
const AdminPanel = lazy(() => import('./AdminPanel'));
const UserDashboard = lazy(() => import('./UserDashboard'));

function Dashboard({ user }) {
  return (
    <Suspense fallback={<DashboardLoader />}>
      {user.isAdmin ? <AdminPanel /> : <UserDashboard />}
    </Suspense>
  );
}`}</code>
            </pre>
          </div>

          <div className="pattern-card">
            <h4>⚡ Preloading Strategy</h4>
            <pre>
              <code>{`// Precargar en hover para mejor UX
const HeavyModal = lazy(() => import('./HeavyModal'));

function TriggerButton() {
  const [preload, setPreload] = useState(false);
  
  const handleMouseEnter = () => {
    setPreload(true);
    // Componente se precarga en hover
  };
  
  return (
    <button onMouseEnter={handleMouseEnter}>
      Abrir Modal
      {preload && (
        <div style={{ display: 'none' }}>
          <Suspense fallback={null}>
            <HeavyModal />
          </Suspense>
        </div>
      )}
    </button>
  );
}`}</code>
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
              <h4>Usar Suspense siempre</h4>
              <p>Todo lazy component necesita estar envuelto en Suspense</p>
            </div>
          </div>

          <div className="practice-item good">
            <div className="practice-icon">✅</div>
            <div className="practice-content">
              <h4>Loading states informativos</h4>
              <p>Muestra qué se está cargando específicamente</p>
            </div>
          </div>

          <div className="practice-item bad">
            <div className="practice-icon">❌</div>
            <div className="practice-content">
              <h4>No abuses del lazy loading</h4>
              <p>Componentes pequeños pueden ser contraproducentes</p>
            </div>
          </div>

          <div className="practice-item good">
            <div className="practice-icon">✅</div>
            <div className="practice-content">
              <h4>Agrupa componentes relacionados</h4>
              <p>Un chunk por feature es mejor que muchos mini-chunks</p>
            </div>
          </div>
        </div>
      </section>

      {/* Métricas de Performance */}
      <section className="performance-metrics">
        <h3>📊 Impacto en Performance</h3>
        <div className="metrics-comparison">
          <div className="metric-card before">
            <h4>Sin Lazy Loading</h4>
            <div className="metric-item">
              <span className="metric-label">Bundle inicial:</span>
              <span className="metric-value bad">4.7MB</span>
            </div>
            <div className="metric-item">
              <span className="metric-label">Tiempo de carga:</span>
              <span className="metric-value bad">8-12s</span>
            </div>
            <div className="metric-item">
              <span className="metric-label">FCP:</span>
              <span className="metric-value bad">6.2s</span>
            </div>
          </div>

          <div className="metric-card after">
            <h4>Con Lazy Loading</h4>
            <div className="metric-item">
              <span className="metric-label">Bundle inicial:</span>
              <span className="metric-value good">120KB</span>
            </div>
            <div className="metric-item">
              <span className="metric-label">Tiempo de carga:</span>
              <span className="metric-value good">1-2s</span>
            </div>
            <div className="metric-item">
              <span className="metric-label">FCP:</span>
              <span className="metric-value good">0.8s</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LazyLoadingDemo;
