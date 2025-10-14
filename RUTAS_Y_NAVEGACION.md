# 🗺️ Rutas y Navegación - Blog SPA

## 📍 Mapa de Rutas

### Rutas Públicas (No requieren autenticación)

#### `/login` - Página de Login
- Formulario de inicio de sesión
- Validación de email y contraseña
- Manejo de errores de autenticación
- Link a registro
- **Redirección**: Al hacer login exitoso → `/dashboard`

#### `/register` - Página de Registro
- Formulario de registro de usuario
- Validación de campos (nombre, email, contraseña)
- Manejo de errores de validación
- Link a login
- **Redirección**: Al registrarse exitosamente → `/dashboard`

---

### Rutas Protegidas (Requieren autenticación)

#### `/` - Raíz
- **Redirección automática**: → `/dashboard`

#### `/dashboard` - Dashboard Principal
Panel de control con navegación por pestañas:

##### 🏠 Pestaña: Inicio
- Página de bienvenida
- Resumen de funcionalidades
- Lista de conceptos implementados

##### 📚 Pestaña: State Management
- Acceso rápido a las clases anteriores
- Link a `/learning` para contenido completo
- Conceptos: Context API, Redux, Zustand

##### 📝 Pestaña: API - Posts
- **Aplicación funcional**: Crear y listar posts en vivo
- **Comparaciones**: Código Axios vs Fetch lado a lado
- **Link**: Botón para ir a `/posts` (vista completa)
- Ejemplos de:
  - GET - Listar posts
  - POST - Crear post
  - DELETE - Eliminar post

##### 🔐 Pestaña: API - Login
- **Comparaciones**: Implementación de login con Axios vs Fetch
- Ejemplos de:
  - POST /login
  - Manejo de tokens
  - Interceptores vs manual
  - Almacenamiento de tokens

##### 💬 Pestaña: API - Comments
- **Comparaciones**: CRUD de comentarios con Axios vs Fetch
- Ejemplos de:
  - GET - Listar comentarios
  - POST - Crear comentario
  - PUT - Actualizar comentario
  - DELETE - Eliminar comentario

##### ⚖️ Pestaña: Comparaciones
- **Tabla comparativa**: Axios vs Fetch (características)
- **Buenas prácticas**: 5 prácticas esenciales con código
- **Cuándo usar cada uno**: Guía de decisión
- Comparación de:
  - Instalación
  - JSON automático
  - Interceptores
  - Manejo de errores
  - Timeout
  - Sintaxis

#### `/posts` - Vista Completa de Posts
- Aplicación dedicada de posts
- Layout con sidebar para crear posts
- Lista completa de posts con detalles
- Funcionalidades:
  - Ver todos los posts
  - Crear nuevo post
  - Eliminar posts propios
  - Ver autor y comentarios
  - Cerrar sesión

#### `/learning` - State Management Learning
- Contenido completo de las clases anteriores
- Ejemplos de Context API
- Ejemplos de Redux Toolkit
- Ejemplos de Zustand
- Comparaciones y buenas prácticas

---

## 🔐 Sistema de Autenticación

### Flujo de Autenticación

```
1. Usuario no autenticado
   ↓
2. Intenta acceder a ruta protegida
   ↓
3. ProtectedRoute verifica token
   ↓
4. Si NO tiene token → Redirige a /login
   ↓
5. Usuario hace login/register
   ↓
6. Token guardado en localStorage
   ↓
7. Redirige a /dashboard
   ↓
8. Puede acceder a todas las rutas protegidas
```

### Verificación de Autenticación

```typescript
// En cada ruta protegida
function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
}
```

---

## 🎯 Navegación entre Secciones

### Desde el Dashboard

```typescript
// Navegación por pestañas (sin cambiar URL)
const [activeSection, setActiveSection] = useState('home');

// Cambiar pestaña
setActiveSection('api-posts');
```

### Links a Otras Páginas

```typescript
// Desde Dashboard a Learning completo
<Link to="/learning">
  Ir a State Management Learning →
</Link>

// Desde Dashboard a Posts completo
<Link to="/posts">
  Ver Aplicación Completa de Posts →
</Link>
```

### Cerrar Sesión

```typescript
// Desde cualquier página autenticada
const handleLogout = async () => {
  await logout(); // Limpia token
  navigate('/login'); // Redirige a login
};
```

---

## 📱 Estructura de Navegación

```
┌─────────────────────────────────────┐
│         RUTAS PÚBLICAS              │
├─────────────────────────────────────┤
│  /login      → LoginPage            │
│  /register   → RegisterPage         │
└─────────────────────────────────────┘
                ↓ (login exitoso)
┌─────────────────────────────────────┐
│       RUTAS PROTEGIDAS              │
├─────────────────────────────────────┤
│  /            → Redirect /dashboard │
│  /dashboard   → DashboardPage       │
│    ├─ 🏠 Inicio                     │
│    ├─ 📚 State Management           │
│    ├─ 📝 API - Posts                │
│    ├─ 🔐 API - Login                │
│    ├─ 💬 API - Comments             │
│    └─ ⚖️ Comparaciones              │
│  /posts       → PostsPage           │
│  /learning    → StateManagement     │
└─────────────────────────────────────┘
```

---

## 🎨 Características de la Navegación

### Header (En todas las páginas protegidas)
- Título de la aplicación
- Nombre del usuario logueado
- Botón de cerrar sesión

### Navegación por Pestañas (Dashboard)
- Botones horizontales con scroll
- Indicador visual de pestaña activa
- Cambio de contenido sin recargar página
- Responsive (scroll horizontal en móvil)

### Breadcrumbs Implícitos
- Dashboard → Sección actual
- Links para navegación profunda

---

## 💡 Tips de Navegación

### Para Estudiantes

1. **Empezar por el Dashboard**
   - Ir a `/dashboard` después de login
   - Explorar cada pestaña en orden

2. **Ver Comparaciones**
   - Pestaña "API - Posts" muestra código lado a lado
   - Pestaña "Comparaciones" tiene tabla completa

3. **Probar Funcionalidad**
   - Crear posts en la pestaña "API - Posts"
   - Ver la aplicación completa en `/posts`

4. **Revisar Clases Anteriores**
   - Pestaña "State Management" para acceso rápido
   - `/learning` para contenido completo

### Para Profesores

1. **Demostración en Clase**
   ```
   Login → Dashboard → API - Posts (mostrar comparaciones)
   → Crear post en vivo → Comparaciones (buenas prácticas)
   ```

2. **Ejercicios**
   - Pedir que naveguen a cada sección
   - Comparar código Axios vs Fetch
   - Implementar nuevas funcionalidades

3. **Evaluación**
   - Verificar comprensión de rutas protegidas
   - Entender flujo de autenticación
   - Identificar buenas prácticas

---

## 🔧 Personalización de Rutas

### Agregar Nueva Ruta Protegida

```typescript
// En App.tsx
<Route
  path="/nueva-ruta"
  element={
    <ProtectedRoute>
      <NuevaPagina />
    </ProtectedRoute>
  }
/>
```

### Agregar Nueva Pestaña en Dashboard

```typescript
// En DashboardPage.tsx
type Section = 'home' | 'learning' | 'nueva-seccion';

// Agregar botón
<button onClick={() => setActiveSection('nueva-seccion')}>
  Nueva Sección
</button>

// Agregar contenido
{activeSection === 'nueva-seccion' && <NuevaSeccion />}
```

---

## 🚀 Inicio Rápido

### Primera Vez

1. Ir a `http://localhost:5173`
2. Serás redirigido a `/login`
3. Hacer clic en "Regístrate aquí"
4. Completar formulario de registro
5. Serás redirigido a `/dashboard`
6. Explorar las pestañas

### Sesión Existente

1. Ir a `http://localhost:5173`
2. Si tienes token válido → `/dashboard`
3. Si no → `/login`

---

## 📊 Resumen de URLs

| URL | Descripción | Autenticación |
|-----|-------------|---------------|
| `/` | Raíz (redirige a dashboard) | ✅ Requerida |
| `/login` | Página de login | ❌ Pública |
| `/register` | Página de registro | ❌ Pública |
| `/dashboard` | Dashboard con pestañas | ✅ Requerida |
| `/posts` | Vista completa de posts | ✅ Requerida |
| `/learning` | State Management completo | ✅ Requerida |

---

## 🎓 Conceptos Aprendidos

- ✅ React Router (BrowserRouter, Routes, Route)
- ✅ Rutas protegidas (ProtectedRoute)
- ✅ Navegación programática (useNavigate)
- ✅ Links declarativos (Link)
- ✅ Redirecciones (Navigate)
- ✅ Navegación por pestañas (useState)
- ✅ Persistencia de autenticación (localStorage)
- ✅ Context API para estado global (useAuth)

---

¡Explora todas las secciones y compara las diferentes implementaciones! 🚀
