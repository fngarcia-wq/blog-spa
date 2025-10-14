# 🤝 Guía de Integración Armónica

## Usando Context API, Zustand y Redux Toolkit Juntos

Esta guía muestra cómo usar las tres soluciones de gestión de estados en la misma aplicación de forma armónica y eficiente.

---

## 🎯 Estrategia de Integración

### Principio Fundamental
**Cada herramienta para lo que hace mejor**

```
┌─────────────────────────────────────────────────┐
│           ARQUITECTURA HÍBRIDA                  │
├─────────────────────────────────────────────────┤
│                                                 │
│  🎨 Context API - Configuración Global         │
│  ├─ Autenticación (UserContext)                │
│  ├─ Tema (ThemeContext)                        │
│  └─ Idioma (LanguageContext)                   │
│                                                 │
│  🐻 Zustand - Estado de UI                     │
│  ├─ Modales y Dialogs                          │
│  ├─ Sidebar/Navigation                         │
│  ├─ Filtros y Búsquedas                        │
│  └─ Notificaciones                             │
│                                                 │
│  ⚛️ Redux Toolkit - Lógica de Negocio          │
│  ├─ Posts (CRUD)                               │
│  ├─ Comments                                   │
│  ├─ RTK Query (API Cache)                      │
│  └─ Estados Complejos                          │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

## 📋 Matriz de Decisión

| Criterio | Context API | Zustand | Redux Toolkit |
|----------|-------------|---------|---------------|
| **Frecuencia de cambio** | Baja (< 1/min) | Alta (> 1/seg) | Media |
| **Complejidad del estado** | Simple | Media | Alta |
| **Necesidad de DevTools** | No | Sí | Sí |
| **Tamaño del equipo** | Pequeño | Mediano | Grande |
| **Necesidad de middleware** | No | Básico | Avanzado |
| **Persistencia** | Manual | Fácil | Manual |
| **Testing** | Fácil | Fácil | Muy Fácil |

---

## 🏗️ Arquitectura del Blog SPA

### 1. Context API - Autenticación y Configuración

```typescript
// src/context/UserContext.tsx
// ✅ Perfecto para: Datos de usuario que cambian raramente

interface User {
  id: number;
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'admin';
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// Uso:
const { user, login, logout } = useUser();
```

**¿Por qué Context API aquí?**
- El usuario se loguea/desloguea raramente
- Se necesita en muchos componentes
- No requiere DevTools
- Nativo de React, sin dependencias

### 2. Zustand - Estado de UI

```typescript
// src/store/zustand/uiStore.ts
// ✅ Perfecto para: UI state que cambia frecuentemente

interface UIStore {
  // Modales
  activeModal: string | null;
  openModal: (modal: string) => void;
  closeModal: () => void;
  
  // Sidebar
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  
  // Búsqueda y filtros
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  
  // Notificaciones
  notifications: Notification[];
  addNotification: (notification: Notification) => void;
}

// Uso:
const { activeModal, openModal } = useUIStore();
```

**¿Por qué Zustand aquí?**
- El UI state cambia constantemente (cada click, cada tecla)
- Necesita excelente rendimiento
- Código simple y limpio
- DevTools para debugging

### 3. Redux Toolkit - Lógica de Negocio

```typescript
// src/store/redux/slices/postsSlice.ts
// ✅ Perfecto para: Datos de negocio complejos

interface PostsState {
  posts: Post[];
  loading: boolean;
  error: string | null;
  currentPost: Post | null;
}

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    // CRUD operations
  },
});

// Uso:
const posts = useAppSelector(selectPosts);
dispatch(fetchPosts());
```

**¿Por qué Redux aquí?**
- Lógica de negocio compleja
- Necesita debugging avanzado
- Operaciones async con thunks
- RTK Query para cache de API

---

## 💻 Ejemplo Práctico: Blog Post Page

```typescript
// src/pages/PostPage.tsx

import React from 'react';
import { useUser } from '@/context/UserContext';
import { useUIStore } from '@/store/zustand/uiStore';
import { useAppSelector, useAppDispatch } from '@/store/redux/hooks';
import { selectPostById, deletePost } from '@/store/redux/slices/postsSlice';

export const PostPage: React.FC<{ postId: string }> = ({ postId }) => {
  // 1️⃣ Context API - Autenticación
  const { user, isTeacher } = useUser();
  
  // 2️⃣ Zustand - UI State
  const { openModal, addNotification } = useUIStore();
  
  // 3️⃣ Redux - Datos de negocio
  const dispatch = useAppDispatch();
  const post = useAppSelector(state => selectPostById(state, postId));

  const handleDelete = async () => {
    // Zustand: Abrir modal de confirmación
    openModal('confirm-delete');
    
    // Redux: Eliminar post
    await dispatch(deletePost(postId));
    
    // Zustand: Mostrar notificación
    addNotification({
      type: 'success',
      message: 'Post eliminado correctamente',
    });
  };

  return (
    <div>
      <h1>{post?.title}</h1>
      
      {/* Context API: Mostrar botón solo si es teacher */}
      {isTeacher && (
        <button onClick={handleDelete}>
          Eliminar Post
        </button>
      )}
    </div>
  );
};
```

---

## 🔄 Flujo de Datos

### Escenario: Usuario elimina un post

```
1. Usuario hace click en "Eliminar"
   ↓
2. Context API verifica permisos
   if (!isTeacher) return; // ❌ No autorizado
   ↓
3. Zustand abre modal de confirmación
   openModal('confirm-delete');
   ↓
4. Usuario confirma
   ↓
5. Redux ejecuta la acción
   dispatch(deletePost(postId));
   ↓
6. Redux actualiza el estado
   state.posts = state.posts.filter(p => p.id !== postId);
   ↓
7. Zustand muestra notificación
   addNotification({ type: 'success', message: '...' });
   ↓
8. Zustand cierra el modal
   closeModal();
```

---

## 📁 Estructura de Carpetas Recomendada

```
src/
├─ context/                    # Context API
│  ├─ UserContext.tsx          # Autenticación
│  ├─ ThemeContext.tsx         # Tema (dark/light)
│  └─ LanguageContext.tsx      # i18n
│
├─ store/
│  ├─ zustand/                 # Zustand Stores
│  │  ├─ uiStore.ts            # UI global
│  │  ├─ filterStore.ts        # Filtros y búsqueda
│  │  └─ notificationStore.ts  # Notificaciones
│  │
│  └─ redux/                   # Redux Toolkit
│     ├─ store.ts              # Configuración
│     ├─ hooks.ts              # Hooks tipados
│     ├─ slices/
│     │  ├─ postsSlice.ts      # Posts CRUD
│     │  ├─ commentsSlice.ts   # Comments
│     │  └─ categoriesSlice.ts # Categorías
│     └─ api/
│        └─ blogApi.ts         # RTK Query
│
├─ components/
│  ├─ layout/
│  │  ├─ Sidebar.tsx           # Usa Zustand (UI state)
│  │  └─ Header.tsx            # Usa Context (user)
│  │
│  ├─ posts/
│  │  ├─ PostList.tsx          # Usa Redux (posts)
│  │  └─ PostCard.tsx          # Usa Redux (posts)
│  │
│  └─ modals/
│     └─ ConfirmModal.tsx      # Usa Zustand (modal state)
│
└─ pages/
   ├─ HomePage.tsx             # Combina las 3
   └─ PostPage.tsx             # Combina las 3
```

---

## 🎯 Reglas de Oro

### 1. **Separación de Responsabilidades**
- Context API → Configuración global
- Zustand → UI state
- Redux → Lógica de negocio

### 2. **No Mezclar Dominios**
❌ **MAL:**
```typescript
// No pongas UI state en Redux
const uiSlice = createSlice({
  name: 'ui',
  initialState: { modalOpen: false }, // ❌ Usa Zustand
});
```

✅ **BIEN:**
```typescript
// UI state en Zustand
const useUIStore = create((set) => ({
  modalOpen: false,
  openModal: () => set({ modalOpen: true }),
}));
```

### 3. **Comunicación Entre Stores**

#### Context → Zustand
```typescript
const { user } = useUser(); // Context
const { addNotification } = useUIStore(); // Zustand

if (user.role === 'admin') {
  addNotification({ message: 'Bienvenido Admin' });
}
```

#### Zustand → Redux
```typescript
const dispatch = useAppDispatch(); // Redux
const { closeModal } = useUIStore(); // Zustand

const handleSave = async () => {
  await dispatch(savePost(data));
  closeModal(); // Cerrar modal después de guardar
};
```

#### Redux → Context
```typescript
const dispatch = useAppDispatch();
const { logout } = useUser();

// Si el token expira en Redux
if (error === 'UNAUTHORIZED') {
  logout(); // Desloguear desde Context
}
```

---

## 🚀 Ventajas de la Arquitectura Híbrida

### ✅ Rendimiento Óptimo
- Context API: Sin overhead para datos estáticos
- Zustand: Selectores granulares para UI
- Redux: Memoización con Reselect

### ✅ Developer Experience
- Cada herramienta en su zona de confort
- Menos boilerplate donde no se necesita
- Estructura clara y predecible

### ✅ Mantenibilidad
- Separación clara de responsabilidades
- Fácil de entender para nuevos desarrolladores
- Escalable a largo plazo

### ✅ Testing
- Context API: Fácil de mockear
- Zustand: Testing simple de funciones
- Redux: Testing robusto con Redux Toolkit

---

## 📊 Comparación de Rendimiento

### Escenario: Actualizar un contador cada 100ms

| Solución | Re-renders | Rendimiento |
|----------|-----------|-------------|
| Context API sin optimización | 50 componentes | ❌ Malo |
| Context API optimizado | 10 componentes | ⚠️ Regular |
| Zustand | 1 componente | ✅ Excelente |
| Redux con Reselect | 1 componente | ✅ Excelente |

**Conclusión:** Usa Zustand o Redux para estados que cambian frecuentemente.

---

## 🎓 Conclusión

La clave del éxito es **no casarse con una sola solución**. Cada herramienta tiene su lugar:

1. **Context API** para configuración global que cambia poco
2. **Zustand** para UI state que cambia mucho
3. **Redux Toolkit** para lógica de negocio compleja

Esta arquitectura híbrida te da:
- 🚀 **Rendimiento óptimo**
- 🧹 **Código limpio**
- 🔧 **Mantenibilidad**
- 📈 **Escalabilidad**

---

## 📚 Recursos Adicionales

- [Context API Docs](https://react.dev/reference/react/createContext)
- [Zustand Docs](https://docs.pmnd.rs/zustand/getting-started/introduction)
- [Redux Toolkit Docs](https://redux-toolkit.js.org/)
- [Cuando NO usar Context](https://blog.isquaredsoftware.com/2021/01/context-redux-differences/)
- [Zustand vs Redux](https://docs.pmnd.rs/zustand/getting-started/comparison)
