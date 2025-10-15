import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

// ============================================
// MÉTODO 1: ProtectedRoute Básico
// ============================================

interface ProtectedRouteBasicProps {
  children: ReactNode;
  isAuthenticated: boolean;
}

export function ProtectedRouteBasic({ children, isAuthenticated }: ProtectedRouteBasicProps) {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
}

// Uso:
// <ProtectedRouteBasic isAuthenticated={!!user}>
//   <Dashboard />
// </ProtectedRouteBasic>


// ============================================
// MÉTODO 2: Con Contexto de Autenticación
// ============================================

import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
}

// Uso:
// <ProtectedRoute>
//   <Dashboard />
// </ProtectedRoute>


// ============================================
// MÉTODO 3: Con Redirección al Origen
// ============================================

export function ProtectedRouteWithRedirect({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  
  if (!isAuthenticated) {
    // Guardar la ubicación a la que intentaba acceder
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  return <>{children}</>;
}

// En LoginPage.tsx:
// const location = useLocation();
// const from = location.state?.from?.pathname || '/dashboard';
// 
// const handleLogin = async (credentials) => {
//   await login(credentials);
//   navigate(from, { replace: true }); // Redirigir a la página original
// };


// ============================================
// MÉTODO 4: Protección por Roles
// ============================================

export type UserRole = 'admin' | 'teacher' | 'student';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface RoleBasedRouteProps {
  children: ReactNode;
  allowedRoles: UserRole[];
}

export function RoleBasedRoute({ children, allowedRoles }: RoleBasedRouteProps) {
  const { user, isAuthenticated } = useAuth();
  
  // No autenticado → login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  // Autenticado pero sin permiso → página 403
  if (!allowedRoles.includes(user!.role)) {
    return <Navigate to="/unauthorized" replace />;
  }
  
  // Tiene permiso → renderizar
  return <>{children}</>;
}

// Uso:
// <RoleBasedRoute allowedRoles={['admin']}>
//   <AdminPanel />
// </RoleBasedRoute>
//
// <RoleBasedRoute allowedRoles={['admin', 'teacher']}>
//   <TeacherDashboard />
// </RoleBasedRoute>


// ============================================
// COMPONENTE DE EJEMPLO: Unauthorized Page
// ============================================

export function UnauthorizedPage() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '2rem',
      textAlign: 'center'
    }}>
      <h1 style={{ fontSize: '4rem', margin: 0 }}>⛔</h1>
      <h2>403 - Acceso Denegado</h2>
      <p>No tienes permisos para acceder a esta página.</p>
      <button 
        onClick={() => window.history.back()}
        style={{
          marginTop: '1rem',
          padding: '0.75rem 1.5rem',
          background: '#667eea',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer'
        }}
      >
        ← Volver
      </button>
    </div>
  );
}


// ============================================
// EJEMPLO COMPLETO DE RUTAS EN APP
// ============================================

/*
// En App.tsx:

import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute, RoleBasedRoute, UnauthorizedPage } from './components/ProtectedRoute';

// Páginas
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import DashboardPage from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';
import TeacherDashboard from './pages/TeacherDashboard';
import NotFoundPage from './pages/NotFound';

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Rutas públicas *\/}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        
        {/* Rutas protegidas básicas *\/}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } 
        />
        
        {/* Rutas protegidas por roles *\/}
        <Route 
          path="/admin" 
          element={
            <RoleBasedRoute allowedRoles={['admin']}>
              <AdminPanel />
            </RoleBasedRoute>
          } 
        />
        
        <Route 
          path="/teacher" 
          element={
            <RoleBasedRoute allowedRoles={['admin', 'teacher']}>
              <TeacherDashboard />
            </RoleBasedRoute>
          } 
        />
        
        {/* Páginas de error *\/}
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
*/