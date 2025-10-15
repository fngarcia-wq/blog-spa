# 🚀 Guía Completa: SPAs y React Router

## 📋 Índice
1. [¿Qué es una SPA?](#1-qué-es-una-spa)
2. [React Router](#2-react-router)
3. [Rutas Básicas](#3-rutas-básicas)
4. [Rutas Dinámicas](#4-rutas-dinámicas)
5. [Navegación Programática](#5-navegación-programática)
6. [Rutas Protegidas ⭐](#6-rutas-protegidas-)
7. [Rutas Anidadas](#7-rutas-anidadas)
8. [Ejemplo Completo](#8-ejemplo-completo)
9. [Mejores Prácticas](#9-mejores-prácticas)

---

## 1. ¿Qué es una SPA?

### 📖 Definición

**SPA (Single Page Application)** es una aplicación web que carga **una única página HTML** y actualiza dinámicamente el contenido sin recargar la página completa.

### 🆚 Comparación Visual: Aplicaciones Tradicionales vs SPA

#### Aplicación Tradicional (Multi-Page App)
```
Usuario hace clic en "Acerca de"
    ↓
[NAVEGADOR] ──────────────→ [SERVIDOR]
    "Dame /about.html"
                              ↓
                         Procesa petición
                         Genera HTML completo
                         CSS, JS, etc.
    ↓                        ↓
[NAVEGADOR] ←────────────── [SERVIDOR]
    Descarga TODO
    ↓
Destruye página actual
Recarga TODA la página
Re-ejecuta JS
Re-aplica CSS
⏱️ 2-3 segundos de carga
```

**Problemas:**
- ❌ Recarga completa de la página
- ❌ Pérdida de estado
- ❌ Flash blanco entre páginas
- ❌ Múltiples peticiones al servidor
- ❌ Experiencia interrumpida

#### Single Page Application (SPA)
```
Usuario hace clic en "Acerca de"
    ↓
[REACT ROUTER]
    ↓
Cambia URL (sin recargar)
    ↓
Renderiza componente <About />
    ↓
Solo actualiza el contenido necesario
⚡ <100ms - Instantáneo
```

**Ventajas:**
- ✅ Sin recarga de página
- ✅ Mantiene el estado
- ✅ Transiciones suaves
- ✅ Experiencia como app nativa
- ✅ Carga inicial, luego solo datos

### 📊 Flujo Visual Detallado

```
┌─────────────────────────────────────────────────────────┐
│           APLICACIÓN TRADICIONAL (MPA)                   │
└─────────────────────────────────────────────────────────┘

Página 1: index.html          Página 2: about.html
┌──────────────┐              ┌──────────────┐
│   Header     │              │   Header     │
│   Nav        │  Click →     │   Nav        │  
│   Content    │  RELOAD!     │   Content    │
│   Footer     │              │   Footer     │
└──────────────┘              └──────────────┘
     ↓                             ↓
Nueva petición HTTP          Nueva petición HTTP
Todo se destruye             Todo se descarga
Todo se descarga             Todo se re-ejecuta


┌─────────────────────────────────────────────────────────┐
│         SINGLE PAGE APPLICATION (SPA)                    │
└─────────────────────────────────────────────────────────┘

index.html (UNA VEZ)
┌──────────────────────────────────────────────────────┐
│   <Header /> ──┐                                      │
│   <Nav />      │ ← Se mantienen (no se recargan)     │
│   <Footer />  ─┘                                      │
│                                                        │
│   <Outlet>  ← Solo esta parte cambia                 │
│     Route "/"     → <Home />                          │
│     Route "/about"→ <About />                         │
│     Route "/posts"→ <Posts />                         │
│   </Outlet>                                           │
└──────────────────────────────────────────────────────┘
         ↓
    Sin recargas
    Sin peticiones HTTP (excepto datos)
    Cambio instantáneo
```

### ✨ Características y Beneficios

| Característica | Beneficio | Ejemplo |
|----------------|-----------|---------|
| **Carga Única** | Descarga app una vez | Gmail, Netflix |
| **Navegación Rápida** | Cambios instantáneos | Twitter, Facebook |
| **Estado Persistente** | No pierde datos | Carrito de compras |
| **Experiencia Fluida** | Como app nativa | Spotify Web |
| **Optimización** | Solo carga lo necesario | YouTube |

### ✅ Ventajas

1. **🚀 Rendimiento Superior**
   - Carga inicial más lenta, pero navegación instantánea
   - Solo se transfieren datos (JSON), no HTML completo
   - Caché eficiente en el navegador

2. **💫 Mejor UX (Experiencia de Usuario)**
   - Sin "flash blanco" entre páginas
   - Transiciones y animaciones suaves
   - Respuesta inmediata a acciones

3. **📱 Comportamiento de App Nativa**
   - Sensación de aplicación móvil
   - Gestos y navegación fluida
   - Offline capability (con Service Workers)

4. **🔄 Separación Frontend/Backend**
   - API REST independiente
   - Frontend y backend pueden desarrollarse por separado
   - Mismo backend para web, móvil, etc.

5. **🎨 Interactividad Avanzada**
   - Actualizaciones en tiempo real
   - Drag & drop fluido
   - Interfaces complejas

### ⚠️ Desafíos

1. **📦 Bundle Size Grande**
   - Problema: App completa se descarga inicialmente
   - Solución: Code splitting, lazy loading

2. **🔍 SEO Complicado**
   - Problema: Crawlers no ejecutan JavaScript
   - Solución: Server-Side Rendering (SSR), Static Site Generation (SSG)

3. **♿ Accesibilidad**
   - Problema: Navegación no estándar
   - Solución: Gestión manual de foco, ARIA labels

4. **📚 Curva de Aprendizaje**
   - Problema: Requiere frameworks y herramientas complejas
   - Solución: Tutoriales, documentación, práctica

5. **🕐 Carga Inicial Lenta**
   - Problema: Primera carga descarga todo
   - Solución: Progressive Web Apps, lazy loading

6. **🌐 Navegador Antiguo**
   - Problema: Requiere JavaScript moderno
   - Solución: Polyfills, transpilación

### 🌟 Ejemplos de SPAs Famosas

| App | Tecnología | Por qué es SPA |
|-----|-----------|----------------|
| **Gmail** | Closure, React | Cambio instantáneo entre correos |
| **Facebook** | React | Feed infinito sin recargas |
| **Twitter** | React | Timeline en tiempo real |
| **Netflix** | React | Navegación entre películas |
| **Spotify Web** | React | Reproducción continua |
| **Trello** | Backbone → React | Drag & drop de tarjetas |
| **Figma** | WebAssembly | Editor colaborativo |
| **Discord** | React | Chat en tiempo real |
| **YouTube** | Polymer → React | Videos sin interrupciones |
| **Notion** | React | Edición de documentos |

### 🔍 ¿Cuándo NO usar una SPA?

❌ **Blog o sitio de contenido estático**
- Mejor: Static Site Generator (Astro, Hugo, Jekyll)
- Razón: SEO crítico, poco JavaScript necesario

❌ **E-commerce con mucho SEO**
- Mejor: Next.js (SSR/SSG), Remix
- Razón: Necesitas indexación perfecta

❌ **Landing pages simples**
- Mejor: HTML/CSS puro o SSG
- Razón: Overhead innecesario

❌ **Apps para conexiones lentas**
- Mejor: Progressive enhancement
- Razón: Bundle size problemático

### ✅ ¿Cuándo SÍ usar una SPA?

✅ **Dashboards y paneles admin**
✅ **Apps con mucha interacción**
✅ **Aplicaciones en tiempo real**
✅ **Herramientas colaborativas**
✅ **Apps internas de empresa**

---

## 2. React Router

### 📖 ¿Qué es y por qué lo necesitamos?

**React Router** es la librería estándar para navegación en React. Permite:
- ✅ Sincronizar UI con URL
- ✅ Navegación sin recargar
- ✅ Historial de navegación (botón "atrás")
- ✅ Rutas dinámicas y anidadas
- ✅ Protección de rutas

### 🎯 Conceptos Fundamentales

#### 1. **Router** - El Proveedor
```tsx
import { BrowserRouter } from 'react-router-dom';

// Envuelve toda tu app
<BrowserRouter>
  <App />
</BrowserRouter>
```

#### 2. **Routes** - El Contenedor de Rutas
```tsx
import { Routes, Route } from 'react-router-dom';

<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
</Routes>
```

#### 3. **Route** - Una Ruta Individual
```tsx
<Route 
  path="/posts/:id"        // URL pattern
  element={<PostDetail />} // Componente a renderizar
/>
```

#### 4. **Link** - Navegación Declarativa
```tsx
import { Link } from 'react-router-dom';

// En lugar de <a href="/about">
<Link to="/about">Acerca de</Link>
```

#### 5. **Navigate** - Redirección
```tsx
import { Navigate } from 'react-router-dom';

// Redirigir si no está autenticado
{!isAuthenticated ? <Navigate to="/login" /> : <Dashboard />}
```

#### 6. **Params** - Parámetros de URL
```tsx
import { useParams } from 'react-router-dom';

// URL: /posts/123
const { id } = useParams(); // id = "123"
```

#### 7. **Outlet** - Renderizar Rutas Hijas
```tsx
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div>
      <Header />
      <Outlet /> {/* Aquí se renderizan las rutas hijas */}
      <Footer />
    </div>
  );
}
```

### 📦 Instalación

```bash
npm install react-router-dom
```

### ⚙️ Configuración Básica

```tsx
// main.tsx
import { BrowserRouter } from 'react-router-dom';
import App from './App';

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
```

---

## 3. Rutas Básicas

### 📁 Estructura Recomendada

```
src/
├── pages/
│   ├── Home.tsx
│   ├── About.tsx
│   ├── Contact.tsx
│   └── NotFound.tsx
├── routes/
│   └── AppRoutes.tsx
└── App.tsx
```

### 💻 Implementación

```tsx
// routes/AppRoutes.tsx
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import Contact from '../pages/Contact';
import NotFound from '../pages/NotFound';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<NotFound />} /> {/* 404 */}
    </Routes>
  );
}
```

### 🔗 Navegación con Link

```tsx
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav>
      <Link to="/">Inicio</Link>
      <Link to="/about">Acerca de</Link>
      <Link to="/contact">Contacto</Link>
    </nav>
  );
}
```

### 🎨 NavLink con Estilos Activos

```tsx
import { NavLink } from 'react-router-dom';

function Navigation() {
  return (
    <nav>
      <NavLink 
        to="/" 
        className={({ isActive }) => isActive ? 'active' : ''}
      >
        Inicio
      </NavLink>
      
      <NavLink 
        to="/about"
        style={({ isActive }) => ({
          color: isActive ? '#007bff' : '#333',
          fontWeight: isActive ? 'bold' : 'normal'
        })}
      >
        Acerca de
      </NavLink>
    </nav>
  );
}
```

---

## 4. Rutas Dinámicas

### 📌 Parámetros de Ruta con useParams

```tsx
// Definir ruta con parámetro
<Route path="/posts/:id" element={<PostDetail />} />

// Acceder al parámetro
import { useParams } from 'react-router-dom';

function PostDetail() {
  const { id } = useParams();
  
  return <h1>Post ID: {id}</h1>;
  // URL: /posts/123 → Post ID: 123
}
```

### 🔍 Query Params con useSearchParams

```tsx
import { useSearchParams } from 'react-router-dom';

function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const query = searchParams.get('q');
  const page = searchParams.get('page') || '1';
  
  // URL: /search?q=react&page=2
  // query = "react", page = "2"
  
  return (
    <div>
      <h1>Buscando: {query}</h1>
      <p>Página: {page}</p>
      
      <button onClick={() => setSearchParams({ q: query, page: '3' })}>
        Siguiente página
      </button>
    </div>
  );
}
```

### 🚀 Navegación a Rutas Dinámicas

```tsx
import { Link } from 'react-router-dom';

function PostsList() {
  const posts = [
    { id: 1, title: 'Post 1' },
    { id: 2, title: 'Post 2' }
  ];
  
  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>
          <Link to={`/posts/${post.id}`}>
            {post.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
```

---

## 5. Navegación Programática

### 🎯 useNavigate

```tsx
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const navigate = useNavigate();
  
  const handleLogin = async (credentials) => {
    const success = await login(credentials);
    
    if (success) {
      // Navegar después de login exitoso
      navigate('/dashboard');
    }
  };
  
  return <form onSubmit={handleLogin}>...</form>;
}
```

### 📋 Casos de Uso Comunes

#### 1. **Redirección después de acción**
```tsx
const handleSubmit = async () => {
  await createPost(data);
  navigate('/posts'); // Ir a lista de posts
};
```

#### 2. **Navegar atrás**
```tsx
<button onClick={() => navigate(-1)}>
  ← Volver
</button>
```

#### 3. **Reemplazar historial**
```tsx
// No agrega entrada al historial
navigate('/dashboard', { replace: true });
```

#### 4. **Navegación con estado**
```tsx
// Pasar datos sin URL
navigate('/profile', { 
  state: { from: '/settings', message: 'Perfil actualizado' } 
});

// En el componente destino
import { useLocation } from 'react-router-dom';

function Profile() {
  const location = useLocation();
  const message = location.state?.message;
  
  return <div>{message && <Alert>{message}</Alert>}</div>;
}
```

---

## 6. Rutas Protegidas ⭐

### 🔒 Método 1: Componente ProtectedRoute Básico

```tsx
// components/ProtectedRoute.tsx
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  isAuthenticated: boolean;
}

export function ProtectedRoute({ children, isAuthenticated }: ProtectedRouteProps) {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
}

// Uso:
<Route 
  path="/dashboard" 
  element={
    <ProtectedRoute isAuthenticated={user !== null}>
      <Dashboard />
    </ProtectedRoute>
  } 
/>
```

### 🎯 Método 2: Con Contexto de Autenticación

```tsx
// context/AuthContext.tsx
import { createContext, useContext, useState } from 'react';

interface AuthContextType {
  user: User | null;
  login: (credentials: Credentials) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  
  const login = async (credentials: Credentials) => {
    const user = await loginAPI(credentials);
    setUser(user);
  };
  
  const logout = () => setUser(null);
  
  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      isAuthenticated: user !== null 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return context;
}

// components/ProtectedRoute.tsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
}
```

### 🔄 Método 3: Con Redirección al Origen

```tsx
// components/ProtectedRoute.tsx
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  
  if (!isAuthenticated) {
    // Guardar la ubicación a la que intentaba acceder
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  return <>{children}</>;
}

// pages/LoginPage.tsx
import { useNavigate, useLocation } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  
  const from = location.state?.from?.pathname || '/dashboard';
  
  const handleLogin = async (credentials) => {
    await login(credentials);
    // Redirigir a la página original
    navigate(from, { replace: true });
  };
  
  return <LoginForm onSubmit={handleLogin} />;
}
```

### 👥 Método 4: Protección por Roles

```tsx
// types/auth.ts
export type UserRole = 'admin' | 'teacher' | 'student';

export interface User {
  id: string;
  name: string;
  role: UserRole;
}

// components/RoleBasedRoute.tsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface RoleBasedRouteProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
}

export function RoleBasedRoute({ children, allowedRoles }: RoleBasedRouteProps) {
  const { user, isAuthenticated } = useAuth();
  
  // No autenticado
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  // Autenticado pero sin permiso
  if (!allowedRoles.includes(user!.role)) {
    return <Navigate to="/unauthorized" replace />;
  }
  
  // Tiene permiso
  return <>{children}</>;
}

// Uso:
<Route 
  path="/admin" 
  element={
    <RoleBasedRoute allowedRoles={['admin']}>
      <AdminPanel />
    </RoleBasedRoute>
  } 
/>

<Route 
  path="/dashboard" 
  element={
    <RoleBasedRoute allowedRoles={['admin', 'teacher']}>
      <Dashboard />
    </RoleBasedRoute>
  } 
/>
```

### 📊 Flujo Visual de Rutas Protegidas

```
Usuario intenta acceder a /dashboard
         ↓
   ¿Está autenticado?
    ↙️          ↘️
  NO             SÍ
   ↓              ↓
Navigate      ¿Tiene rol
to /login      permitido?
   ↓          ↙️        ↘️
Guardar      NO         SÍ
ubicación     ↓          ↓
original   Navigate  Renderizar
           to /403   Dashboard
              ↓
         Login exitoso
              ↓
         Redirigir a
       ubicación original
```

---

## 7. Rutas Anidadas

### 🏗️ Layouts con Outlet

```tsx
// layouts/DashboardLayout.tsx
import { Outlet, NavLink } from 'react-router-dom';

export function DashboardLayout() {
  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <nav>
          <NavLink to="/dashboard">Overview</NavLink>
          <NavLink to="/dashboard/posts">Posts</NavLink>
          <NavLink to="/dashboard/users">Users</NavLink>
          <NavLink to="/dashboard/settings">Settings</NavLink>
        </nav>
      </aside>
      
      <main className="content">
        <Outlet /> {/* Aquí se renderizan las rutas hijas */}
      </main>
    </div>
  );
}

// routes/AppRoutes.tsx
<Route path="/dashboard" element={<DashboardLayout />}>
  <Route index element={<DashboardOverview />} />
  <Route path="posts" element={<DashboardPosts />} />
  <Route path="users" element={<DashboardUsers />} />
  <Route path="settings" element={<DashboardSettings />} />
</Route>
```

### 📂 Ejemplo Completo de Dashboard

```
/dashboard                    → DashboardLayout + DashboardOverview
/dashboard/posts              → DashboardLayout + DashboardPosts
/dashboard/posts/:id          → DashboardLayout + PostEdit
/dashboard/users              → DashboardLayout + DashboardUsers
/dashboard/settings           → DashboardLayout + Settings
```

```tsx
<Route path="/dashboard" element={
  <ProtectedRoute>
    <DashboardLayout />
  </ProtectedRoute>
}>
  <Route index element={<Overview />} />
  
  <Route path="posts">
    <Route index element={<PostsList />} />
    <Route path=":id" element={<PostEdit />} />
    <Route path="new" element={<PostCreate />} />
  </Route>
  
  <Route path="users" element={<UsersList />} />
  <Route path="settings" element={<Settings />} />
</Route>
```

---

## 8. Ejemplo Completo

### 🎯 App Integrada con Autenticación

```tsx
// App.tsx
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';

// Páginas públicas
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';

// Páginas protegidas
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import ProfilePage from './pages/Profile';
import SettingsPage from './pages/Settings';

// Página 404
import NotFoundPage from './pages/NotFound';

function AppRoutes() {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      
      {/* Rutas protegidas con layout */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      }>
        <Route index element={<Dashboard />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
      
      {/* 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}
```

---

## 9. Mejores Prácticas

### 📂 Organización de Rutas

```
src/
├── routes/
│   ├── index.tsx              # Exporta todas las rutas
│   ├── publicRoutes.tsx       # Rutas públicas
│   ├── protectedRoutes.tsx    # Rutas protegidas
│   └── adminRoutes.tsx        # Rutas de admin
│
├── pages/
│   ├── public/
│   │   ├── Home.tsx
│   │   └── Login.tsx
│   ├── protected/
│   │   └── Dashboard.tsx
│   └── admin/
│       └── AdminPanel.tsx
│
└── layouts/
    ├── MainLayout.tsx
    ├── DashboardLayout.tsx
    └── AuthLayout.tsx
```

### ⚡ Lazy Loading

```tsx
import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// Lazy loading de componentes
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Profile = lazy(() => import('./pages/Profile'));

function App() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Suspense>
  );
}
```

### 🍞 Breadcrumbs

```tsx
import { Link, useMatches } from 'react-router-dom';

function Breadcrumbs() {
  const matches = useMatches();
  
  return (
    <nav aria-label="breadcrumb">
      <ol>
        {matches.map((match, index) => (
          <li key={index}>
            {index < matches.length - 1 ? (
              <Link to={match.pathname}>{match.handle?.crumb}</Link>
            ) : (
              <span>{match.handle?.crumb}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

// En las rutas:
<Route 
  path="/dashboard" 
  element={<Dashboard />}
  handle={{ crumb: 'Dashboard' }}
/>
```

### ✅ Checklist de Mejores Prácticas

- [ ] **Organización**
  - [ ] Rutas en archivos separados
  - [ ] Páginas agrupadas por tipo
  - [ ] Layouts reutilizables

- [ ] **Rendimiento**
  - [ ] Lazy loading implementado
  - [ ] Code splitting por ruta
  - [ ] Suspense boundaries

- [ ] **Seguridad**
  - [ ] Rutas protegidas implementadas
  - [ ] Validación de roles
  - [ ] Redirección segura

- [ ] **UX**
  - [ ] Loading states
  - [ ] Página 404
  - [ ] Navegación clara
  - [ ] Breadcrumbs si es necesario

- [ ] **Accesibilidad**
  - [ ] Focus management
  - [ ] Skip links
  - [ ] ARIA labels
  - [ ] Anuncios de navegación

- [ ] **SEO**
  - [ ] Meta tags dinámicos
  - [ ] Títulos de página
  - [ ] Open Graph tags

---

## 📚 Recursos Adicionales

- [React Router Docs](https://reactrouter.com/)
- [React Router Tutorial](https://reactrouter.com/en/main/start/tutorial)
- [SPA Best Practices](https://web.dev/spa/)

---

**💻 Guía creada para clase de React | 2024**