/**
 * 📦 Exportaciones del ejemplo de Zustand
 */

export { TodoList } from './TodoList';
export * from './todoStore';

// Componente completo (sin Provider necesario!)
import React from 'react';
import { TodoList } from './TodoList';

export const TodoZustandExample: React.FC = () => {
  // ✅ VENTAJA: No necesitas Provider!
  return <TodoList />;
};
