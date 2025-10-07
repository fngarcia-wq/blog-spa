# 🏪 Store - Gestión de Estados

Este directorio contiene toda la lógica de gestión de estados de la aplicación.

## 📁 Estructura

```
store/
├── README.md                      # Este archivo
├── STATE_MANAGEMENT_GUIDE.md      # Guía completa de gestión de estados
│
├── redux/                         # Redux Toolkit (para producción)
│   ├── store.ts                   # Configuración del store
│   ├── hooks.ts                   # Hooks tipados
│   ├── slices/                    # Slices por feature
│   │   ├── postsSlice.ts
│   │   └── commentsSlice.ts
│   └── api/                       # RTK Query
│       └── blogApi.ts
│
├── zustand/                       # Zustand (para producción)
│   ├── uiStore.ts                 # UI state global
│   ├── filterStore.ts             # Filtros y búsquedas
│   └── notificationStore.ts       # Sistema de notificaciones
│
└── examples/                      # Ejemplos educativos
    ├── README.md                  # Guía de ejemplos
    ├── types.ts                   # Tipos compartidos
    ├── TodoContext/               # Ejemplo con Context API
    ├── TodoZustand/               # Ejemplo con Zustand
    ├── TodoRedux/                 # Ejemplo con Redux Toolkit
    └── HybridExample/             # Integración armónica
```

## 🎯 Arquitectura de Estados

### Context API (en `/src/context/`)
```typescript
// Para configuración global que cambia raramente
UserContext      → Autenticación
ThemeContext     → Tema (dark/light)
LanguageContext  → Idioma (i18n)
```

### Zustand (en `/src/store/zustand/`)
```typescript
// Para UI state que cambia frecuentemente
uiStore              → Modales, sidebar, tabs
filterStore          → Filtros y búsquedas
notificationStore    → Notificaciones toast
```

### Redux Toolkit (en `/src/store/redux/`)
```typescript
// Para lógica de negocio compleja
postsSlice       → CRUD de posts
commentsSlice    → Gestión de comentarios
blogApi          → RTK Query para cache de API
```

## 🚀 Uso Rápido

### Context API

```tsx
import { useUser } from '@/context/UserContext';

function MyComponent() {
  const { user, login, logout } = useUser();
  
  return (
    <div>
      {user ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <button onClick={() => login(userData)}>Login</button>
      )}
    </div>
  );
}
```

### Zustand

```tsx
import { useUIStore } from '@/store/zustand/uiStore';

function MyComponent() {
  // ✅ Selector granular - solo re-renderiza cuando cambia activeModal
  const { activeModal, openModal, closeModal } = useUIStore();
  
  return (
    <div>
      <button onClick={() => openModal('confirm')}>
        Abrir Modal
      </button>
      
      {activeModal === 'confirm' && (
        <ConfirmModal onClose={closeModal} />
      )}
    </div>
  );
}
```

### Redux Toolkit

```tsx
import { useAppDispatch, useAppSelector } from '@/store/redux/hooks';
import { fetchPosts, selectPosts } from '@/store/redux/slices/postsSlice';

function MyComponent() {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectPosts);
  
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);
  
  return (
    <div>
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
```


## 🎓 Ejemplos Educativos

Los ejemplos en `/examples/` son para **aprendizaje y comparación**.

### Ver todos los ejemplos:

```tsx
import { StateManagementDemo } from '@/components/examples/StateManagementDemo';

function App() {
  return <StateManagementDemo />;
}
```

### Ejemplos individuales:

```tsx
// Context API
import { TodoContextExample } from '@/store/examples/TodoContext';

// Zustand
import { TodoZustandExample } from '@/store/examples/TodoZustand';

// Redux Toolkit
import { TodoReduxExample } from '@/store/examples/TodoRedux';

// Integración Híbrida
import { BlogExample } from '@/store/examples/HybridExample';
```

## 🔧 Configuración

### Setup de Redux (si lo usas)

```tsx
// src/main.tsx
import { Provider } from 'react-redux';
import { store } from './store/redux/store';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
```

### Setup de Context API

```tsx
// src/main.tsx
import { UserProvider } from './context/UserContext';
import { ThemeProvider } from './context/ThemeContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <UserProvider>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </UserProvider>
);
```

### Setup de Zustand

No requiere Provider! Solo importa y usa:

```tsx
import { useUIStore } from './store/zustand/uiStore';
```

## 📝 Mejores Prácticas

### 1. Separación de Responsabilidades

```
✅ BIEN:
Context API → user, theme, language
Zustand     → modals, filters, notifications
Redux       → posts, comments, products

❌ MAL:
Todo en Redux
Todo en Context API
```

### 2. Selectores Granulares (Zustand/Redux)

```tsx
// ✅ BIEN - Solo re-renderiza cuando cambia activeModal
const activeModal = useUIStore(state => state.activeModal);

// ❌ MAL - Re-renderiza cuando cambia cualquier cosa
const store = useUIStore();
```

### 3. Memoización (Context API)

```tsx
// ✅ BIEN - Memoiza el value object
const value = useMemo(
  () => ({ user, login, logout }),
  [user, login, logout]
);

return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
```

### 4. Tipos de TypeScript

```tsx
// ✅ BIEN - Tipos estrictos
interface User {
  id: number;
  name: string;
  role: 'student' | 'teacher' | 'admin';
}

// ❌ MAL - Tipos any
const user: any = { ... };
```

## 🧪 Testing

### Context API

```tsx
import { render } from '@testing-library/react';
import { UserProvider } from './context/UserContext';

test('should render with user context', () => {
  render(
    <UserProvider>
      <MyComponent />
    </UserProvider>
  );
});
```

### Zustand

```tsx
import { renderHook, act } from '@testing-library/react';
import { useUIStore } from './store/zustand/uiStore';

test('should open modal', () => {
  const { result } = renderHook(() => useUIStore());
  
  act(() => {
    result.current.openModal('confirm');
  });
  
  expect(result.current.activeModal).toBe('confirm');
});
```

### Redux Toolkit

```tsx
import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './slices/postsSlice';

test('should fetch posts', () => {
  const store = configureStore({
    reducer: { posts: postsReducer }
  });
  
  // Test logic here
});
```

## 📚 Documentación

- [STATE_MANAGEMENT_GUIDE.md](./STATE_MANAGEMENT_GUIDE.md) - Guía completa
- [examples/README.md](./examples/README.md) - Guía de ejemplos
- [examples/HybridExample/INTEGRATION_GUIDE.md](./examples/HybridExample/INTEGRATION_GUIDE.md) - Integración

## 🔗 Enlaces Útiles

- [Context API Docs](https://react.dev/reference/react/createContext)
- [Zustand Docs](https://docs.pmnd.rs/zustand)
- [Redux Toolkit Docs](https://redux-toolkit.js.org/)
- [RTK Query Tutorial](https://redux-toolkit.js.org/tutorials/rtk-query)

## 💡 Tips

1. **Empieza simple:** Usa Context API para estados básicos
2. **Escala gradualmente:** Agrega Zustand cuando necesites mejor rendimiento
3. **Redux cuando sea necesario:** Solo para lógica de negocio compleja
4. **Combina soluciones:** No tengas miedo de usar las tres juntas
5. **DevTools:** Instala Redux DevTools para debugging

## 🤝 Contribuir

Al agregar nuevos stores:

1. Sigue la estructura de carpetas existente
2. Documenta el propósito del store
3. Agrega tipos de TypeScript
4. Incluye ejemplos de uso
5. Escribe tests si es posible

---

**¿Dudas?** Revisa los ejemplos en `/examples/` o la guía completa en `STATE_MANAGEMENT_GUIDE.md`
