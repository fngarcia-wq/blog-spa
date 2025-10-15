import { createContext, useContext, useState, useMemo, type ReactNode } from 'react';

// ============================================
// TIPOS
// ============================================

export type UserRole = 'admin' | 'teacher' | 'student';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  hasRole: (roles: UserRole[]) => boolean;
}

// ============================================
// CONTEXTO
// ============================================

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ============================================
// HOOK PERSONALIZADO
// ============================================

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
}

// ============================================
// PROVIDER
// ============================================

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Simular login con delay
  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    
    // Simular petición al servidor (2 segundos)
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Usuario simulado basado en el email
    const mockUser: User = {
      id: '123',
      name: credentials.email.split('@')[0],
      email: credentials.email,
      role: credentials.email.includes('admin') ? 'admin' 
            : credentials.email.includes('teacher') ? 'teacher' 
            : 'student',
      avatar: `https://ui-avatars.com/api/?name=${credentials.email.split('@')[0]}`
    };
    
    setUser(mockUser);
    setIsLoading(false);
    
    // Guardar en localStorage (opcional)
    localStorage.setItem('user', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const hasRole = (roles: UserRole[]) => {
    if (!user) return false;
    return roles.includes(user.role);
  };

  // ✅ useMemo para evitar re-renders
  const value = useMemo<AuthContextType>(
    () => ({
      user,
      isAuthenticated: user !== null,
      isLoading,
      login,
      logout,
      hasRole
    }),
    [user, isLoading]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}


// ============================================
// EJEMPLO DE USO EN COMPONENTES
// ============================================

/*
// En LoginPage.tsx:

import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Ruta a la que redirigir después del login
  const from = location.state?.from?.pathname || '/dashboard';
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      await login({ email, password });
      navigate(from, { replace: true });
    } catch (err) {
      setError('Error al iniciar sesión');
    }
  };
  
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input 
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Cargando...' : 'Iniciar Sesión'}
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
      
      <div>
        <h3>Usuarios de prueba:</h3>
        <ul>
          <li>admin@test.com (Admin)</li>
          <li>teacher@test.com (Teacher)</li>
          <li>student@test.com (Student)</li>
        </ul>
      </div>
    </div>
  );
}


// En Dashboard.tsx:

import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Bienvenido, {user?.name}!</p>
      <p>Rol: {user?.role}</p>
      {user?.avatar && <img src={user.avatar} alt={user.name} />}
      
      <button onClick={handleLogout}>Cerrar Sesión</button>
    </div>
  );
}


// En Header.tsx (mostrar info del usuario):

import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  
  return (
    <header>
      <nav>
        <Link to="/">Inicio</Link>
        
        {isAuthenticated ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            {user?.role === 'admin' && <Link to="/admin">Admin Panel</Link>}
            {user?.role !== 'student' && <Link to="/teacher">Teacher Area</Link>}
            <span>Hola, {user?.name}</span>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>
    </header>
  );
}
*/