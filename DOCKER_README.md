# 🐳 Guía de Dockerización - Blog SPA

Este proyecto React está completamente dockerizado y listo para conectarse con una API Laravel.

## 📋 Requisitos Previos

- Docker Desktop instalado
- Docker Compose instalado
- Proyecto Laravel API (opcional, ver configuración)

## 🚀 Inicio Rápido

### 1. Configurar Variables de Entorno

```bash
# Copiar el archivo de ejemplo
copy .env.example .env
```

Edita `.env` y ajusta la URL de tu API:
```env
VITE_API_URL=http://localhost:8000/api
```

### 2. Construir y Ejecutar

```bash
# Construir y ejecutar todos los servicios
docker-compose up --build

# O en segundo plano
docker-compose up -d --build
```

### 3. Acceder a los Servicios

- **Frontend React**: http://localhost:3000
- **Backend Laravel**: http://localhost:8000
- **MySQL**: localhost:3306

## 🏗️ Estructura de Contenedores

```
┌─────────────────┐
│  Frontend       │
│  React + Nginx  │
│  Puerto: 3000   │
└────────┬────────┘
         │
         │ API Calls
         ▼
┌─────────────────┐
│  Backend        │
│  Laravel + PHP  │
│  Puerto: 8000   │
└────────┬────────┘
         │
         │ Database
         ▼
┌─────────────────┐
│  MySQL 8.0      │
│  Puerto: 3306   │
└─────────────────┘
```

## 📦 Servicios Incluidos

### Frontend (React SPA)
- **Base**: Node.js 20 Alpine + Nginx Alpine
- **Build**: Multi-stage optimizado
- **Características**:
  - Compresión gzip
  - Cache de assets estáticos
  - Soporte para React Router (SPA)
  - Headers de seguridad
  - Health checks

### Backend (Laravel API)
- **Base**: PHP 8.2 FPM Alpine
- **Puerto**: 8000
- **Volumen**: Monta tu proyecto Laravel desde `../blog-api`

### MySQL
- **Versión**: 8.0
- **Puerto**: 3306
- **Credenciales**:
  - Usuario: `blog_user`
  - Contraseña: `secret`
  - Base de datos: `blog_db`


## 🛠️ Comandos Útiles

### Gestión de Contenedores

```bash
# Ver logs
docker-compose logs -f

# Ver logs de un servicio específico
docker-compose logs -f frontend

# Detener servicios
docker-compose down

# Detener y eliminar volúmenes
docker-compose down -v

# Reconstruir sin cache
docker-compose build --no-cache

# Ver estado de servicios
docker-compose ps
```

### Desarrollo

```bash
# Ejecutar comando en el contenedor frontend
docker-compose exec frontend sh

# Ejecutar comando en el contenedor backend
docker-compose exec backend sh

# Ver logs en tiempo real
docker-compose logs -f --tail=100
```

### Base de Datos

```bash
# Acceder a MySQL
docker-compose exec mysql mysql -u blog_user -psecret blog_db

# Backup de la base de datos
docker-compose exec mysql mysqldump -u blog_user -psecret blog_db > backup.sql

# Restaurar backup
docker-compose exec -T mysql mysql -u blog_user -psecret blog_db < backup.sql
```

## ⚙️ Configuración Personalizada

### Cambiar Puerto del Frontend

Edita `docker-compose.yml`:
```yaml
frontend:
  ports:
    - "8080:80"  # Cambiar 3000 por el puerto que prefieras
```

### Conectar con API Laravel Existente

**Opción 1: Laravel en otro contenedor Docker**

Si tu API Laravel ya tiene su propio Dockerfile:
```yaml
backend:
  build:
    context: ../blog-api
    dockerfile: Dockerfile
  # ... resto de configuración
```

**Opción 2: Laravel en tu máquina local**

1. Comenta o elimina el servicio `backend` del `docker-compose.yml`
2. Actualiza `.env`:
```env
VITE_API_URL=http://host.docker.internal:8000/api
```

**Opción 3: API en servidor remoto**
```env
VITE_API_URL=https://api.tudominio.com/api
```

### Variables de Entorno en Build

Para cambiar la URL de la API durante el build:
```bash
docker-compose build --build-arg VITE_API_URL=https://api.produccion.com/api
```

O edita `docker-compose.yml`:
```yaml
frontend:
  build:
    args:
      VITE_API_URL: https://api.produccion.com/api
```

## 🔧 Configuración de Nginx

El archivo `nginx.conf` incluye:

- ✅ Soporte para React Router (SPA routing)
- ✅ Compresión gzip
- ✅ Cache de assets estáticos (1 año)
- ✅ No-cache para `index.html`
- ✅ Headers de seguridad
- ✅ Proxy a API (comentado, opcional)

### Habilitar Proxy a API desde Nginx

Si quieres que Nginx haga de proxy a la API, descomenta en `nginx.conf`:
```nginx
location /api {
    proxy_pass http://backend:8000;
    # ... resto de configuración
}
```

## 🐛 Troubleshooting

### Error: Cannot connect to API

1. Verifica que el servicio backend esté corriendo:
```bash
docker-compose ps
```

2. Verifica la URL de la API en `.env`

3. Verifica CORS en tu API Laravel

### Error: Port already in use

Cambia los puertos en `docker-compose.yml`:
```yaml
ports:
  - "3001:80"  # Frontend
  - "8001:8000"  # Backend
  - "3307:3306"  # MySQL
```

### Reconstruir después de cambios

```bash
# Detener todo
docker-compose down

# Reconstruir
docker-compose up --build
```

### Limpiar todo y empezar de cero

```bash
# Detener y eliminar todo
docker-compose down -v

# Eliminar imágenes
docker-compose down --rmi all

# Reconstruir
docker-compose up --build
```

## 📊 Optimizaciones de Producción

### 1. Habilitar HTTPS con Let's Encrypt

Agrega un servicio de Nginx Proxy con certbot o usa Traefik.

### 2. Reducir Tamaño de Imagen

La imagen usa multi-stage build y Alpine, ya está optimizada (~30MB final).

### 3. Variables de Entorno de Producción

Crea un archivo `docker-compose.prod.yml`:
```yaml
services:
  frontend:
    build:
      args:
        VITE_API_URL: https://api.produccion.com/api
    environment:
      - NODE_ENV=production
```

Ejecutar:
```bash
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

## 📚 Recursos Adicionales

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Nginx Documentation](https://nginx.org/en/docs/)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)

## 🤝 Contribuir

Si encuentras problemas o mejoras, ¡las contribuciones son bienvenidas!

---

**Nota**: Asegúrate de configurar CORS correctamente en tu API Laravel para permitir peticiones desde `http://localhost:3000`.
