import { useAuth0Integration } from '../hooks/useAuth0Integration';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { Navigate } from 'react-router-dom';

/**
 * Landing Page - Página de inicio para usuarios no autenticados
 */
export function LandingPage() {
  const { isLoading, isAuthenticated, login } = useAuth0Integration();

  if (isLoading) {
    return <LoadingSpinner size="lg" text="Cargando..." />;
  }

  // Si ya está autenticado, redirigir al dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      padding: '2rem',
    }}>
      <div style={{
        maxWidth: '600px',
        textAlign: 'center',
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        borderRadius: '20px',
        padding: '3rem',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
          Blog SPA
        </h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '2rem', opacity: 0.9 }}>
          Bienvenido a nuestra plataforma de blog. Inicia sesión para acceder a todas las funcionalidades.
        </p>
        
        <button
          onClick={login}
          style={{
            padding: '1rem 2rem',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            color: '#667eea',
            background: 'white',
            border: 'none',
            borderRadius: '50px',
            cursor: 'pointer',
            transition: 'transform 0.2s, box-shadow 0.2s',
            boxShadow: '0 4px 15px 0 rgba(0, 0, 0, 0.2)',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 20px 0 rgba(0, 0, 0, 0.3)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 15px 0 rgba(0, 0, 0, 0.2)';
          }}
        >
          Iniciar Sesión / Registrarse
        </button>

        <div style={{ marginTop: '2rem', fontSize: '0.9rem', opacity: 0.8 }}>
          <p>Autenticación segura con Auth0</p>
        </div>
      </div>
    </div>
  );
}
