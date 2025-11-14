# Configuración de Auth0 para Blog SPA

Este documento explica cómo configurar Auth0 para la autenticación de usuarios en el proyecto Blog SPA.

## 📋 Tabla de Contenidos

1. [Configuración en Auth0](#configuración-en-auth0)
2. [Configuración del Frontend](#configuración-del-frontend)
3. [Cambios Necesarios en el Backend](#cambios-necesarios-en-el-backend)
4. [Configuración con Docker](#configuración-con-docker)
5. [Testing](#testing)

---

## 🔐 Configuración en Auth0

### 1. Crear una cuenta en Auth0

1. Ve a [auth0.com](https://auth0.com) y crea una cuenta gratuita
2. Crea un nuevo tenant (ej: `mi-blog-dev`)

### 2. Crear una Application

1. En el dashboard de Auth0, ve a **Applications** → **Applications**
2. Click en **Create Application**
3. Nombre: `Blog SPA`
4. Tipo: **Single Page Web Applications**
5. Click en **Create**

### 3. Configurar la Application

En la pestaña **Settings** de tu aplicación:

#### Allowed Callback URLs
```
http://localhost:3000,
http://localhost:5173,
https://tu-dominio-produccion.com
```

#### Allowed Logout URLs
```
http://localhost:3000,
http://localhost:5173,
https://tu-dominio-produccion.com
```

#### Allowed Web Origins
```
http://localhost:3000,
http://localhost:5173,
https://tu-dominio-produccion.com
```

#### Allowed Origins (CORS)
```
http://localhost:3000,
http://localhost:5173,
https://tu-dominio-produccion.com
```

**Guarda los cambios**

### 4. Obtener las credenciales

En la misma página de Settings, anota:
- **Domain** (ej: `dev-abc123.us.auth0.com`)
- **Client ID** (ej: `abc123xyz456`)

### 5. Crear una API (Opcional pero recomendado)

Si tu backend Laravel necesita validar tokens:

1. Ve a **Applications** → **APIs**
2. Click en **Create API**
3. Nombre: `Blog API`
4. Identifier: `https://blog-api` (este será tu AUDIENCE)
5. Signing Algorithm: `RS256`
6. Click en **Create**

---

## ⚛️ Configuración del Frontend

### 1. Variables de Entorno

Crea o actualiza el archivo `.env` en la raíz del proyecto:

```env
VITE_API_BASE_URL=http://laravel.test:80/api

# Auth0 Configuration
VITE_AUTH0_DOMAIN=dev-abc123.us.auth0.com
VITE_AUTH0_CLIENT_ID=tu-client-id-aqui
VITE_AUTH0_AUDIENCE=https://blog-api
VITE_AUTH0_REDIRECT_URI=http://localhost:3000
```

### 2. Instalación (Ya realizada)

El paquete `@auth0/auth0-react` ya está instalado. Si necesitas reinstalar:

```bash
npm install @auth0/auth0-react
```

### 3. Estructura de Archivos Creados

```
src/
├── config/
│   └── auth0.config.ts          # Configuración de Auth0
├── hooks/
│   └── useAuth0Integration.tsx  # Hook personalizado para Auth0
└── pages/
    └── LandingPage.tsx          # Página de inicio con login
```

---

## 🔧 Cambios Necesarios en el Backend

### Opción 1: Validación de Tokens Auth0 (Recomendado)

Tu backend Laravel debe validar los tokens JWT de Auth0. Aquí están los pasos:

#### 1. Instalar dependencias

```bash
composer require auth0/auth0-php
composer require firebase/php-jwt
```

#### 2. Crear Middleware para Auth0

Crea `app/Http/Middleware/Auth0Middleware.php`:

```php
<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Firebase\JWT\JWT;
use Firebase\JWT\JWK;
use Firebase\JWT\Key;

class Auth0Middleware
{
    public function handle(Request $request, Closure $next)
    {
        $token = $request->bearerToken();

        if (!$token) {
            return response()->json(['error' => 'Token no proporcionado'], 401);
        }

        try {
            // Obtener las claves públicas de Auth0
            $domain = env('AUTH0_DOMAIN');
            $jwksUrl = "https://{$domain}/.well-known/jwks.json";
            $jwks = json_decode(file_get_contents($jwksUrl), true);
            
            // Decodificar el token
            $decoded = JWT::decode($token, JWK::parseKeySet($jwks));
            
            // Validar el audience
            if ($decoded->aud !== env('AUTH0_AUDIENCE')) {
                return response()->json(['error' => 'Token inválido'], 401);
            }

            // Agregar información del usuario al request
            $request->merge(['auth0_user' => $decoded]);

            return $next($request);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Token inválido: ' . $e->getMessage()], 401);
        }
    }
}
```

#### 3. Configurar variables de entorno en Laravel

Agrega a tu `.env` del backend:

```env
AUTH0_DOMAIN=dev-abc123.us.auth0.com
AUTH0_AUDIENCE=https://blog-api
```

#### 4. Registrar el Middleware

En `app/Http/Kernel.php`:

```php
protected $routeMiddleware = [
    // ... otros middlewares
    'auth0' => \App\Http\Middleware\Auth0Middleware::class,
];
```

#### 5. Aplicar el Middleware a las rutas

En `routes/api.php`:

```php
// Rutas protegidas con Auth0
Route::middleware('auth0')->group(function () {
    Route::get('/user', function (Request $request) {
        $auth0User = $request->get('auth0_user');
        
        // Sincronizar o crear usuario en tu base de datos
        $user = User::firstOrCreate(
            ['email' => $auth0User->email],
            [
                'name' => $auth0User->name ?? $auth0User->email,
                'email_verified_at' => $auth0User->email_verified ? now() : null,
            ]
        );
        
        return response()->json($user);
    });
    
    Route::apiResource('posts', PostController::class);
    Route::apiResource('comments', CommentController::class);
});
```

### Opción 2: Sistema Híbrido (Auth0 + Laravel Sanctum)

Si quieres mantener compatibilidad con el sistema actual:

```php
// En routes/api.php
Route::middleware(['auth0'])->group(function () {
    // Rutas que aceptan Auth0
});

Route::middleware(['auth:sanctum'])->group(function () {
    // Rutas que aceptan Sanctum (sistema anterior)
});
```

### Opción 3: Solo Frontend (Desarrollo rápido)

Si solo quieres probar Auth0 sin modificar el backend:

1. El frontend ya está configurado para enviar el token en el header `Authorization`
2. Temporalmente, puedes deshabilitar la validación de tokens en el backend
3. **⚠️ NO RECOMENDADO PARA PRODUCCIÓN**

---

## 🐳 Configuración con Docker

### 1. Variables de Entorno para Docker

Las variables de Auth0 se pasan al contenedor durante el build. Asegúrate de tener un archivo `.env` en la raíz con:

```env
VITE_AUTH0_DOMAIN=dev-abc123.us.auth0.com
VITE_AUTH0_CLIENT_ID=tu-client-id
VITE_AUTH0_AUDIENCE=https://blog-api
```

### 2. Build con Docker Compose

```bash
docker-compose build --no-cache frontend
docker-compose up -d frontend
```

### 3. Verificar las variables

```bash
docker-compose logs frontend
```

### 4. Actualizar Allowed URLs en Auth0

No olvides agregar la URL de Docker a Auth0:
- `http://localhost:3000` (puerto expuesto por Docker)

---

## 🧪 Testing

### 1. Desarrollo Local (sin Docker)

```bash
npm run dev
```

Visita `http://localhost:5173`

### 2. Con Docker

```bash
docker-compose up -d frontend
```

Visita `http://localhost:3000`

### 3. Verificar el flujo

1. Deberías ver la Landing Page
2. Click en "Iniciar Sesión / Registrarse"
3. Serás redirigido a Auth0
4. Después del login, volverás a la app autenticado
5. Podrás acceder a `/dashboard`, `/posts`, etc.

---

## 🔍 Troubleshooting

### Error: "VITE_AUTH0_DOMAIN no está configurado"

- Verifica que el archivo `.env` existe y tiene las variables correctas
- Reinicia el servidor de desarrollo: `npm run dev`

### Error: "Callback URL mismatch"

- Verifica que la URL en **Allowed Callback URLs** en Auth0 coincida exactamente con tu URL local
- Incluye `http://localhost:5173` para desarrollo y `http://localhost:3000` para Docker

### Error 401 en las peticiones al backend

- El backend no está validando correctamente el token de Auth0
- Implementa el middleware Auth0 en Laravel (ver sección de Backend)

### El usuario no se guarda en la base de datos

- Implementa la sincronización de usuarios en el endpoint `/api/user`
- Ver ejemplo en la sección "Cambios Necesarios en el Backend"

---

## 📚 Recursos Adicionales

- [Auth0 React SDK Documentation](https://auth0.com/docs/quickstart/spa/react)
- [Auth0 Laravel API Documentation](https://auth0.com/docs/quickstart/backend/php)
- [JWT.io - Debugger](https://jwt.io/)

---

## 🎯 Próximos Pasos

1. ✅ Configurar Auth0 tenant y application
2. ✅ Configurar variables de entorno
3. ⏳ Implementar validación de tokens en el backend
4. ⏳ Sincronizar usuarios de Auth0 con la base de datos
5. ⏳ Configurar roles y permisos en Auth0 (opcional)
6. ⏳ Implementar refresh tokens
7. ⏳ Configurar MFA (Multi-Factor Authentication) (opcional)

---

## 📝 Notas Importantes

- **Seguridad**: Nunca commits el archivo `.env` con credenciales reales
- **Producción**: Usa variables de entorno del servidor, no archivos `.env`
- **HTTPS**: En producción, siempre usa HTTPS
- **Tokens**: Los tokens de Auth0 expiran. El SDK maneja el refresh automáticamente
- **Costos**: Auth0 tiene un tier gratuito con límites. Revisa los precios para producción
