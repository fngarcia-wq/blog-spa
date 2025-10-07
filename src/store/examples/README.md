# 📚 Ejemplos de Gestión de Estados

Este directorio contiene ejemplos prácticos de las tres principales soluciones de gestión de estados en React.

## 📁 Estructura

```
examples/
├── types.ts                    # Tipos compartidos
├── README.md                   # Este archivo
│
├── TodoContext/                # Ejemplo con Context API
│   ├── TodoContext.tsx         # Contexto y Provider
│   ├── TodoList.tsx            # Componente de lista
│   └── index.tsx               # Exportaciones
│
├── TodoZustand/                # Ejemplo con Zustand
│   ├── todoStore.ts            # Store de Zustand
│   ├── TodoList.tsx            # Componente de lista
│   └── index.tsx               # Exportaciones
│
├── TodoRedux/                  # Ejemplo con Redux Toolkit
│   ├── todoSlice.ts            # Slice de Redux
│   ├── store.ts                # Configuración del store
│   ├── hooks.ts                # Hooks tipados
│   ├── TodoList.tsx            # Componente de lista
│   └── index.tsx               # Exportaciones
│
└── HybridExample/              # Integración armónica
    ├── INTEGRATION_GUIDE.md    # Guía de integración
    ├── BlogExample.tsx         # Ejemplo práctico
    └── index.tsx               # Exportaciones
```

## 🚀 Cómo usar los ejemplos

### 1. Context API (✅ Listo para usar)

```tsx
import { TodoContextExample } from './store/examples/TodoContext';

function App() {
  return <TodoContextExample />;
}
```

**No requiere instalación adicional** - Context API es nativo de React.

### 2. Zustand (Requiere instalación)

```bash
npm install zustand
```

Luego descomenta el código en los archivos de `TodoZustand/` y usa:

```tsx
import { TodoZustandExample } from './store/examples/TodoZustand';

function App() {
  return <TodoZustandExample />;
}
```

### 3. Redux Toolkit (Requiere instalación)

```bash
npm install @reduxjs/toolkit react-redux
```

Luego descomenta el código en los archivos de `TodoRedux/` y usa:

```tsx
import { TodoReduxExample } from './store/examples/TodoRedux';

function App() {
  return <TodoReduxExample />;
}
```

### 4. Integración Híbrida (Usa Context API existente)

```tsx
import { BlogExample } from './store/examples/HybridExample';

function App() {
  return <BlogExample />;
}
```

## 📊 Comparación Rápida

| Característica | Context API | Zustand | Redux Toolkit |
|----------------|-------------|---------|---------------|
| **Instalación** | ✅ Nativa | `npm i zustand` | `npm i @reduxjs/toolkit react-redux` |
| **Código** | ~100 líneas | ~50 líneas | ~150 líneas |
| **Complejidad** | Media | Baja | Alta |
| **DevTools** | ❌ | ✅ | ✅ |
| **Rendimiento** | Medio | Excelente | Excelente |

## 🎯 Cuándo usar cada uno

### Context API
- ✅ Autenticación
- ✅ Tema (dark/light)
- ✅ Idioma (i18n)
- ✅ Estados que cambian raramente

### Zustand
- ✅ UI State (modales, sidebar)
- ✅ Filtros y búsquedas
- ✅ Estados temporales
- ✅ Estados que cambian frecuentemente

### Redux Toolkit
- ✅ Datos de negocio (CRUD)
- ✅ Cache de API (RTK Query)
- ✅ Estados muy complejos
- ✅ Aplicaciones empresariales

## 📖 Documentación Adicional

- [STATE_MANAGEMENT_GUIDE.md](../STATE_MANAGEMENT_GUIDE.md) - Guía completa
- [INTEGRATION_GUIDE.md](./HybridExample/INTEGRATION_GUIDE.md) - Integración armónica

## 🧪 Testing

Cada ejemplo incluye comentarios sobre cómo testear:

```typescript
// Context API
import { render } from '@testing-library/react';
import { TodoProvider } from './TodoContext';

test('should render todos', () => {
  render(
    <TodoProvider>
      <TodoList />
    </TodoProvider>
  );
});
```

```typescript
// Zustand
import { renderHook, act } from '@testing-library/react';
import { useTodoStore } from './todoStore';

test('should add todo', () => {
  const { result } = renderHook(() => useTodoStore());
  
  act(() => {
    result.current.addTodo('Test todo');
  });
  
  expect(result.current.todos).toHaveLength(4);
});
```

```typescript
// Redux Toolkit
import { configureStore } from '@reduxjs/toolkit';
import todoReducer, { addTodo } from './todoSlice';

test('should add todo', () => {
  const store = configureStore({ reducer: { todos: todoReducer } });
  
  store.dispatch(addTodo({ text: 'Test todo' }));
  
  expect(store.getState().todos.todos).toHaveLength(4);
});
```

## 💡 Tips

1. **Empieza con Context API** si tu app es pequeña
2. **Migra a Zustand** cuando necesites mejor rendimiento
3. **Usa Redux Toolkit** cuando la complejidad lo justifique
4. **Combina las tres** para obtener lo mejor de cada una

## 🤝 Contribuir

Si encuentras mejoras o quieres agregar más ejemplos:

1. Mantén la misma estructura de carpetas
2. Documenta bien el código
3. Incluye comentarios explicativos
4. Agrega tipos de TypeScript

## 📚 Recursos

- [React Context API](https://react.dev/reference/react/createContext)
- [Zustand](https://docs.pmnd.rs/zustand)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [When to use Context vs Redux](https://blog.isquaredsoftware.com/2021/01/context-redux-differences/)
