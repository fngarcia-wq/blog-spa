import React from "react";

const PrefetchingDemo: React.FC = () => {
  return (
    <div className="prefetching-demo">
      <h2>🚀 Prefetching Demo</h2>
      <p>Este componente estará disponible próximamente...</p>
      <div
        style={{
          padding: "2rem",
          background: "linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 100%)",
          color: "white",
          borderRadius: "12px",
          textAlign: "center",
        }}
      >
        <h3>🚧 En construcción</h3>
        <p>
          Demostraciones de prefetching, infinite scroll y carga predictiva.
        </p>
      </div>
    </div>
  );
};

export default PrefetchingDemo;
