# 📚 Blog SPA - Proyecto Educativo de React

Proyecto educativo para aprender y comparar diferentes soluciones de gestión de estados en React.

## 🎯 Objetivo

Este proyecto demuestra las **ventajas, desventajas y casos de uso** de tres soluciones populares de gestión de estados:

- **Context API** (nativo de React)
- **Zustand** (librería minimalista)
- **Redux Toolkit** (solución empresarial)

## ✨ Características

- ✅ Ejemplos prácticos con aplicación TODO
- ✅ Comparación lado a lado de las tres soluciones
- ✅ Documentación completa y detallada
- ✅ Ejemplos de integración armónica
- ✅ TypeScript en todo el proyecto
- ✅ Buenas prácticas y patrones recomendados

## 🚀 Inicio Rápido

### 1. Instalación Base

```bash
npm install
```

### 2. Ejecutar el Proyecto

```bash
npm run dev
```

### 3. Ver los Ejemplos

El proyecto incluye ejemplos funcionales de gestión de estados. Para verlos todos:

```tsx
// src/App.tsx
import { StateManagementDemo } from './components/examples/StateManagementDemo';

function App() {
  return <StateManagementDemo />;
}
```

## 📦 Instalación de Dependencias Opcionales

### Context API
✅ **Ya incluido** - No requiere instalación adicional

### Zustand (Opcional)
```bash
npm install zustand
```

### Redux Toolkit (Opcional)
```bash
npm install @reduxjs/toolkit react-redux
```

Ver [INSTALLATION_GUIDE.md](./INSTALLATION_GUIDE.md) para más detalles.

## 📁 Estructura del Proyecto

```
blog-spa/
├── src/
│   ├── components/
│   │   └── examples/
│   │       └── StateManagementDemo.tsx    # Demo completa
│   │
│   ├── context/                           # Context API
│   │   └── UserContext.tsx                # Ejemplo de autenticación
│   │
│   └── store/
│       ├── STATE_MANAGEMENT_GUIDE.md      # 📚 Guía completa
│       ├── README.md                      # Documentación del store
│       │
│       ├── redux/                         # Redux Toolkit (producción)
│       ├── zustand/                       # Zustand (producción)
│       │
│       └── examples/                      # 🎓 Ejemplos educativos
│           ├── README.md
│           ├── types.ts
│           ├── TodoContext/               # Ejemplo Context API
│           ├── TodoZustand/               # Ejemplo Zustand
│           ├── TodoRedux/                 # Ejemplo Redux Toolkit
│           └── HybridExample/             # Integración armónica
│
├── INSTALLATION_GUIDE.md                  # Guía de instalación
└── README.md                              # Este archivo
```

## 📊 Comparación Rápida

| Característica | Context API | Zustand | Redux Toolkit |
|----------------|-------------|---------|---------------|
| **Complejidad** | Baja | Muy Baja | Media |
| **Boilerplate** | Medio | Mínimo | Bajo |
| **Rendimiento** | Medio* | Alto | Alto |
| **DevTools** | ❌ | ✅ | ✅ |
| **Bundle Size** | 0 KB | ~1 KB | ~10 KB |
| **Instalación** | Nativo | `npm i zustand` | `npm i @reduxjs/toolkit react-redux` |

## 🎓 Documentación

### Guías Principales
- [📚 STATE_MANAGEMENT_GUIDE.md](./src/store/STATE_MANAGEMENT_GUIDE.md) - Guía completa de gestión de estados
- [📦 INSTALLATION_GUIDE.md](./INSTALLATION_GUIDE.md) - Guía de instalación detallada
- [🏪 store/README.md](./src/store/README.md) - Documentación del directorio store
- [🎯 examples/README.md](./src/store/examples/README.md) - Guía de ejemplos
- [🤝 INTEGRATION_GUIDE.md](./src/store/examples/HybridExample/INTEGRATION_GUIDE.md) - Integración armónica

### Ejemplos de Código

#### Context API
```tsx
import { useUser } from './context/UserContext';

function MyComponent() {
  const { user, login, logout } = useUser();
  return <div>{user?.name}</div>;
}
```

#### Zustand
```tsx
import { useUIStore } from './store/zustand/uiStore';

function MyComponent() {
  const { activeModal, openModal } = useUIStore();
  return <button onClick={() => openModal('confirm')}>Open</button>;
}
```

#### Redux Toolkit
```tsx
import { useAppSelector, useAppDispatch } from './store/redux/hooks';
import { fetchPosts } from './store/redux/slices/postsSlice';

function MyComponent() {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(state => state.posts.posts);
  
  useEffect(() => {
    dispatch(fetchPosts());
  }, []);
  
  return <PostList posts={posts} />;
}
```

## 🎯 Casos de Uso

### Usa Context API cuando:
- ✅ Autenticación y datos de usuario
- ✅ Tema (dark/light mode)
- ✅ Preferencias de idioma
- ✅ Estados que cambian raramente

### Usa Zustand cuando:
- ✅ UI State (modales, sidebar)
- ✅ Filtros y búsquedas
- ✅ Estados que cambian frecuentemente
- ✅ Necesitas DevTools sin complejidad

### Usa Redux Toolkit cuando:
- ✅ Datos de negocio (CRUD)
- ✅ Cache de API (RTK Query)
- ✅ Estados muy complejos
- ✅ Aplicaciones empresariales

## 🤝 Integración Armónica

**La mejor arquitectura combina las tres soluciones:**

```
Context API     →  Autenticación, Tema, Idioma
Zustand         →  Modales, Filtros, Notificaciones
Redux Toolkit   →  Posts, Comments, API Cache
```

Ver [INTEGRATION_GUIDE.md](./src/store/examples/HybridExample/INTEGRATION_GUIDE.md) para más detalles.

## 🛠️ Scripts Disponibles

```bash
npm run dev      # Ejecutar en modo desarrollo
npm run build    # Construir para producción
npm run lint     # Ejecutar ESLint
npm run preview  # Preview de la build
```

## 🧪 Testing

Cada ejemplo incluye comentarios sobre cómo testear. Ver documentación en cada carpeta de ejemplos.

## 📚 Recursos Adicionales

- [React Context API](https://react.dev/reference/react/createContext)
- [Zustand Documentation](https://docs.pmnd.rs/zustand)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [When to use Context vs Redux](https://blog.isquaredsoftware.com/2021/01/context-redux-differences/)

## 🎓 Para Estudiantes

Este proyecto está diseñado para **aprender comparando**. Recomendamos:

1. **Empezar con Context API** - Ya funciona sin instalación
2. **Experimentar con Zustand** - Instalar y comparar el código
3. **Explorar Redux Toolkit** - Ver cuándo vale la pena la complejidad
4. **Revisar la integración híbrida** - Aprender a combinar las tres

## 💡 Tips

- 🔍 Usa Redux DevTools para debugging (funciona con Zustand también)
- 📝 Lee los comentarios en el código - están llenos de buenas prácticas
- 🎯 Compara el mismo ejemplo (TODO) en las tres soluciones
- 🤝 No tengas miedo de combinar soluciones en la misma app

## 🤝 Contribuir

Si encuentras mejoras o quieres agregar más ejemplos, ¡las contribuciones son bienvenidas!

---

## 📄 Configuración de Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
