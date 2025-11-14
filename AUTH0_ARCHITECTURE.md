# 🏗️ Arquitectura de Auth0 - Blog SPA

## 📐 Diagrama de Arquitectura

```
┌─────────────────────────────────────────────────────────────────────┐
│                          USUARIO                                     │
│                            ↓                                         │
│                    http://localhost:5173                             │
└─────────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────────┐
│                      REACT SPA (Frontend)                            │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │ App.tsx                                                       │  │
│  │  └─ Auth0Provider (from @auth0/auth0-react)                  │  │
│  │      ├─ domain: dev-abc123.us.auth0.com                      │  │
│  │      ├─ clientId: abc123xyz                                  │  │
│  │      ├─ redirectUri: http://localhost:5173                   │  │
│  │      └─ audience: https://blog-api                           │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                              ↓                                       │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │ Routes                                                        │  │
│  │  ├─ / → LandingPage (público)                                │  │
│  │  ├─ /dashboard → ProtectedRoute                              │  │
│  │  ├─ /posts → ProtectedRoute                                  │  │
│  │  └─ /learning → ProtectedRoute                               │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                              ↓                                       │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │ useAuth0Integration Hook                                     │  │
│  │  ├─ isAuthenticated                                          │  │
│  │  ├─ user                                                      │  │
│  │  ├─ token                                                     │  │
│  │  ├─ login()                                                   │  │
│  │  └─ logout()                                                  │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                              ↓                                       │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │ Axios Interceptor (blogApi.ts)                               │  │
│  │  └─ Agrega: Authorization: Bearer <token>                    │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
                              ↓
                    ┌─────────┴─────────┐
                    ↓                   ↓
┌───────────────────────────┐  ┌──────────────────────────────────────┐
│      AUTH0 TENANT         │  │    BACKEND LARAVEL (API)             │
│  dev-abc123.us.auth0.com  │  │    http://laravel.test/api           │
├───────────────────────────┤  ├──────────────────────────────────────┤
│                           │  │                                      │
│ ┌───────────────────────┐ │  │ ┌──────────────────────────────────┐ │
│ │ Universal Login       │ │  │ │ Auth0Middleware                  │ │
│ │  ├─ Email/Password    │ │  │ │  ├─ Valida JWT                   │ │
│ │  ├─ Social (Google)   │ │  │ │  ├─ Verifica Audience            │ │
│ │  ├─ MFA (opcional)    │ │  │ │  ├─ Verifica Issuer              │ │
│ │  └─ Passwordless      │ │  │ │  └─ Sincroniza Usuario           │ │
│ └───────────────────────┘ │  │ └──────────────────────────────────┘ │
│            ↓              │  │               ↓                      │
│ ┌───────────────────────┐ │  │ ┌──────────────────────────────────┐ │
│ │ JWT Token Generation  │ │  │ │ Rutas Protegidas                 │ │
│ │  ├─ Access Token      │ │  │ │  ├─ GET /api/user                │ │
│ │  ├─ ID Token          │ │  │ │  ├─ GET /api/posts               │ │
│ │  └─ Refresh Token     │ │  │ │  ├─ POST /api/posts              │ │
│ └───────────────────────┘ │  │ │  └─ GET /api/comments            │ │
│            ↓              │  │ └──────────────────────────────────┘ │
│ ┌───────────────────────┐ │  │               ↓                      │
│ │ User Management       │ │  │ ┌──────────────────────────────────┐ │
│ │  ├─ User Database     │ │  │ │ Database (MySQL)                 │ │
│ │  ├─ Roles & Perms     │ │  │ │  ├─ users                        │ │
│ │  └─ User Metadata     │ │  │ │  ├─ posts                        │ │
│ └───────────────────────┘ │  │ │  └─ comments                     │ │
│                           │  │ └──────────────────────────────────┘ │
└───────────────────────────┘  └──────────────────────────────────────┘
```

---

## 🔄 Flujo de Autenticación Detallado

### 1️⃣ Inicio de Sesión

```
Usuario                Frontend              Auth0               Backend
  │                       │                    │                    │
  │  1. Visita /          │                    │                    │
  │─────────────────────→ │                    │                    │
  │                       │                    │                    │
  │  2. LandingPage       │                    │                    │
  │ ←─────────────────────│                    │                    │
  │                       │                    │                    │
  │  3. Click "Login"     │                    │                    │
  │─────────────────────→ │                    │                    │
  │                       │                    │                    │
  │                       │  4. loginWithRedirect()                 │
  │                       │─────────────────→  │                    │
  │                       │                    │                    │
  │  5. Redirect a Auth0  │                    │                    │
  │ ←─────────────────────┴──────────────────  │                    │
  │                                             │                    │
  │  6. Formulario de Login                     │                    │
  │ ←───────────────────────────────────────────│                    │
  │                                             │                    │
  │  7. Credenciales                            │                    │
  │─────────────────────────────────────────→  │                    │
  │                                             │                    │
  │                                             │  8. Valida         │
  │                                             │     credenciales   │
  │                                             │                    │
  │  9. Redirect + Token                        │                    │
  │ ←───────────────────────────────────────────│                    │
  │                       │                    │                    │
  │  10. Callback         │                    │                    │
  │─────────────────────→ │                    │                    │
  │                       │                    │                    │
  │                       │  11. handleRedirectCallback()           │
  │                       │─────────────────→  │                    │
  │                       │                    │                    │
  │                       │  12. Access Token  │                    │
  │                       │ ←─────────────────  │                    │
  │                       │                    │                    │
  │                       │  13. Guarda token en localStorage       │
  │                       │                    │                    │
  │  14. Redirect /dashboard                   │                    │
  │ ←─────────────────────│                    │                    │
```

### 2️⃣ Petición a la API

```
Frontend              Axios Interceptor      Backend              Database
  │                       │                    │                    │
  │  1. GET /api/posts    │                    │                    │
  │─────────────────────→ │                    │                    │
  │                       │                    │                    │
  │                       │  2. Obtiene token  │                    │
  │                       │     de localStorage│                    │
  │                       │                    │                    │
  │                       │  3. Agrega header  │                    │
  │                       │     Authorization: │                    │
  │                       │     Bearer <token> │                    │
  │                       │                    │                    │
  │                       │  4. Request + Token│                    │
  │                       │─────────────────→  │                    │
  │                       │                    │                    │
  │                       │                    │  5. Auth0Middleware│
  │                       │                    │     valida token   │
  │                       │                    │                    │
  │                       │                    │  6. Sincroniza     │
  │                       │                    │     usuario        │
  │                       │                    │─────────────────→  │
  │                       │                    │                    │
  │                       │                    │  7. User data      │
  │                       │                    │ ←─────────────────  │
  │                       │                    │                    │
  │                       │                    │  8. Ejecuta        │
  │                       │                    │     controlador    │
  │                       │                    │                    │
  │                       │                    │  9. Query posts    │
  │                       │                    │─────────────────→  │
  │                       │                    │                    │
  │                       │                    │  10. Posts data    │
  │                       │                    │ ←─────────────────  │
  │                       │                    │                    │
  │                       │  11. Response      │                    │
  │                       │ ←─────────────────  │                    │
  │                       │                    │                    │
  │  12. Posts data       │                    │                    │
  │ ←─────────────────────│                    │                    │
  │                       │                    │                    │
  │  13. Renderiza UI     │                    │                    │
```

### 3️⃣ Cierre de Sesión

```
Usuario                Frontend              Auth0               Backend
  │                       │                    │                    │
  │  1. Click "Logout"    │                    │                    │
  │─────────────────────→ │                    │                    │
  │                       │                    │                    │
  │                       │  2. logout()       │                    │
  │                       │─────────────────→  │                    │
  │                       │                    │                    │
  │                       │  3. Limpia sesión  │                    │
  │                       │     en Auth0       │                    │
  │                       │                    │                    │
  │                       │  4. Limpia         │                    │
  │                       │     localStorage   │                    │
  │                       │                    │                    │
  │  5. Redirect a /      │                    │                    │
  │ ←─────────────────────│                    │                    │
  │                       │                    │                    │
  │  6. LandingPage       │                    │                    │
  │ ←─────────────────────│                    │                    │
```

---

## 🔐 Estructura del Token JWT

### Access Token (ejemplo)

```json
{
  "header": {
    "alg": "RS256",
    "typ": "JWT",
    "kid": "abc123"
  },
  "payload": {
    "iss": "https://dev-abc123.us.auth0.com/",
    "sub": "auth0|123456789",
    "aud": [
      "https://blog-api",
      "https://dev-abc123.us.auth0.com/userinfo"
    ],
    "iat": 1234567890,
    "exp": 1234571490,
    "azp": "abc123xyz456",
    "scope": "openid profile email"
  },
  "signature": "..."
}
```

### Campos Importantes

- **iss** (Issuer): Quién emitió el token (Auth0)
- **sub** (Subject): ID único del usuario
- **aud** (Audience): Para quién es el token (tu API)
- **iat** (Issued At): Cuándo se emitió
- **exp** (Expiration): Cuándo expira
- **azp** (Authorized Party): Client ID de la app
- **scope**: Permisos del token

---

## 📦 Componentes Principales

### Frontend

```
┌─────────────────────────────────────────────┐
│ Auth0Provider                                │
│  └─ Configuración global de Auth0           │
│     ├─ domain                                │
│     ├─ clientId                              │
│     ├─ redirectUri                           │
│     └─ audience                              │
└─────────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────────┐
│ useAuth0Integration                          │
│  └─ Hook personalizado                       │
│     ├─ Obtiene token                         │
│     ├─ Sincroniza usuario                    │
│     └─ Expone métodos (login, logout)        │
└─────────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────────┐
│ ProtectedRoute                               │
│  └─ Componente de protección                │
│     ├─ Verifica autenticación                │
│     ├─ Muestra loading                       │
│     └─ Redirige si no autenticado            │
└─────────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────────┐
│ Axios Interceptor                            │
│  └─ Agrega token automáticamente             │
│     ├─ Lee de localStorage                   │
│     ├─ Agrega header Authorization           │
│     └─ Maneja errores 401                    │
└─────────────────────────────────────────────┘
```

### Backend (Pendiente de Implementar)

```
┌─────────────────────────────────────────────┐
│ Auth0Middleware                              │
│  └─ Valida tokens JWT                        │
│     ├─ Obtiene JWKS de Auth0                 │
│     ├─ Decodifica token                      │
│     ├─ Valida audience                       │
│     ├─ Valida issuer                         │
│     └─ Valida expiración                     │
└─────────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────────┐
│ User Sync                                    │
│  └─ Sincroniza usuario con DB                │
│     ├─ Busca por email                       │
│     ├─ Crea si no existe                     │
│     └─ Actualiza información                 │
└─────────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────────┐
│ Protected Routes                             │
│  └─ Rutas que requieren autenticación        │
│     ├─ GET /api/user                         │
│     ├─ GET /api/posts                        │
│     ├─ POST /api/posts                       │
│     └─ ...                                   │
└─────────────────────────────────────────────┘
```

---

## 🔒 Seguridad

### Validaciones en el Backend

```
┌─────────────────────────────────────────────┐
│ Token Validation Checklist                   │
├─────────────────────────────────────────────┤
│ ✅ Signature válida (RS256)                  │
│ ✅ Issuer correcto (tu tenant Auth0)         │
│ ✅ Audience correcto (tu API)                │
│ ✅ No expirado (exp > now)                   │
│ ✅ Emitido en el pasado (iat < now)          │
│ ✅ JWKS actualizado (cache)                  │
└─────────────────────────────────────────────┘
```

### Almacenamiento de Tokens

```
Frontend:
  └─ localStorage
     ├─ auth0_token (Access Token)
     └─ (Refresh Token manejado por SDK)

Backend:
  └─ No almacena tokens
     └─ Valida en cada request
```

---

## 🌐 Entornos

### Desarrollo Local

```
Frontend:  http://localhost:5173
Backend:   http://laravel.test/api
Auth0:     https://dev-abc123.us.auth0.com
```

### Docker

```
Frontend:  http://localhost:3000
Backend:   http://laravel.test/api
Auth0:     https://dev-abc123.us.auth0.com
```

### Producción (Ejemplo)

```
Frontend:  https://blog.tudominio.com
Backend:   https://api.tudominio.com
Auth0:     https://prod-xyz789.us.auth0.com
```

---

## 📊 Ventajas de esta Arquitectura

### ✅ Seguridad
- Tokens JWT firmados criptográficamente
- Validación en el backend
- Refresh tokens automáticos
- HTTPS en producción

### ✅ Escalabilidad
- Auth0 maneja millones de usuarios
- Stateless (no sesiones en servidor)
- Cache de JWKS

### ✅ Experiencia de Usuario
- Login rápido
- Social login disponible
- MFA opcional
- Recuperación de contraseña

### ✅ Mantenimiento
- Auth0 maneja actualizaciones de seguridad
- No gestión de contraseñas
- Cumplimiento de regulaciones

---

## 🎯 Próximos Pasos

1. ✅ Arquitectura definida
2. ✅ Frontend implementado
3. ⏳ Implementar backend
4. ⏳ Testing de integración
5. ⏳ Deploy a producción

---

**Última actualización**: 2024
**Versión**: 1.0.0
