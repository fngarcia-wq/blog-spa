/**
 * 📦 Exportaciones del ejemplo de Context API
 */

export { TodoProvider, useTodoContext } from './TodoContext';
export { TodoList } from './TodoList';

// Componente completo con Provider
import React from 'react';
import { TodoProvider } from './TodoContext';
import { TodoList } from './TodoList';

export const TodoContextExample: React.FC = () => {
  return (
    <TodoProvider>
      <TodoList />
    </TodoProvider>
  );
};
