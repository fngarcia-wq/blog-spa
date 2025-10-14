/**
 * 🏪 Redux Store Configuration
 */

import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todoSlice';

// ============================================
// 🏪 CONFIGURAR STORE
// ============================================

/**
 * ✅ BUENA PRÁCTICA: Usar configureStore
 * - Incluye Redux DevTools automáticamente
 * - Incluye redux-thunk por defecto
 * - Incluye checks de inmutabilidad en desarrollo
 * - Configura middleware automáticamente
 */
export const store = configureStore({
  reducer: {
    todos: todoReducer,
    // Aquí puedes agregar más slices:
    // posts: postsReducer,
    // comments: commentsReducer,
    // users: usersReducer,
  },
  
  // Middleware personalizado (opcional)
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(logger, analytics),
  
  // DevTools (habilitado por defecto en desarrollo)
  devTools: process.env.NODE_ENV !== 'production',
});

// ============================================
// 📤 TIPOS PARA TYPESCRIPT
// ============================================

/**
 * ✅ BUENA PRÁCTICA: Exportar tipos del store
 * - Permite autocompletado en toda la app
 * - Type-safety en selectores y dispatch
 */
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// ============================================
// 📝 NOTAS
// ============================================

/**
 * 🎯 ESTRUCTURA RECOMENDADA PARA APPS GRANDES:
 * 
 * store/
 * ├─ store.ts              # Configuración del store
 * ├─ hooks.ts              # Hooks tipados (useAppDispatch, useAppSelector)
 * ├─ slices/
 * │  ├─ todosSlice.ts
 * │  ├─ postsSlice.ts
 * │  └─ usersSlice.ts
 * ├─ api/
 * │  └─ blogApi.ts         # RTK Query
 * └─ middleware/
 *    ├─ logger.ts
 *    └─ analytics.ts
 */
