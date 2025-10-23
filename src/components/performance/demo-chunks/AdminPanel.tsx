import React from "react";

const AdminPanel: React.FC = () => {
  return (
    <div className="demo-chunk admin-panel">
      <h4>🔐 Conditional Code Splitting</h4>
      <p>
        Este panel de administración solo se carga para usuarios con permisos
        específicos.
      </p>

      <div className="chunk-info">
        <div className="info-item">
          <strong>Chunk Name:</strong> admin-panel.js
        </div>
        <div className="info-item">
          <strong>Tamaño estimado:</strong> ~200KB
        </div>
        <div className="info-item">
          <strong>Ventajas:</strong> Seguridad y performance
        </div>
      </div>

      <div className="admin-features">
        <h5>🛠️ Funcionalidades de Admin:</h5>
        <div className="admin-grid">
          <div className="admin-card">
            <div className="admin-icon">👥</div>
            <h6>Gestión de Usuarios</h6>
            <p>CRUD completo de usuarios</p>
          </div>
          <div className="admin-card">
            <div className="admin-icon">📊</div>
            <h6>Analytics Avanzados</h6>
            <p>Reportes y métricas detalladas</p>
          </div>
          <div className="admin-card">
            <div className="admin-icon">⚙️</div>
            <h6>Configuración Sistema</h6>
            <p>Settings globales de la app</p>
          </div>
          <div className="admin-card">
            <div className="admin-icon">🔒</div>
            <h6>Permisos y Roles</h6>
            <p>Gestión de accesos</p>
          </div>
        </div>
      </div>

      <div className="example-content">
        <h5>Ejemplo de carga condicional:</h5>
        <pre>
          <code>{`const AdminPanel = lazy(() => 
  import(/* webpackChunkName: "admin" */ './admin/AdminPanel')
);

const UserDashboard = lazy(() => 
  import(/* webpackChunkName: "user" */ './user/Dashboard')
);

function App({ user }) {
  return (
    <Suspense fallback={<RoleLoader />}>
      {user.role === 'admin' && <AdminPanel />}
      {user.role === 'user' && <UserDashboard />}
    </Suspense>
  );
}`}</code>
        </pre>
      </div>

      <div className="security-benefits">
        <h5>🔒 Beneficios de Seguridad:</h5>
        <div className="security-grid">
          <div className="security-item">
            <span className="security-icon">🛡️</span>
            <div>
              <strong>Código oculto:</strong>
              <p>Los usuarios normales nunca descargan código administrativo</p>
            </div>
          </div>
          <div className="security-item">
            <span className="security-icon">⚡</span>
            <div>
              <strong>Bundle más liviano:</strong>
              <p>Usuarios normales tienen bundles más pequeños</p>
            </div>
          </div>
          <div className="security-item">
            <span className="security-icon">🔍</span>
            <div>
              <strong>Análisis dificultado:</strong>
              <p>Harder to reverse engineer admin functionality</p>
            </div>
          </div>
        </div>
      </div>

      <div className="warning-box">
        <h5>⚠️ Importante:</h5>
        <p>
          El code splitting NO es una medida de seguridad real. La validación de
          permisos debe hacerse en el backend. Esto solo mejora la performance y
          dificulta el análisis casual.
        </p>
      </div>
    </div>
  );
};

export default AdminPanel;
