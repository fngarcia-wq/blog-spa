import React from "react";

const FeatureB: React.FC = () => {
  return (
    <div className="demo-chunk feature-b">
      <h4>🎯 Feature-based Code Splitting</h4>
      <p>
        Este componente representa una funcionalidad específica cargada bajo
        demanda.
      </p>

      <div className="chunk-info">
        <div className="info-item">
          <strong>Chunk Name:</strong> feature-b.js
        </div>
        <div className="info-item">
          <strong>Tamaño estimado:</strong> ~95KB
        </div>
        <div className="info-item">
          <strong>Ventajas:</strong> Funcionalidades modulares
        </div>
      </div>

      <div className="feature-demo">
        <h5>Simulación de Feature Pesada:</h5>
        <div className="mock-chart">
          <div className="chart-title">📊 Gráfico de Ventas</div>
          <div className="chart-bars">
            <div
              className="bar"
              style={{ height: "60%", background: "#4299e1" }}
            >
              Q1
            </div>
            <div
              className="bar"
              style={{ height: "80%", background: "#48bb78" }}
            >
              Q2
            </div>
            <div
              className="bar"
              style={{ height: "45%", background: "#ed8936" }}
            >
              Q3
            </div>
            <div
              className="bar"
              style={{ height: "90%", background: "#9f7aea" }}
            >
              Q4
            </div>
          </div>
        </div>
      </div>

      <div className="example-content">
        <h5>Ejemplo de feature splitting:</h5>
        <pre>
          <code>{`const ChartComponent = lazy(() => 
  import(/* webpackChunkName: "charts" */ './features/Charts')
);

const VideoPlayer = lazy(() => 
  import(/* webpackChunkName: "video" */ './features/Video')
);

// Solo se carga cuando el usuario accede a la feature
{showCharts && <ChartComponent />}
{showVideo && <VideoPlayer />}`}</code>
        </pre>
      </div>

      <div className="benefits-list">
        <h5>Casos de uso ideales:</h5>
        <ul>
          <li>📊 Bibliotecas de gráficos (Chart.js, D3)</li>
          <li>🎥 Reproductores de video</li>
          <li>📝 Editores de texto enriquecido</li>
          <li>🗺️ Mapas interactivos</li>
          <li>💬 Widgets de chat en vivo</li>
        </ul>
      </div>
    </div>
  );
};

export default FeatureB;
