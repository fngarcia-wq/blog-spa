/**
 * 📦 Exportaciones del ejemplo de Redux Toolkit
 */

import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { TodoList } from './TodoList';

export const TodoReduxExample: React.FC = () => {
  // ✅ NOTA: Redux requiere Provider (a diferencia de Zustand)
  return (
    <Provider store={store}>
      <TodoList />
    </Provider>
  );
};
