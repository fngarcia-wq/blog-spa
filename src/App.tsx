import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import { auth0Config, validateAuth0Config } from './config/auth0.config';
import { useAuth0Integration } from './hooks/useAuth0Integration';
import { LandingPage } from './pages/LandingPage';
import { PostsPage } from './pages/PostsPage';
import { DashboardPage } from './pages/DashboardPage';
import { StateManagementLearning } from './pages/StateManagementLearning';
import { LoadingSpinner } from './components/ui/LoadingSpinner';
import "./App.css";

// Componente para proteger rutas
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth0Integration();

  if (isLoading) {
    return <LoadingSpinner size="lg" text="Verificando autenticación..." />;
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/" />;
}

function App() {
  // Validar configuración de Auth0
  if (!validateAuth0Config()) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>Error de Configuración</h1>
        <p>Por favor, configura las variables de entorno de Auth0 en el archivo .env</p>
        <ul style={{ textAlign: 'left', maxWidth: '500px', margin: '1rem auto' }}>
          <li>VITE_AUTH0_DOMAIN</li>
          <li>VITE_AUTH0_CLIENT_ID</li>
          <li>VITE_AUTH0_REDIRECT_URI</li>
        </ul>
      </div>
    );
  }

  return (
    <Auth0Provider {...auth0Config}>
      <BrowserRouter>
        <Routes>
          {/* Ruta pública - Landing page */}
          <Route path="/" element={<LandingPage />} />
          
          {/* Rutas protegidas */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/posts"
            element={
              <ProtectedRoute>
                <PostsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/learning"
            element={
              <ProtectedRoute>
                <StateManagementLearning />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </Auth0Provider>
  );
}

export default App;
