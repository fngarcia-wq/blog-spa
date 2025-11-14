# Multi-stage build para optimizar el tamaño de la imagen

# ====================================
# Etapa 1: Build
# ====================================
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm ci

# Copiar código fuente
COPY . .

# Argumento para la URL de la API (puede ser sobreescrito en docker-compose)
ARG VITE_API_URL=http://laravel.test:80/api
ENV VITE_API_URL=$VITE_API_URL

# Build de producción
RUN npm run build:skip-check

# ====================================
# Etapa 2: Producción con Nginx
# ====================================
FROM nginx:alpine

# Copiar build desde la etapa anterior
COPY --from=builder /app/dist /usr/share/nginx/html

# Copiar configuración personalizada de nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer puerto 80
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost/ || exit 1

# Nginx en foreground
CMD ["nginx", "-g", "daemon off;"]
