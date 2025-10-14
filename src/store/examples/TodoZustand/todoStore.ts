/**
 * 📚 EJEMPLO: Gestión de Estado con Zustand
 * 
 * ✅ VENTAJAS:
 * - Código extremadamente simple y limpio
 * - Excelente rendimiento (solo re-renderiza lo necesario)
 * - Sin Providers, sin boilerplate
 * - DevTools integradas
 * - TypeScript first-class
 * - Tamaño mínimo (~1 KB)
 * 
 * ❌ DESVENTAJAS:
 * - Menos estructura predefinida
 * - Comunidad más pequeña que Redux
 * - Puede llevar a código desorganizado sin disciplina
 * 
 * 🎯 MEJOR PARA:
 * - UI state (modales, filtros, búsquedas)
 * - Estados que cambian frecuentemente
 * - Aplicaciones medianas/grandes
 * - Cuando quieres DevTools sin complejidad
 * 
 * 📦 INSTALACIÓN:
 * npm install zustand
 */

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { Todo, FilterType, TodoStats } from '../types';

// ============================================
// 📋 INTERFACE DEL STORE
// ============================================

interface TodoStore {
  // Estado
  todos: Todo[];
  filter: FilterType;
  
  // Acciones - Definidas como métodos del store
  addTodo: (text: string, priority?: Todo['priority']) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  updateTodo: (id: string, text: string) => void;
  setFilter: (filter: FilterType) => void;
  clearCompleted: () => void;
  
  // Selectores computados (opcionales, también pueden ser externos)
  getStats: () => TodoStats;
  getFilteredTodos: () => Todo[];
}

// ============================================
// 🏪 STORE
// ============================================

/**
 * ✅ BUENA PRÁCTICA: Usar middleware
 * - devtools: Habilita Redux DevTools
 * - persist: Guarda estado en localStorage (comentado para evitar errores)
 */
export const useTodoStore = create<TodoStore>()(
  devtools(
    (set, get) => ({
        // ============================================
        // 📊 ESTADO INICIAL
        // ============================================
        todos: [
          {
            id: '1',
            text: 'Aprender Zustand',
            completed: true,
            priority: 'high',
            createdAt: Date.now() - 3600000,
            category: 'Estudio',
          },
          {
            id: '2',
            text: 'Comparar con Context API',
            completed: false,
            priority: 'medium',
            createdAt: Date.now() - 1800000,
            category: 'Estudio',
          },
          {
            id: '3',
            text: 'Ver ventajas de rendimiento',
            completed: false,
            priority: 'high',
            createdAt: Date.now(),
            category: 'Estudio',
          },
        ],
        filter: 'all',

        // ============================================
        // 🎬 ACCIONES
        // ============================================

        /**
         * ✅ BUENA PRÁCTICA: Acciones inmutables
         * - Usa spread operator para crear nuevos arrays
         * - Zustand detecta cambios automáticamente
         */
        addTodo: (text, priority = 'medium') =>
          set((state) => ({
            todos: [
              ...state.todos,
              {
                id: Date.now().toString(),
                text: text.trim(),
                completed: false,
                priority,
                createdAt: Date.now(),
              },
            ],
          })),

        toggleTodo: (id) =>
          set((state) => ({
            todos: state.todos.map((todo) =>
              todo.id === id ? { ...todo, completed: !todo.completed } : todo
            ),
          })),

        deleteTodo: (id) =>
          set((state) => ({
            todos: state.todos.filter((todo) => todo.id !== id),
          })),

        updateTodo: (id, text) =>
          set((state) => ({
            todos: state.todos.map((todo) =>
              todo.id === id ? { ...todo, text: text.trim() } : todo
            ),
          })),

        setFilter: (filter) => set({ filter }),

        clearCompleted: () =>
          set((state) => ({
            todos: state.todos.filter((todo) => !todo.completed),
          })),

        // ============================================
        // 📊 SELECTORES COMPUTADOS
        // ============================================

        /**
         * ✅ BUENA PRÁCTICA: Selectores dentro del store
         * - Encapsula lógica de negocio
         * - Reutilizable desde cualquier componente
         */
        getStats: () => {
          const todos = get().todos;
          const total = todos.length;
          const completed = todos.filter((t) => t.completed).length;
          const active = total - completed;
          return { total, active, completed };
        },

        getFilteredTodos: () => {
          const { todos, filter } = get();
          switch (filter) {
            case 'active':
              return todos.filter((t) => !t.completed);
            case 'completed':
              return todos.filter((t) => t.completed);
            default:
              return todos;
          }
        },
      }),
    {
      name: 'TodoStore', // Nombre en DevTools
    }
  )
);

// ============================================
// 🎯 SELECTORES EXTERNOS (Alternativa)
// ============================================

/**
 * ✅ BUENA PRÁCTICA: Selectores externos para mejor rendimiento
 * - Solo re-renderiza cuando cambia el valor específico
 * - Más eficiente que acceder a todo el store
 */
export const selectTodos = (state: TodoStore) => state.todos;
export const selectFilter = (state: TodoStore) => state.filter;

// ✅ OPTIMIZACIÓN: Calcular stats directamente sin llamar a getStats()
export const selectStats = (state: TodoStore) => {
  const total = state.todos.length;
  const completed = state.todos.filter((t) => t.completed).length;
  const active = total - completed;
  return { total, active, completed };
};

// ✅ OPTIMIZACIÓN: Calcular filteredTodos directamente sin llamar a getFilteredTodos()
export const selectFilteredTodos = (state: TodoStore) => {
  switch (state.filter) {
    case 'active':
      return state.todos.filter((t) => !t.completed);
    case 'completed':
      return state.todos.filter((t) => t.completed);
    default:
      return state.todos;
  }
};

// ============================================
// 🪝 CUSTOM HOOKS (Opcional pero recomendado)
// ============================================

/**
 * ✅ BUENA PRÁCTICA: Crear hooks específicos
 * - Mejor DX y autocompletado
 * - Encapsula selectores
 * - Más fácil de testear
 */
export const useTodos = () => useTodoStore(selectTodos);
export const useFilter = () => useTodoStore(selectFilter);

// ✅ SOLUCIÓN: Usar selectores individuales para evitar crear nuevos objetos
export const useStats = () => {
  const total = useTodoStore((state) => state.todos.length);
  const completed = useTodoStore((state) => state.todos.filter((t) => t.completed).length);
  const active = total - completed;
  return { total, active, completed };
};

export const useFilteredTodos = () => {
  const todos = useTodoStore((state) => state.todos);
  const filter = useTodoStore((state) => state.filter);
  
  switch (filter) {
    case 'active':
      return todos.filter((t) => !t.completed);
    case 'completed':
      return todos.filter((t) => t.completed);
    default:
      return todos;
  }
};

// Acciones
export const useTodoActions = () => {
  const addTodo = useTodoStore((state) => state.addTodo);
  const toggleTodo = useTodoStore((state) => state.toggleTodo);
  const deleteTodo = useTodoStore((state) => state.deleteTodo);
  const updateTodo = useTodoStore((state) => state.updateTodo);
  const setFilter = useTodoStore((state) => state.setFilter);
  const clearCompleted = useTodoStore((state) => state.clearCompleted);

  return {
    addTodo,
    toggleTodo,
    deleteTodo,
    updateTodo,
    setFilter,
    clearCompleted,
  };
};

// ============================================
// 📝 NOTAS DE IMPLEMENTACIÓN
// ============================================

/**
 * 🔍 ANÁLISIS DE RENDIMIENTO:
 * 
 * ✅ VENTAJA: Zustand solo re-renderiza componentes que usan el valor específico
 * 
 * Ejemplo:
 * const todos = useTodoStore(state => state.todos);
 * // Solo re-renderiza cuando 'todos' cambia
 * 
 * const filter = useTodoStore(state => state.filter);
 * // Solo re-renderiza cuando 'filter' cambia
 * 
 * 📊 COMPARACIÓN:
 * - Context API: Todos los consumidores se re-renderizan
 * - Zustand: Solo los componentes que usan el valor específico ✅
 * - Redux: Solo los componentes suscritos al slice específico ✅
 */

/**
 * 🎯 CUÁNDO USAR ZUSTAND:
 * 
 * ✅ SÍ usar Zustand cuando:
 * - Quieres código simple sin sacrificar rendimiento
 * - El estado cambia frecuentemente
 * - Necesitas DevTools pero Redux es overkill
 * - Quieres evitar Providers
 * - Prefieres menos boilerplate
 * - La aplicación es mediana/grande
 * 
 * ❌ NO usar Zustand cuando:
 * - Necesitas estructura muy estricta (usa Redux)
 * - El equipo es muy grande y necesita convenciones (usa Redux)
 * - Quieres evitar dependencias externas (usa Context API)
 * - Necesitas middleware muy complejo (usa Redux)
 */

/**
 * 💡 TIPS Y TRUCOS:
 * 
 * 1. SELECTORES ESPECÍFICOS:
 *    const name = useTodoStore(state => state.user.name);
 *    // Mejor que: const { user } = useTodoStore();
 * 
 * 2. MIDDLEWARE ÚTILES:
 *    - persist: Guarda en localStorage
 *    - devtools: Redux DevTools
 *    - immer: Mutaciones "inmutables"
 *    - subscribeWithSelector: Suscripciones granulares
 * 
 * 3. ACCIONES FUERA DEL HOOK:
 *    useTodoStore.getState().addTodo('Nueva tarea');
 *    // Útil en event handlers, thunks, etc.
 * 
 * 4. RESET STORE:
 *    const initialState = { todos: [], filter: 'all' };
 *    useTodoStore.setState(initialState);
 * 
 * 5. SUSCRIPCIONES:
 *    useTodoStore.subscribe(
 *      state => state.todos,
 *      (todos) => console.log('Todos changed:', todos)
 *    );
 */

export default {};
