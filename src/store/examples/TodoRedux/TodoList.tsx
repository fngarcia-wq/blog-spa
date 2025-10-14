/**
 * 📝 Componente de lista de TODOs usando Redux Toolkit
 */

import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from './hooks';
import {
  addTodo,
  toggleTodo,
  deleteTodo,
  updateTodo,
  setFilter,
  clearCompleted,
  selectFilteredTodos,
  selectStats,
  selectFilter,
} from './todoSlice';
import type { Todo } from '../types';

// ============================================
// 🎯 COMPONENTE PRINCIPAL
// ============================================

export const TodoList: React.FC = () => {
  // ✅ VENTAJA: Hooks tipados con autocompletado
  const dispatch = useAppDispatch();
  
  // ✅ VENTAJA: Selectores memoizados - solo re-renderiza cuando cambia
  const filteredTodos = useAppSelector(selectFilteredTodos);
  const stats = useAppSelector(selectStats);
  const filter = useAppSelector(selectFilter);

  const [newTodoText, setNewTodoText] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');

  // ============================================
  // 🎬 HANDLERS
  // ============================================

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodoText.trim()) {
      dispatch(addTodo({ text: newTodoText }));
      setNewTodoText('');
    }
  };

  const handleStartEdit = (todo: Todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  const handleSaveEdit = (id: string) => {
    if (editText.trim()) {
      dispatch(updateTodo({ id, text: editText }));
    }
    setEditingId(null);
    setEditText('');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };

  // ============================================
  // 🎨 RENDER
  // ============================================

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>⚛️ TODO - Redux Toolkit</h2>
        <div style={styles.badge}>Empresarial</div>
      </div>

      {/* Estadísticas */}
      <div style={styles.stats}>
        <div style={styles.statItem}>
          <span style={styles.statLabel}>Total:</span>
          <span style={styles.statValue}>{stats.total}</span>
        </div>
        <div style={styles.statItem}>
          <span style={styles.statLabel}>Activas:</span>
          <span style={styles.statValue}>{stats.active}</span>
        </div>
        <div style={styles.statItem}>
          <span style={styles.statLabel}>Completadas:</span>
          <span style={styles.statValue}>{stats.completed}</span>
        </div>
      </div>

      {/* Formulario de nueva tarea */}
      <form onSubmit={handleAddTodo} style={styles.form}>
        <input
          type="text"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          placeholder="¿Qué necesitas hacer?"
          style={styles.input}
        />
        <button type="submit" style={styles.addButton}>
          Agregar
        </button>
      </form>

      {/* Filtros */}
      <div style={styles.filters}>
        <button
          onClick={() => dispatch(setFilter('all'))}
          style={{
            ...styles.filterButton,
            ...(filter === 'all' ? styles.filterButtonActive : {}),
          }}
        >
          Todas
        </button>
        <button
          onClick={() => dispatch(setFilter('active'))}
          style={{
            ...styles.filterButton,
            ...(filter === 'active' ? styles.filterButtonActive : {}),
          }}
        >
          Activas
        </button>
        <button
          onClick={() => dispatch(setFilter('completed'))}
          style={{
            ...styles.filterButton,
            ...(filter === 'completed' ? styles.filterButtonActive : {}),
          }}
        >
          Completadas
        </button>
      </div>

      {/* Lista de tareas */}
      <div style={styles.todoList}>
        {filteredTodos.length === 0 ? (
          <div style={styles.emptyState}>
            {filter === 'all' && '¡No hay tareas! Agrega una nueva.'}
            {filter === 'active' && '¡No hay tareas activas!'}
            {filter === 'completed' && '¡No hay tareas completadas!'}
          </div>
        ) : (
          filteredTodos.map((todo) => (
            <div key={todo.id} style={styles.todoItem}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => dispatch(toggleTodo(todo.id))}
                style={styles.checkbox}
              />

              {editingId === todo.id ? (
                <div style={styles.editContainer}>
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    style={styles.editInput}
                    autoFocus
                  />
                  <button
                    onClick={() => handleSaveEdit(todo.id)}
                    style={styles.saveButton}
                  >
                    ✓
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    style={styles.cancelButton}
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <>
                  <span
                    style={{
                      ...styles.todoText,
                      ...(todo.completed ? styles.todoTextCompleted : {}),
                    }}
                    onDoubleClick={() => handleStartEdit(todo)}
                  >
                    {todo.text}
                  </span>
                  <span style={styles.priority}>
                    {getPriorityEmoji(todo.priority)}
                  </span>
                  <button
                    onClick={() => handleStartEdit(todo)}
                    style={styles.editButton}
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => dispatch(deleteTodo(todo.id))}
                    style={styles.deleteButton}
                  >
                    🗑️
                  </button>
                </>
              )}
            </div>
          ))
        )}
      </div>

      {/* Acciones */}
      {stats.completed > 0 && (
        <button onClick={() => dispatch(clearCompleted())} style={styles.clearButton}>
          Limpiar completadas ({stats.completed})
        </button>
      )}

      {/* Información */}
      <div style={styles.info}>
        <p style={styles.infoText}>
          💡 <strong>Redux Toolkit:</strong> Arquitectura robusta para apps empresariales.
        </p>
        <p style={styles.infoText}>
          ✅ DevTools con time-travel debugging.
        </p>
        <p style={styles.infoText}>
          🎯 Selectores memoizados con Reselect.
        </p>
      </div>

      {/* Demostración de ventajas */}
      <div style={styles.demo}>
        <h3 style={styles.demoTitle}>🎯 Ventajas de Redux Toolkit:</h3>
        <ul style={styles.demoList}>
          <li>✅ Arquitectura predecible y testeable</li>
          <li>✅ Time-travel debugging (abre Redux DevTools)</li>
          <li>✅ Immer integrado - "mutaciones" seguras</li>
          <li>✅ createAsyncThunk para operaciones async</li>
          <li>✅ RTK Query para fetching y cache</li>
          <li>✅ Ideal para equipos grandes</li>
        </ul>
      </div>
    </div>
  );
};

// ============================================
// 🛠️ UTILIDADES
// ============================================

const getPriorityEmoji = (priority: Todo['priority']): string => {
  switch (priority) {
    case 'high':
      return '🔴';
    case 'medium':
      return '🟡';
    case 'low':
      return '🟢';
    default:
      return '';
  }
};

// ============================================
// 🎨 ESTILOS
// ============================================

const styles: Record<string, React.CSSProperties> = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'system-ui, -apple-system, sans-serif',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  title: {
    margin: 0,
    fontSize: '24px',
    color: '#333',
  },
  badge: {
    backgroundColor: '#764abc',
    color: '#fff',
    padding: '4px 12px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: 'bold',
  },
  stats: {
    display: 'flex',
    gap: '20px',
    marginBottom: '20px',
    padding: '15px',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
  },
  statItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  statLabel: {
    fontSize: '12px',
    color: '#666',
    marginBottom: '4px',
  },
  statValue: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#333',
  },
  form: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
  },
  input: {
    flex: 1,
    padding: '10px',
    fontSize: '14px',
    border: '2px solid #ddd',
    borderRadius: '6px',
    outline: 'none',
  },
  addButton: {
    padding: '10px 20px',
    backgroundColor: '#764abc',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  filters: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
  },
  filterButton: {
    flex: 1,
    padding: '8px',
    backgroundColor: '#fff',
    border: '2px solid #ddd',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#000',
  },
  filterButtonActive: {
    backgroundColor: '#764abc',
    color: '#000',
    borderColor: '#764abc',
    fontWeight: 'bold',
  },
  todoList: {
    marginBottom: '20px',
  },
  todoItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '12px',
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '6px',
    marginBottom: '8px',
  },
  checkbox: {
    width: '18px',
    height: '18px',
    cursor: 'pointer',
  },
  todoText: {
    flex: 1,
    fontSize: '14px',
    color: '#333',
  },
  todoTextCompleted: {
    textDecoration: 'line-through',
    color: '#999',
  },
  priority: {
    fontSize: '16px',
  },
  editButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
  },
  deleteButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
  },
  editContainer: {
    display: 'flex',
    flex: 1,
    gap: '8px',
  },
  editInput: {
    flex: 1,
    padding: '6px',
    fontSize: '14px',
    border: '2px solid #764abc',
    borderRadius: '4px',
  },
  saveButton: {
    padding: '6px 12px',
    backgroundColor: '#4caf50',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  cancelButton: {
    padding: '6px 12px',
    backgroundColor: '#f44336',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  clearButton: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#f44336',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  emptyState: {
    textAlign: 'center',
    padding: '40px',
    color: '#999',
    fontSize: '14px',
  },
  info: {
    padding: '15px',
    backgroundColor: '#f3e5f5',
    borderRadius: '6px',
    borderLeft: '4px solid #764abc',
    marginBottom: '20px',
  },
  infoText: {
    margin: '5px 0',
    fontSize: '13px',
    color: '#4a148c',
  },
  demo: {
    padding: '15px',
    backgroundColor: '#f8f9fa',
    borderRadius: '6px',
    border: '1px solid #dee2e6',
  },
  demoTitle: {
    margin: '0 0 10px 0',
    fontSize: '16px',
    color: '#333',
  },
  demoList: {
    margin: 0,
    paddingLeft: '20px',
    fontSize: '13px',
    color: '#666',
  },
};
