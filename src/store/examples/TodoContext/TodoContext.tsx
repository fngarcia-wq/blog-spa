/**
 * 📚 EJEMPLO: Gestión de Estado con Context API
 * 
 * ✅ VENTAJAS:
 * - Nativo de React, sin dependencias externas
 * - Simple y familiar para desarrolladores React
 * - Ideal para estados que cambian poco
 * - Buena integración con hooks de React
 * 
 * ❌ DESVENTAJAS:
 * - Re-renders innecesarios sin optimización
 * - Más boilerplate que Zustand
 * - Sin DevTools nativas
 * - Difícil de optimizar en apps grandes
 * 
 * 🎯 MEJOR PARA:
 * - Autenticación, temas, preferencias
 * - Estados simples que cambian raramente
 * - Aplicaciones pequeñas/medianas
 */

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  type ReactNode,
} from 'react';
import type { Todo, FilterType, TodoStats } from '../types';

// ============================================
// 📋 INTERFACES
// ============================================

interface TodoContextType {
  // Estado
  todos: Todo[];
  filter: FilterType;
  stats: TodoStats;
  
  // Acciones
  addTodo: (text: string, priority?: Todo['priority']) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  updateTodo: (id: string, text: string) => void;
  setFilter: (filter: FilterType) => void;
  clearCompleted: () => void;
  
  // Datos derivados
  filteredTodos: Todo[];
}

// ============================================
// 🏗️ CONTEXTO
// ============================================

const TodoContext = createContext<TodoContextType | undefined>(undefined);

// ============================================
// 🪝 CUSTOM HOOK
// ============================================

/**
 * ✅ BUENA PRÁCTICA: Siempre crear un custom hook
 * - Encapsula la lógica de validación
 * - Proporciona mejor DX con autocompletado
 * - Evita errores de uso fuera del Provider
 */
export const useTodoContext = (): TodoContextType => {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error('useTodoContext debe usarse dentro de TodoProvider');
  }
  return context;
};

// ============================================
// 🎁 PROVIDER
// ============================================

interface TodoProviderProps {
  children: ReactNode;
}

export const TodoProvider: React.FC<TodoProviderProps> = ({ children }) => {
  // Estado principal
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: '1',
      text: 'Aprender Context API',
      completed: true,
      priority: 'high',
      createdAt: Date.now() - 3600000,
      category: 'Estudio',
    },
    {
      id: '2',
      text: 'Comparar con Zustand',
      completed: false,
      priority: 'medium',
      createdAt: Date.now() - 1800000,
      category: 'Estudio',
    },
    {
      id: '3',
      text: 'Aprender Redux Toolkit',
      completed: false,
      priority: 'high',
      createdAt: Date.now(),
      category: 'Estudio',
    },
  ]);
  
  const [filter, setFilter] = useState<FilterType>('all');

  // ============================================
  // 📊 DATOS DERIVADOS
  // ============================================

  /**
   * ✅ BUENA PRÁCTICA: Usar useMemo para cálculos derivados
   * - Evita recalcular en cada render
   * - Mejora el rendimiento
   */
  const stats = useMemo<TodoStats>(() => {
    const total = todos.length;
    const completed = todos.filter(t => t.completed).length;
    const active = total - completed;
    
    return { total, active, completed };
  }, [todos]);

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter(t => !t.completed);
      case 'completed':
        return todos.filter(t => t.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  // ============================================
  // 🎬 ACCIONES
  // ============================================

  /**
   * ✅ BUENA PRÁCTICA: Usar useCallback para funciones
   * - Evita recrear funciones en cada render
   * - Previene re-renders innecesarios en componentes hijos
   */
  const addTodo = useCallback((text: string, priority: Todo['priority'] = 'medium') => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text: text.trim(),
      completed: false,
      priority,
      createdAt: Date.now(),
    };
    
    setTodos(prev => [...prev, newTodo]);
  }, []);

  const toggleTodo = useCallback((id: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  }, []);

  const deleteTodo = useCallback((id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }, []);

  const updateTodo = useCallback((id: string, text: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id
          ? { ...todo, text: text.trim() }
          : todo
      )
    );
  }, []);

  const clearCompleted = useCallback(() => {
    setTodos(prev => prev.filter(todo => !todo.completed));
  }, []);

  // ============================================
  // 📦 VALUE OBJECT
  // ============================================

  /**
   * ✅ BUENA PRÁCTICA: Memoizar el value object
   * - Evita re-renders cuando las dependencias no cambian
   * - CRÍTICO para el rendimiento con Context API
   */
  const value = useMemo<TodoContextType>(
    () => ({
      todos,
      filter,
      stats,
      filteredTodos,
      addTodo,
      toggleTodo,
      deleteTodo,
      updateTodo,
      setFilter,
      clearCompleted,
    }),
    [todos, filter, stats, filteredTodos, addTodo, toggleTodo, deleteTodo, updateTodo, clearCompleted]
  );

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

// ============================================
// 📝 NOTAS DE IMPLEMENTACIÓN
// ============================================

/**
 * 🔍 ANÁLISIS DE RENDIMIENTO:
 * 
 * ⚠️ PROBLEMA: Context API re-renderiza TODOS los consumidores
 * cuando CUALQUIER valor en el contexto cambia.
 * 
 * 💡 SOLUCIONES:
 * 1. Usar useMemo y useCallback (implementado aquí)
 * 2. Dividir en múltiples contextos (estado vs acciones)
 * 3. Usar React.memo en componentes consumidores
 * 4. Considerar Zustand/Redux para mejor rendimiento
 * 
 * 📊 COMPARACIÓN:
 * - Context API: Todos los consumidores se re-renderizan
 * - Zustand: Solo los componentes que usan el valor específico
 * - Redux: Solo los componentes suscritos al slice específico
 */

/**
 * 🎯 CUÁNDO USAR ESTE PATRÓN:
 * 
 * ✅ SÍ usar Context API cuando:
 * - El estado cambia raramente (< 1 vez por minuto)
 * - Tienes pocos consumidores (< 10 componentes)
 * - La aplicación es pequeña/mediana
 * - Quieres evitar dependencias externas
 * - El estado es de "configuración" (tema, auth, idioma)
 * 
 * ❌ NO usar Context API cuando:
 * - El estado cambia frecuentemente (cada segundo)
 * - Tienes muchos consumidores (> 20 componentes)
 * - Necesitas DevTools para debugging
 * - El rendimiento es crítico
 * - Prefieres menos boilerplate
 */
