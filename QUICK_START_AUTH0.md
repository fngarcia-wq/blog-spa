# 🚀 Quick Start - Auth0 en 5 Minutos

Guía rápida para poner en marcha Auth0 en tu proyecto.

---

## 📝 Paso 1: Configurar Auth0 (2 minutos)

1. **Crear cuenta**: Ve a [auth0.com](https://auth0.com) y regístrate
2. **Crear Application**:
   - Dashboard → Applications → Create Application
   - Nombre: `Blog SPA`
   - Tipo: `Single Page Web Applications`
3. **Configurar URLs** (en Settings):
   - **Allowed Callback URLs**: `http://localhost:5173, http://localhost:3000`
   - **Allowed Logout URLs**: `http://localhost:5173, http://localhost:3000`
   - **Allowed Web Origins**: `http://localhost:5173, http://localhost:3000`
   - Click **Save Changes**
4. **Copiar credenciales**:
   - Domain (ej: `dev-abc123.us.auth0.com`)
   - Client ID (ej: `abc123xyz456`)

---

## ⚙️ Paso 2: Configurar Frontend (1 minuto)

1. **Editar `.env`** en la raíz del proyecto:

```env
VITE_API_BASE_URL=http://laravel.test:80/api

# Auth0 - Pega tus valores aquí
VITE_AUTH0_DOMAIN=dev-abc123.us.auth0.com
VITE_AUTH0_CLIENT_ID=abc123xyz456
VITE_AUTH0_AUDIENCE=https://blog-api
VITE_AUTH0_REDIRECT_URI=http://localhost:5173
```

2. **Iniciar el servidor**:

```bash
npm run dev
```

3. **Probar**: Abre `http://localhost:5173`

---

## 🎉 ¡Listo!

Ya puedes:
- ✅ Ver la landing page
- ✅ Click en "Iniciar Sesión"
- ✅ Autenticarte con Auth0
- ✅ Acceder a las rutas protegidas

---

## 🔧 Paso 3: Backend (Opcional - 2 minutos)

Si quieres que el backend valide los tokens:

### Opción A: Instalación Rápida

```bash
cd tu-proyecto-laravel
composer require firebase/php-jwt
```

Copia el middleware de `BACKEND_CHANGES.md` → `app/Http/Middleware/Auth0Middleware.php`

Agrega a `.env` de Laravel:

```env
AUTH0_DOMAIN=dev-abc123.us.auth0.com
AUTH0_AUDIENCE=https://blog-api
```

### Opción B: Sin Backend

El frontend funciona sin cambios en el backend, pero:
- ⚠️ Las peticiones al backend fallarán si requieren autenticación
- ⚠️ Solo para pruebas rápidas

---

## 🐳 Con Docker

```bash
# 1. Configurar .env (como arriba)

# 2. Build
docker-compose build --no-cache frontend

# 3. Run
docker-compose up -d frontend

# 4. Visitar
# http://localhost:3000
```

---

## 🆘 Problemas Comunes

### "Error de Configuración"
→ Verifica que `.env` tenga `VITE_AUTH0_DOMAIN` y `VITE_AUTH0_CLIENT_ID`

### "Callback URL mismatch"
→ Agrega tu URL exacta en Auth0 Settings → Allowed Callback URLs

### "401 Unauthorized" en API
→ Implementa el middleware en el backend (ver `BACKEND_CHANGES.md`)

---

## 📚 Documentación Completa

- **Setup detallado**: Ver `AUTH0_SETUP.md`
- **Cambios en backend**: Ver `BACKEND_CHANGES.md`

---

## 🎯 Próximos Pasos

1. ✅ Configurar Auth0
2. ✅ Configurar Frontend
3. ⏳ Implementar validación en Backend
4. ⏳ Personalizar la UI
5. ⏳ Configurar roles y permisos
6. ⏳ Deploy a producción

¡Disfruta de Auth0! 🎉
