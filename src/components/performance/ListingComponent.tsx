import React from "react";

const ListingComponent: React.FC = () => {
  return (
    <div className="listing-component">
      <h2>📋 Listing Component</h2>
      <p>Este componente estará disponible próximamente...</p>
      <div
        style={{
          padding: "2rem",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          borderRadius: "12px",
          textAlign: "center",
        }}
      >
        <h3>🚧 En construcción</h3>
        <p>
          Componente de listado completo con CRUD, paginación, filtros y cache
          management.
        </p>
      </div>
    </div>
  );
};

export default ListingComponent;
