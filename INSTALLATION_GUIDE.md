# 📦 Guía de Instalación - Gestión de Estados

Esta guía te ayudará a instalar y configurar las dependencias necesarias para los ejemplos de gestión de estados.

## 🎯 Opciones de Instalación

Puedes instalar solo lo que necesites según tu caso de uso:

### Opción 1: Solo Context API (Ya disponible ✅)

Context API es nativo de React, **no requiere instalación adicional**.

Los ejemplos de Context API funcionan inmediatamente:
- `src/context/UserContext.tsx`
- `src/store/examples/TodoContext/`

### Opción 2: Context API + Zustand

```bash
npm install zustand
```

**Tamaño:** ~1 KB gzipped

**Después de instalar:**
1. Ve a `src/store/examples/TodoZustand/`
2. Descomenta el código en:
   - `todoStore.ts`
   - `TodoList.tsx`
   - `index.tsx`

### Opción 3: Context API + Redux Toolkit

```bash
npm install @reduxjs/toolkit react-redux
```

**Tamaño:** ~10 KB gzipped

**Después de instalar:**
1. Ve a `src/store/examples/TodoRedux/`
2. Descomenta el código en:
   - `todoSlice.ts`
   - `store.ts`
   - `hooks.ts`
   - `TodoList.tsx`
   - `index.tsx`

### Opción 4: Instalación Completa (Recomendado para aprendizaje)

```bash
npm install zustand @reduxjs/toolkit react-redux
```

Esto te permite experimentar con las tres soluciones y compararlas.

## 🚀 Verificación de Instalación

### Verificar Zustand

```bash
npm list zustand
```

Deberías ver algo como:
```
blog-spa@0.0.0
└── zustand@4.x.x
```

### Verificar Redux Toolkit

```bash
npm list @reduxjs/toolkit react-redux
```

Deberías ver:
```
blog-spa@0.0.0
├── @reduxjs/toolkit@2.x.x
└── react-redux@9.x.x
```

## 🔧 Configuración Adicional

### Redux DevTools (Opcional pero recomendado)

Para debugging avanzado, instala la extensión del navegador:

- **Chrome:** [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)
- **Firefox:** [Redux DevTools](https://addons.mozilla.org/en-US/firefox/addon/reduxdevtools/)
- **Edge:** [Redux DevTools](https://microsoftedge.microsoft.com/addons/detail/redux-devtools/nnkgneoiohoecpdiaponcejilbhhikei)

**Nota:** Zustand también funciona con Redux DevTools cuando usas el middleware `devtools`.

## 📝 Actualizar package.json

Después de instalar, tu `package.json` debería verse así:

```json
{
  "dependencies": {
    "react": "^19.1.1",
    "react-dom": "^19.1.1",
    "@reduxjs/toolkit": "^2.0.0",
    "react-redux": "^9.0.0",
    "zustand": "^4.0.0"
  }
}
```

## 🎓 Próximos Pasos

### 1. Ejecutar el Proyecto

```bash
npm run dev
```

### 2. Ver los Ejemplos

Navega a:
- `http://localhost:5173` (o el puerto que use Vite)

### 3. Importar Componentes de Ejemplo

En tu `App.tsx` o cualquier componente:

```tsx
// Context API (ya funciona)
import { TodoContextExample } from './store/examples/TodoContext';

// Zustand (después de instalar y descomentar)
import { TodoZustandExample } from './store/examples/TodoZustand';

// Redux Toolkit (después de instalar y descomentar)
import { TodoReduxExample } from './store/examples/TodoRedux';

// Integración Híbrida
import { BlogExample } from './store/examples/HybridExample';

// Componente de demostración completo
import { StateManagementDemo } from './components/examples/StateManagementDemo';

function App() {
  return (
    <div>
      {/* Muestra todos los ejemplos con navegación */}
      <StateManagementDemo />
      
      {/* O usa ejemplos individuales */}
      {/* <TodoContextExample /> */}
      {/* <TodoZustandExample /> */}
      {/* <TodoReduxExample /> */}
      {/* <BlogExample /> */}
    </div>
  );
}
```

## 🐛 Solución de Problemas

### Error: "Cannot find module 'zustand'"

**Solución:**
```bash
npm install zustand
```

Asegúrate de descomentar el código en los archivos de ejemplo.

### Error: "Cannot find module '@reduxjs/toolkit'"

**Solución:**
```bash
npm install @reduxjs/toolkit react-redux
```

Asegúrate de descomentar el código en los archivos de ejemplo.

### Error: "Module not found: Can't resolve 'react-redux'"

**Solución:**
```bash
npm install react-redux
```

Redux Toolkit requiere `react-redux` como dependencia peer.

### Los ejemplos no se muestran

**Verifica:**
1. ¿Instalaste las dependencias necesarias?
2. ¿Descomentaste el código en los archivos de ejemplo?
3. ¿Importaste correctamente los componentes?
4. ¿El servidor de desarrollo está corriendo?

## 📊 Comparación de Tamaños

| Solución | Bundle Size (gzipped) | Instalación |
|----------|----------------------|-------------|
| Context API | 0 KB (nativo) | ✅ Ya incluido |
| Zustand | ~1 KB | `npm i zustand` |
| Redux Toolkit | ~10 KB | `npm i @reduxjs/toolkit react-redux` |

## 🎯 Recomendaciones

### Para Aprender
Instala todo para poder comparar:
```bash
npm install zustand @reduxjs/toolkit react-redux
```

### Para Producción
Instala solo lo que necesites según tu arquitectura:

- **App pequeña:** Solo Context API (ya incluido)
- **App mediana:** Context API + Zustand
- **App grande/empresarial:** Context API + Zustand + Redux Toolkit

## 📚 Recursos Adicionales

- [Documentación de Zustand](https://docs.pmnd.rs/zustand)
- [Documentación de Redux Toolkit](https://redux-toolkit.js.org/)
- [Guía de Migración](https://redux-toolkit.js.org/usage/migrating-to-modern-redux)

## ✅ Checklist de Instalación

- [ ] Clonar/descargar el proyecto
- [ ] Ejecutar `npm install` para dependencias base
- [ ] Decidir qué soluciones de estado usar
- [ ] Instalar dependencias adicionales si es necesario
- [ ] Descomentar código de ejemplos correspondientes
- [ ] Instalar Redux DevTools (opcional)
- [ ] Ejecutar `npm run dev`
- [ ] Importar componentes de ejemplo en tu app
- [ ] ¡Empezar a aprender! 🎓

## 🤝 Soporte

Si tienes problemas con la instalación:

1. Verifica que tienes Node.js 18+ instalado
2. Borra `node_modules` y `package-lock.json`, luego ejecuta `npm install`
3. Revisa la consola del navegador para errores específicos
4. Consulta la documentación oficial de cada librería

---

**¡Listo para empezar!** 🚀

Ahora puedes explorar los ejemplos y aprender las diferencias entre Context API, Zustand y Redux Toolkit.
