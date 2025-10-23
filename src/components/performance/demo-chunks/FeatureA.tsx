import React from "react";

const FeatureA: React.FC = () => {
  return (
    <div className="demo-chunk feature-a">
      <h4>🛤️ Route-based Code Splitting</h4>
      <p>Este componente se cargó dinámicamente como un chunk separado.</p>

      <div className="chunk-info">
        <div className="info-item">
          <strong>Chunk Name:</strong> feature-a.js
        </div>
        <div className="info-item">
          <strong>Tamaño estimado:</strong> ~120KB
        </div>
        <div className="info-item">
          <strong>Ventajas:</strong> Carga inicial más rápida
        </div>
      </div>

      <div className="example-content">
        <h5>Ejemplo de ruta con lazy loading:</h5>
        <pre>
          <code>{`const HomePage = lazy(() => import('./pages/Home'));
const DashboardPage = lazy(() => import('./pages/Dashboard'));

<Route path="/" element={<HomePage />} />
<Route path="/dashboard" element={<DashboardPage />} />`}</code>
        </pre>
      </div>

      <div className="benefits-list">
        <h5>Beneficios del Route-based Splitting:</h5>
        <ul>
          <li>✅ Implementación simple y directa</li>
          <li>✅ Cada página es un chunk independiente</li>
          <li>✅ Excelente para aplicaciones SPA grandes</li>
          <li>✅ Cache eficiente por página</li>
        </ul>
      </div>
    </div>
  );
};

export default FeatureA;
