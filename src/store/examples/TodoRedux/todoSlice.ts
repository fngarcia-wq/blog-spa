/**
 * 📚 EJEMPLO: Gestión de Estado con Redux Toolkit
 * 
 * ✅ VENTAJAS:
 * - Arquitectura robusta y escalable
 * - DevTools potentes con time-travel debugging
 * - Middleware rico (thunk, saga, observable)
 * - Comunidad enorme, muchos recursos
 * - RTK Query para fetching y cache
 * - Convenciones claras para equipos grandes
 * - Debugging superior
 * 
 * ❌ DESVENTAJAS:
 * - Más complejo que Context API y Zustand
 * - Mayor bundle size (~10 KB)
 * - Curva de aprendizaje más pronunciada
 * - Puede ser overkill para apps pequeñas
 * 
 * 🎯 MEJOR PARA:
 * - Aplicaciones empresariales grandes
 * - Equipos grandes con necesidad de convenciones
 * - Estados muy complejos
 * - Cuando necesitas debugging avanzado
 * - Aplicaciones con mucha lógica de negocio
 * 
 * 📦 INSTALACIÓN:
 * npm install @reduxjs/toolkit react-redux
 */

import { createSlice, createSelector, type PayloadAction } from '@reduxjs/toolkit';
import type { Todo, FilterType, TodoStats } from '../types';

// ============================================
// 📋 INTERFACES
// ============================================

interface TodoState {
  todos: Todo[];
  filter: FilterType;
  loading: boolean;
  error: string | null;
}

// ============================================
// 📊 ESTADO INICIAL
// ============================================

const initialState: TodoState = {
  todos: [
    {
      id: '1',
      text: 'Aprender Redux Toolkit',
      completed: true,
      priority: 'high',
      createdAt: Date.now() - 3600000,
      category: 'Estudio',
    },
    {
      id: '2',
      text: 'Entender slices y reducers',
      completed: false,
      priority: 'medium',
      createdAt: Date.now() - 1800000,
      category: 'Estudio',
    },
    {
      id: '3',
      text: 'Usar Redux DevTools',
      completed: false,
      priority: 'high',
      createdAt: Date.now(),
      category: 'Estudio',
    },
  ],
  filter: 'all',
  loading: false,
  error: null,
};

// ============================================
// 🍕 SLICE
// ============================================

/**
 * ✅ BUENA PRÁCTICA: Un slice por feature
 * - Agrupa estado, reducers y actions relacionados
 * - Redux Toolkit usa Immer internamente (mutaciones "seguras")
 */
const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    // ============================================
    // 🎬 REDUCERS (Actions automáticas)
    // ============================================

    /**
     * ✅ BUENA PRÁCTICA: Usa Immer para "mutaciones"
     * - Redux Toolkit permite escribir código "mutante"
     * - Immer lo convierte en inmutable automáticamente
     */
    addTodo: (state, action: PayloadAction<{ text: string; priority?: Todo['priority'] }>) => {
      const { text, priority = 'medium' } = action.payload;
      const newTodo: Todo = {
        id: Date.now().toString(),
        text: text.trim(),
        completed: false,
        priority,
        createdAt: Date.now(),
      };
      state.todos.push(newTodo); // ✅ Parece mutación, pero Immer lo hace inmutable
    },

    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.todos.find((t) => t.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed; // ✅ Mutación "segura" con Immer
      }
    },

    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((t) => t.id !== action.payload);
    },

    updateTodo: (state, action: PayloadAction<{ id: string; text: string }>) => {
      const todo = state.todos.find((t) => t.id === action.payload.id);
      if (todo) {
        todo.text = action.payload.text.trim();
      }
    },

    setFilter: (state, action: PayloadAction<FilterType>) => {
      state.filter = action.payload;
    },

    clearCompleted: (state) => {
      state.todos = state.todos.filter((t) => !t.completed);
    },

    // ============================================
    // 📊 ACCIONES ADICIONALES (Ejemplo)
    // ============================================

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },

  // ============================================
  // 🔄 EXTRA REDUCERS (Para async thunks)
  // ============================================
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(fetchTodosAsync.pending, (state) => {
  //       state.loading = true;
  //     })
  //     .addCase(fetchTodosAsync.fulfilled, (state, action) => {
  //       state.loading = false;
  //       state.todos = action.payload;
  //     })
  //     .addCase(fetchTodosAsync.rejected, (state, action) => {
  //       state.loading = false;
  //       state.error = action.error.message || 'Error al cargar todos';
  //     });
  // },
});

// ============================================
// 📤 EXPORTAR ACTIONS
// ============================================

export const {
  addTodo,
  toggleTodo,
  deleteTodo,
  updateTodo,
  setFilter,
  clearCompleted,
  setLoading,
  setError,
} = todoSlice.actions;

// ============================================
// 📤 EXPORTAR REDUCER
// ============================================

export default todoSlice.reducer;

// ============================================
// 🎯 SELECTORES
// ============================================

/**
 * ✅ BUENA PRÁCTICA: Crear selectores para acceder al estado
 * - Encapsula la estructura del estado
 * - Facilita refactoring
 * - Permite memoización con Reselect
 */

// Selectores básicos
export const selectTodos = (state: { todos: TodoState }) => state.todos.todos;
export const selectFilter = (state: { todos: TodoState }) => state.todos.filter;
export const selectLoading = (state: { todos: TodoState }) => state.todos.loading;
export const selectError = (state: { todos: TodoState }) => state.todos.error;

// ============================================
// 🎯 SELECTORES MEMOIZADOS (Reselect)
// ============================================

/**
 * ✅ BUENA PRÁCTICA: Usar createSelector para selectores derivados
 * - Memoiza resultados (solo recalcula cuando cambian las dependencias)
 * - Mejora el rendimiento significativamente
 * - Evita re-renders innecesarios
 */

export const selectStats = createSelector(
  [selectTodos],
  (todos): TodoStats => {
    const total = todos.length;
    const completed = todos.filter((t) => t.completed).length;
    const active = total - completed;
    return { total, active, completed };
  }
);

export const selectFilteredTodos = createSelector(
  [selectTodos, selectFilter],
  (todos, filter): Todo[] => {
    switch (filter) {
      case 'active':
        return todos.filter((t) => !t.completed);
      case 'completed':
        return todos.filter((t) => t.completed);
      default:
        return todos;
    }
  }
);

export const selectActiveTodos = createSelector(
  [selectTodos],
  (todos) => todos.filter((t) => !t.completed)
);

export const selectCompletedTodos = createSelector(
  [selectTodos],
  (todos) => todos.filter((t) => t.completed)
);

export const selectTodosByPriority = createSelector(
  [selectTodos],
  (todos) => {
    return {
      high: todos.filter((t) => t.priority === 'high'),
      medium: todos.filter((t) => t.priority === 'medium'),
      low: todos.filter((t) => t.priority === 'low'),
    };
  }
);

// ============================================
// 🔄 ASYNC THUNKS (Ejemplo)
// ============================================

/**
 * ✅ BUENA PRÁCTICA: Usar createAsyncThunk para operaciones async
 * - Maneja pending, fulfilled, rejected automáticamente
 * - Integración perfecta con extraReducers
 */

/*
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTodosAsync = createAsyncThunk(
  'todos/fetchTodos',
  async () => {
    const response = await fetch('/api/todos');
    const data = await response.json();
    return data as Todo[];
  }
);

export const addTodoAsync = createAsyncThunk(
  'todos/addTodo',
  async (text: string) => {
    const response = await fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });
    const data = await response.json();
    return data as Todo;
  }
);
*/

// ============================================
// 📝 NOTAS DE IMPLEMENTACIÓN
// ============================================

/**
 * 🔍 ANÁLISIS DE ARQUITECTURA:
 * 
 * 📊 ESTRUCTURA:
 * - Slice: Agrupa estado, reducers y actions
 * - Reducers: Funciones puras que modifican el estado
 * - Actions: Objetos que describen qué pasó
 * - Selectors: Funciones para acceder al estado
 * - Thunks: Para lógica async
 * 
 * ✅ VENTAJAS:
 * - Patrón predecible y testeable
 * - Debugging con time-travel
 * - Middleware para lógica compleja
 * - Comunidad y ecosistema enorme
 * 
 * 📊 COMPARACIÓN:
 * - Context API: Más simple, menos estructura
 * - Zustand: Menos boilerplate, similar rendimiento
 * - Redux: Más estructura, mejor para equipos grandes ✅
 */

/**
 * 🎯 CUÁNDO USAR REDUX TOOLKIT:
 * 
 * ✅ SÍ usar Redux cuando:
 * - Aplicación empresarial grande
 * - Equipo grande que necesita convenciones
 * - Estados muy complejos con muchas interacciones
 * - Necesitas debugging avanzado y time-travel
 * - Usas RTK Query para fetching de datos
 * - Necesitas middleware complejo (sagas, observables)
 * - Requieres trazabilidad completa de cambios
 * 
 * ❌ NO usar Redux cuando:
 * - La aplicación es pequeña (usa Context API)
 * - Quieres código más simple (usa Zustand)
 * - El equipo es pequeño y no necesita convenciones estrictas
 * - Prefieres menos boilerplate
 */

/**
 * 💡 TIPS Y TRUCOS:
 * 
 * 1. IMMER INTEGRADO:
 *    state.todos.push(newTodo); // ✅ Permitido en Redux Toolkit
 *    // Immer lo convierte en inmutable automáticamente
 * 
 * 2. CREATEASYNCTHUNK:
 *    // Maneja pending, fulfilled, rejected automáticamente
 *    export const fetchTodos = createAsyncThunk('todos/fetch', async () => {...});
 * 
 * 3. CREATEENTITYADAPTER:
 *    // Para normalizar datos (recomendado para listas grandes)
 *    const todosAdapter = createEntityAdapter<Todo>();
 * 
 * 4. RTK QUERY:
 *    // Para fetching y cache de datos
 *    export const api = createApi({...});
 * 
 * 5. DEVTOOLS:
 *    // Time-travel debugging, inspección de actions
 *    // Instala Redux DevTools extension en el navegador
 */
