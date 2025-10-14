# Guía de Gestión de Estados en React

## 📚 Comparativa: Context API vs Zustand vs Redux Toolkit

Esta guía compara tres soluciones populares de gestión de estados en React, usando una aplicación TODO como ejemplo práctico.

---

## 🎯 Resumen Ejecutivo

| Característica | Context API | Zustand | Redux Toolkit |
|----------------|-------------|---------|---------------|
| **Complejidad** | Baja | Muy Baja | Media |
| **Boilerplate** | Medio | Mínimo | Bajo |
| **Rendimiento** | Medio* | Alto | Alto |
| **DevTools** | No | Sí | Sí |
| **Curva de aprendizaje** | Baja | Muy Baja | Media |
| **Tamaño del bundle** | 0 KB (nativo) | ~1 KB | ~10 KB |
| **Middleware** | Manual | Fácil | Integrado |
| **TypeScript** | Bueno | Excelente | Excelente |

*Context API puede causar re-renders innecesarios sin optimización

---

## 1️⃣ Context API

### ✅ Ventajas
- **Nativo de React**: No requiere dependencias externas
- **Simple para estados pequeños**: Ideal para temas, autenticación, preferencias
- **Fácil de entender**: Conceptos familiares de React
- **Composición natural**: Se integra perfectamente con hooks

### ❌ Desventajas
- **Re-renders innecesarios**: Todos los consumidores se re-renderizan cuando cambia cualquier valor
- **Prop drilling del Provider**: Necesitas envolver componentes
- **Sin DevTools nativas**: Dificulta el debugging
- **Difícil de optimizar**: Requiere `useMemo`, `useCallback` y división de contextos

### 🎯 Casos de Uso Ideales
- Autenticación y datos de usuario
- Configuración de tema (dark/light mode)
- Preferencias de idioma
- Estados que cambian poco y se usan en muchos lugares
- Aplicaciones pequeñas o medianas

### 📝 Ejemplo: TODO con Context API
```typescript
// Ventajas: Simple, familiar, sin dependencias
// Desventajas: Puede causar re-renders, más código boilerplate
```

---

## 2️⃣ Zustand

### ✅ Ventajas
- **Extremadamente simple**: Menos boilerplate que cualquier otra solución
- **Excelente rendimiento**: Solo re-renderiza componentes que usan el estado específico
- **Sin Providers**: No necesitas envolver tu app
- **DevTools integradas**: Soporte para Redux DevTools
- **Middleware fácil**: Persist, immer, devtools out-of-the-box
- **TypeScript first**: Inferencia de tipos excelente
- **Tamaño mínimo**: ~1 KB gzipped

### ❌ Desventajas
- **Menos estructura**: Puede llevar a código desorganizado en apps grandes
- **Comunidad más pequeña**: Menos recursos y ejemplos que Redux
- **Sin convenciones estrictas**: Cada equipo puede implementarlo diferente

### 🎯 Casos de Uso Ideales
- Aplicaciones medianas a grandes que necesitan rendimiento
- Estados globales complejos sin el overhead de Redux
- Cuando quieres DevTools pero sin complejidad
- Proyectos nuevos que priorizan simplicidad
- Estados que cambian frecuentemente

### 📝 Ejemplo: TODO con Zustand
```typescript
// Ventajas: Código mínimo, excelente rendimiento, sin providers
// Desventajas: Menos estructura predefinida
```

---

## 3️⃣ Redux Toolkit

### ✅ Ventajas
- **Arquitectura robusta**: Patrón predecible y escalable
- **DevTools potentes**: Time-travel debugging, inspección de acciones
- **Middleware rico**: Redux Thunk, Saga, Observable integrados
- **Comunidad enorme**: Muchos recursos, plugins y soluciones
- **RTK Query**: Gestión de cache y fetching de datos incluida
- **Debugging superior**: Trazabilidad completa de cambios de estado
- **Convenciones claras**: Estructura predefinida para equipos grandes

### ❌ Desventajas
- **Más complejo**: Conceptos adicionales (slices, reducers, actions)
- **Mayor bundle size**: ~10 KB (aunque RTK redujo mucho el boilerplate)
- **Curva de aprendizaje**: Requiere entender conceptos de Redux
- **Puede ser overkill**: Para aplicaciones pequeñas es excesivo

### 🎯 Casos de Uso Ideales
- Aplicaciones empresariales grandes
- Equipos grandes que necesitan convenciones estrictas
- Cuando necesitas debugging avanzado y time-travel
- Estados muy complejos con muchas interacciones
- Cuando usas RTK Query para fetching de datos
- Aplicaciones que requieren middleware complejo

### 📝 Ejemplo: TODO con Redux Toolkit
```typescript
// Ventajas: Estructura clara, debugging potente, escalable
// Desventajas: Más código, conceptos adicionales
```

---


### Reglas de Decisión

#### Usa **Context API** cuando:
- El estado cambia raramente (< 1 vez por minuto)
- El estado es simple (1-3 valores)
- Es un estado "de configuración" (tema, idioma, auth)
- No necesitas DevTools para debuggearlo
- Quieres evitar dependencias externas

#### Usa **Zustand** cuando:
- El estado cambia frecuentemente
- Necesitas rendimiento óptimo
- Quieres código simple y limpio
- El estado es de UI (modales, tabs, filtros)
- Quieres DevTools pero sin complejidad

#### Usa **Redux Toolkit** cuando:
- Tienes estados muy complejos con muchas interacciones
- Necesitas debugging avanzado y time-travel
- Trabajas en equipo grande que necesita convenciones
- Usas RTK Query para fetching de datos
- Necesitas middleware complejo (sagas, observables)

---

## 📊 Ejemplo Práctico: Blog SPA

### Arquitectura Propuesta

```typescript
// Context API - Autenticación
UserContext
  ├─ user: User | null
  ├─ login()
  ├─ logout()
  └─ updatePreferences()

// Zustand - UI State
uiStore
  ├─ sidebarOpen: boolean
  ├─ activeModal: string | null
  ├─ searchQuery: string
  ├─ filters: FilterState
  └─ notifications: Notification[]

// Redux Toolkit - Datos de Negocio
postsSlice
  ├─ posts: Post[]
  ├─ loading: boolean
  ├─ error: string | null
  └─ actions: fetchPosts, createPost, updatePost, deletePost

commentsSlice
  ├─ comments: Comment[]
  └─ actions: fetchComments, addComment, deleteComment

// RTK Query - API Cache
blogApi
  ├─ getPosts
  ├─ getPostById
  ├─ createPost
  └─ updatePost
```

---

## 🚀 Mejores Prácticas

### Context API
1. **Divide contextos**: Un contexto por dominio
2. **Usa `useMemo`**: Para evitar re-renders innecesarios
3. **Separa estado y acciones**: Dos contextos si es necesario
4. **Custom hooks**: Siempre crea `useXXX()` hooks

### Zustand
1. **Organiza por features**: Un store por dominio si es grande
2. **Usa selectors**: `const value = useStore(state => state.value)`
3. **Middleware**: Aprovecha persist, immer, devtools
4. **Acciones como métodos**: Define acciones dentro del store

### Redux Toolkit
1. **Un slice por feature**: Organiza por dominio de negocio
2. **Usa `createAsyncThunk`**: Para llamadas async
3. **RTK Query**: Para fetching de datos y cache
4. **Normaliza datos**: Usa `createEntityAdapter`
5. **Selectors con Reselect**: Para computaciones derivadas

---

## 📁 Estructura de Carpetas Recomendada

```
src/
├─ context/              # Context API
│  ├─ UserContext.tsx
│  ├─ ThemeContext.tsx
│  └─ examples/
│     └─ TodoContext.tsx
│
├─ store/
│  ├─ redux/            # Redux Toolkit
│  │  ├─ store.ts
│  │  ├─ slices/
│  │  │  ├─ postsSlice.ts
│  │  │  └─ commentsSlice.ts
│  │  ├─ api/
│  │  │  └─ blogApi.ts
│  │  └─ examples/
│  │     └─ todoSlice.ts
│  │
│  ├─ zustand/          # Zustand
│  │  ├─ uiStore.ts
│  │  ├─ filterStore.ts
│  │  └─ examples/
│  │     └─ todoStore.ts
│  │
│  └─ examples/         # Ejemplos comparativos
│     ├─ TodoContext/
│     ├─ TodoZustand/
│     └─ TodoRedux/
│
└─ components/
   └─ examples/
      └─ StateManagementDemo.tsx
```

---

## 🎓 Conclusión

No hay una solución "mejor" - cada herramienta tiene su lugar:

- **Context API**: Para configuración y estados simples que cambian poco
- **Zustand**: Para UI state y estados que cambian frecuentemente
- **Redux Toolkit**: Para lógica de negocio compleja y aplicaciones grandes

La clave es **usar la herramienta correcta para cada problema** y no tener miedo de combinarlas en la misma aplicación.
