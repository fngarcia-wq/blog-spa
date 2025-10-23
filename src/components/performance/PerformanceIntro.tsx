import React from "react";
import "./PerformanceIntro.css";

const PerformanceIntro: React.FC = () => {
  return (
    <div className="performance-intro">
      <div className="intro-header">
        <h2>📊 Introducción a Performance</h2>
        <p className="intro-subtitle">
          Por qué el rendimiento es fundamental en aplicaciones web modernas
        </p>
      </div>

      {/* Impacto del Performance */}
      <section className="performance-impact">
        <h3>🎯 Por qué es importante el Performance</h3>
        <div className="impact-grid">
          <div className="impact-card critical">
            <div className="impact-icon">⚡</div>
            <h4>Experiencia de Usuario</h4>
            <p>Una mejora de 0.1s puede aumentar la conversión hasta un 8%</p>
            <div className="stat">0.1s = +8% conversión</div>
          </div>

          <div className="impact-card high">
            <div className="impact-icon">💰</div>
            <h4>Costos Operativos</h4>
            <p>Menor uso de CPU y memoria reduce costos de servidor</p>
            <div className="stat">-30% recursos</div>
          </div>

          <div className="impact-card medium">
            <div className="impact-icon">📱</div>
            <h4>Dispositivos Móviles</h4>
            <p>3G slow puede tardar 19s en cargar una página promedio</p>
            <div className="stat">19s en 3G</div>
          </div>

          <div className="impact-card low">
            <div className="impact-icon">🔍</div>
            <h4>SEO y Ranking</h4>
            <p>Core Web Vitals son factor oficial de ranking en Google</p>
            <div className="stat">Factor SEO oficial</div>
          </div>
        </div>
      </section>

      {/* Core Web Vitals */}
      <section className="core-web-vitals">
        <h3>📏 Core Web Vitals</h3>
        <p>
          Las métricas más importantes que Google usa para evaluar la
          experiencia de usuario:
        </p>

        <div className="vitals-grid">
          <div className="vital-card">
            <div className="vital-header">
              <span className="vital-icon">🎨</span>
              <h4>Largest Contentful Paint (LCP)</h4>
            </div>
            <div className="vital-description">
              <p>Tiempo que tarda en cargar el contenido principal visible</p>
              <div className="vital-thresholds">
                <div className="threshold good">✅ Bueno: &lt; 2.5s</div>
                <div className="threshold needs-improvement">
                  ⚠️ Mejorar: 2.5s - 4s
                </div>
                <div className="threshold poor">❌ Malo: &gt; 4s</div>
              </div>
            </div>
          </div>

          <div className="vital-card">
            <div className="vital-header">
              <span className="vital-icon">👆</span>
              <h4>First Input Delay (FID)</h4>
            </div>
            <div className="vital-description">
              <p>Tiempo desde la primera interacción hasta la respuesta</p>
              <div className="vital-thresholds">
                <div className="threshold good">✅ Bueno: &lt; 100ms</div>
                <div className="threshold needs-improvement">
                  ⚠️ Mejorar: 100ms - 300ms
                </div>
                <div className="threshold poor">❌ Malo: &gt; 300ms</div>
              </div>
            </div>
          </div>

          <div className="vital-card">
            <div className="vital-header">
              <span className="vital-icon">📐</span>
              <h4>Cumulative Layout Shift (CLS)</h4>
            </div>
            <div className="vital-description">
              <p>Estabilidad visual - cuánto se mueve el contenido</p>
              <div className="vital-thresholds">
                <div className="threshold good">✅ Bueno: &lt; 0.1</div>
                <div className="threshold needs-improvement">
                  ⚠️ Mejorar: 0.1 - 0.25
                </div>
                <div className="threshold poor">❌ Malo: &gt; 0.25</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Estrategias de Optimización */}
      <section className="optimization-strategies">
        <h3>🛠️ Estrategias de Optimización</h3>
        <p>Técnicas principales que veremos en esta clase:</p>

        <div className="strategies-list">
          <div className="strategy-item">
            <div className="strategy-icon">⚡</div>
            <div className="strategy-content">
              <h4>Lazy Loading</h4>
              <p>Cargar contenido solo cuando es necesario</p>
              <code>React.lazy() + Suspense</code>
            </div>
          </div>

          <div className="strategy-item">
            <div className="strategy-icon">🧠</div>
            <div className="strategy-content">
              <h4>Memoization</h4>
              <p>Evitar recálculos innecesarios</p>
              <code>memo, useMemo, useCallback</code>
            </div>
          </div>

          <div className="strategy-item">
            <div className="strategy-icon">📦</div>
            <div className="strategy-content">
              <h4>Code Splitting</h4>
              <p>Dividir el bundle en chunks más pequeños</p>
              <code>Dynamic imports</code>
            </div>
          </div>

          <div className="strategy-item">
            <div className="strategy-icon">📡</div>
            <div className="strategy-content">
              <h4>Smart Data Fetching</h4>
              <p>Cache inteligente y gestión de estado eficiente</p>
              <code>TanStack Query</code>
            </div>
          </div>

          <div className="strategy-item">
            <div className="strategy-icon">🚀</div>
            <div className="strategy-content">
              <h4>Prefetching</h4>
              <p>Precargar datos antes de que se necesiten</p>
              <code>Predictive loading</code>
            </div>
          </div>
        </div>
      </section>

      {/* Herramientas de Medición */}
      <section className="measurement-tools">
        <h3>🔧 Herramientas de Medición</h3>
        <div className="tools-grid">
          <div className="tool-card">
            <h4>🌐 Lighthouse</h4>
            <p>Auditoría completa de performance, SEO y accesibilidad</p>
            <div className="tool-usage">F12 → Lighthouse</div>
          </div>

          <div className="tool-card">
            <h4>⚛️ React DevTools</h4>
            <p>Profiler para identificar componentes lentos</p>
            <div className="tool-usage">Profiler tab</div>
          </div>

          <div className="tool-card">
            <h4>📊 Web Vitals Extension</h4>
            <p>Métricas en tiempo real mientras navegas</p>
            <div className="tool-usage">Chrome Extension</div>
          </div>

          <div className="tool-card">
            <h4>🔍 Bundle Analyzer</h4>
            <p>Visualizar el tamaño de tu bundle</p>
            <div className="tool-usage">webpack-bundle-analyzer</div>
          </div>
        </div>
      </section>

      {/* Ejemplo Práctico */}
      <section className="practical-example">
        <h3>💡 Ejemplo Práctico: Antes vs Después</h3>
        <div className="comparison-grid">
          <div className="comparison-card before">
            <h4>❌ Antes (Lento)</h4>
            <pre>
              <code>{`// ❌ Componente sin optimizar
function UserList({ users }) {
  return (
    <div>
      {users.map((user, index) => (
        <UserCard 
          key={index}  // ❌ Índice como key
          user={user}
          onClick={() => handleClick(user)}  // ❌ Nueva función cada render
        />
      ))}
    </div>
  );
}

// ❌ Componente que siempre re-renderiza
function UserCard({ user, onClick }) {
  const expensiveCalculation = calculateUserStats(user);  // ❌ Cálculo en cada render
  
  return (
    <div onClick={onClick}>
      <h3>{user.name}</h3>
      <p>{expensiveCalculation}</p>
    </div>
  );
}`}</code>
            </pre>
          </div>

          <div className="comparison-card after">
            <h4>✅ Después (Optimizado)</h4>
            <pre>
              <code>{`// ✅ Componente optimizado
const UserList = memo(function UserList({ users }) {
  const handleClick = useCallback((user) => {
    // Lógica del click
  }, []);

  return (
    <div>
      {users.map((user) => (
        <UserCard 
          key={user.id}  // ✅ ID único como key
          user={user}
          onClick={handleClick}  // ✅ Función memoizada
        />
      ))}
    </div>
  );
});

// ✅ Componente memoizado
const UserCard = memo(function UserCard({ user, onClick }) {
  const expensiveCalculation = useMemo(
    () => calculateUserStats(user),  // ✅ Solo recalcula si user cambia
    [user]
  );
  
  return (
    <div onClick={() => onClick(user)}>
      <h3>{user.name}</h3>
      <p>{expensiveCalculation}</p>
    </div>
  );
});`}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <div className="cta-card">
          <h3>🚀 ¡Empezamos!</h3>
          <p>
            A lo largo de esta clase veremos cada técnica en detalle con
            ejemplos prácticos. Al final tendrás un componente completo con
            todas las optimizaciones aplicadas.
          </p>
          <div className="cta-highlights">
            <span className="highlight">✨ Ejemplos interactivos</span>
            <span className="highlight">🔧 Código real funcional</span>
            <span className="highlight">📊 Mediciones de performance</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PerformanceIntro;
