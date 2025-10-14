# 🚀 Integración de API REST - Blog SPA

## ✅ Implementación Completada

Se ha implementado un sistema completo de consumo de API REST con las siguientes características:

### 📦 Dependencias Instaladas
- ✅ **axios** - Cliente HTTP para peticiones
- ✅ **react-router-dom** - Navegación entre páginas

### 🏗️ Estructura Creada

```
src/
├── api/
│   └── blogApi.ts              # Configuración de Axios con interceptores
├── types/
│   └── api.ts                  # Tipos TypeScript para la API
├── utils/
│   └── errorHandler.ts         # Manejo centralizado de errores
├── services/
│   ├── authService.ts          # Servicio de autenticación
│   ├── postsService.ts         # Servicio de posts (CRUD completo)
│   └── commentsService.ts      # Servicio de comentarios (CRUD completo)
├── hooks/
│   ├── useAuth.tsx             # Hook y Context de autenticación
│   ├── usePosts.ts             # Hook para manejo de posts
│   └── useComments.ts          # Hook para manejo de comentarios
├── components/
│   ├── ui/
│   │   ├── LoadingSpinner.tsx  # Componente de loading
│   │   └── ErrorMessage.tsx    # Componente de error
│   ├── auth/
│   │   ├── LoginForm.tsx       # Formulario de login
│   │   └── RegisterForm.tsx    # Formulario de registro
│   └── posts/
│       ├── PostsList.tsx       # Lista de posts
│       └── CreatePostForm.tsx  # Formulario crear post
└── pages/
    ├── LoginPage.tsx           # Página de login
    ├── RegisterPage.tsx        # Página de registro
    └── PostsPage.tsx           # Página principal de posts
```

---

## 🎯 Características Implementadas

### 1. Configuración de Axios
- ✅ BaseURL configurable desde `.env`
- ✅ Timeout de 10 segundos
- ✅ Interceptor de request para agregar token automáticamente
- ✅ Interceptor de response para manejo de errores 401
- ✅ Logs en modo desarrollo

### 2. Servicios Completos

#### AuthService
- `hello()` - Verificar conexión
- `register(userData)` - Registro de usuario
- `login(credentials)` - Inicio de sesión
- `getCurrentUser()` - Obtener usuario actual
- `logout()` - Cerrar sesión
- `isAuthenticated()` - Verificar autenticación
- `getToken()` - Obtener token actual

#### PostsService
- `getAll()` - Listar todos los posts
- `getById(id)` - Obtener post por ID
- `create(postData)` - Crear nuevo post
- `update(id, postData)` - Actualizar post completo (PUT)
- `partialUpdate(id, postData)` - Actualizar parcial (PATCH)
- `delete(id)` - Eliminar post

#### CommentsService
- `getAll()` - Listar todos los comentarios
- `getById(id)` - Obtener comentario por ID
- `create(commentData)` - Crear comentario
- `update(id, content)` - Actualizar comentario
- `partialUpdate(id, content)` - Actualizar parcial
- `delete(id)` - Eliminar comentario

### 3. Manejo de Errores
- ✅ Clase `ApiError` personalizada
- ✅ Función `handleApiError()` centralizada
- ✅ Manejo específico por código de estado (400, 401, 404, 422, 500, etc.)
- ✅ Mensajes descriptivos para el usuario
- ✅ Manejo de errores de validación (422)

### 4. Loading States
- ✅ Estados de loading por operación
- ✅ Componente `LoadingSpinner` reutilizable
- ✅ Deshabilitar botones durante loading
- ✅ Feedback visual claro

### 5. Autenticación
- ✅ Context API con `AuthProvider`
- ✅ Hook `useAuth` para acceder al contexto
- ✅ Almacenamiento de token en localStorage
- ✅ Verificación automática al cargar la app
- ✅ Rutas protegidas con `ProtectedRoute`
- ✅ Redirección automática en 401

### 6. UI/UX
- ✅ Formularios con validación
- ✅ Mensajes de error descriptivos
- ✅ Mensajes de éxito
- ✅ Loading spinners
- ✅ Confirmación antes de eliminar
- ✅ Diseño responsive con Tailwind CSS

---

## 🚀 Cómo Usar

### 1. Configurar Variables de Entorno

El archivo `.env` ya está creado con:
```env
VITE_API_BASE_URL=http://localhost:3000/api
```

Si tu API está en otra URL, modifica este archivo.

### 2. Iniciar el Servidor de Desarrollo

```bash
npm run dev
```

### 3. Flujo de Uso

1. **Registro**: Ir a `/register` o hacer clic en "Regístrate aquí"
   - Ingresar nombre, email y contraseña
   - Al registrarse, se guarda el token y redirige a `/dashboard`

2. **Login**: Ir a `/login`
   - Ingresar email y contraseña
   - Al iniciar sesión, se guarda el token y redirige a `/dashboard`

3. **Dashboard**: En `/dashboard` (requiere autenticación)
   - **🏠 Inicio**: Página de bienvenida con información general
   - **📚 State Management**: Acceso a las clases anteriores de manejo de estado
   - **📝 API - Posts**: Ver y crear posts con comparaciones Axios vs Fetch
   - **🔐 API - Login**: Ejemplos de autenticación con comparaciones
   - **💬 API - Comments**: Ejemplos de CRUD de comentarios con comparaciones
   - **⚖️ Comparaciones**: Tabla comparativa y buenas prácticas

4. **Rutas Adicionales**:
   - `/posts` - Aplicación completa de posts (vista dedicada)
   - `/learning` - State Management Learning completo

---

## 📝 Endpoints de la API

### Públicos (No requieren token)
- `GET /api/hello` - Mensaje de prueba
- `POST /api/register` - Registro
- `POST /api/login` - Login

### Protegidos (Requieren Bearer Token)
- `GET /api/user` - Usuario actual
- `GET /api/logout` - Logout
- `GET /api/posts` - Listar posts
- `POST /api/posts` - Crear post
- `GET /api/posts/{id}` - Ver post
- `PUT /api/posts/{id}` - Actualizar post
- `PATCH /api/posts/{id}` - Actualizar parcial
- `DELETE /api/posts/{id}` - Eliminar post
- `GET /api/comments` - Listar comentarios
- `POST /api/comments` - Crear comentario
- `GET /api/comments/{id}` - Ver comentario
- `PUT /api/comments/{id}` - Actualizar comentario
- `DELETE /api/comments/{id}` - Eliminar comentario

---

## 🔧 Personalización

### Agregar Nuevos Endpoints

1. **Crear el servicio** en `src/services/`:
```typescript
export const miServicio = {
  metodo: async () => {
    const response = await blogApi.get('/endpoint');
    return response.data;
  }
};
```

2. **Crear el hook** en `src/hooks/`:
```typescript
export function useMiHook() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  // ... lógica del hook
  return { data, loading, ... };
}
```

3. **Usar en componente**:
```typescript
function MiComponente() {
  const { data, loading } = useMiHook();
  // ... render
}
```

### Modificar Estilos

Los componentes usan Tailwind CSS. Para modificar estilos, edita las clases en cada componente.

---

## 🐛 Debugging

### Ver Logs de API

En modo desarrollo, todos los requests y responses se loguean en la consola:
- 🚀 Request: método, URL y datos
- ✅ Response exitosa: status y datos
- ❌ Response con error: status, datos y URL

### Verificar Token

```javascript
// En la consola del navegador
localStorage.getItem('access_token')
```

### Limpiar Token Manualmente

```javascript
// En la consola del navegador
localStorage.removeItem('access_token')
```

---

## ✅ Buenas Prácticas Implementadas

1. **Centralización**: Configuración de Axios en un solo lugar
2. **Separación de responsabilidades**: Servicios, hooks y componentes separados
3. **Manejo de errores**: Centralizado y descriptivo
4. **TypeScript**: Tipos para toda la API
5. **Loading states**: Feedback visual en todas las operaciones
6. **Validación**: Validación de formularios antes de enviar
7. **Seguridad**: Tokens en localStorage, rutas protegidas
8. **Interceptores**: Token agregado automáticamente
9. **DRY**: Componentes reutilizables (LoadingSpinner, ErrorMessage)
10. **UX**: Mensajes claros, confirmaciones, feedback visual

---

## 📚 Próximos Pasos Sugeridos

1. **Agregar React Query** para cache avanzado
2. **Implementar comentarios** en la UI
3. **Agregar edición de posts**
4. **Implementar paginación**
5. **Agregar búsqueda y filtros**
6. **Implementar refresh token**
7. **Agregar tests unitarios**
8. **Implementar optimistic updates**
9. **Agregar notificaciones toast**
10. **Mejorar manejo de errores de red**

---

## 🎓 Conceptos Aprendidos

- ✅ Configuración de Axios
- ✅ Interceptores (request/response)
- ✅ Manejo de errores HTTP
- ✅ Loading states
- ✅ Autenticación con tokens
- ✅ Context API
- ✅ Custom hooks
- ✅ Rutas protegidas
- ✅ CRUD completo
- ✅ TypeScript con APIs

---

## 💡 Tips

1. **Siempre manejar errores**: Usa try-catch en todas las llamadas a la API
2. **Mostrar loading**: El usuario debe saber que algo está pasando
3. **Validar antes de enviar**: Evita peticiones innecesarias
4. **Mensajes descriptivos**: Ayuda al usuario a entender qué pasó
5. **Limpiar formularios**: Después de crear/actualizar exitosamente
6. **Confirmar acciones destructivas**: Como eliminar posts
7. **Usar TypeScript**: Para evitar errores en tiempo de ejecución
8. **Logs en desarrollo**: Para debugging más fácil

---

## 🤝 Soporte

Si tienes dudas:
1. Revisa los comentarios en el código
2. Verifica los logs en la consola
3. Usa las herramientas de desarrollo del navegador
4. Revisa la documentación de Axios

---

¡El sistema está listo para usar! 🎉
