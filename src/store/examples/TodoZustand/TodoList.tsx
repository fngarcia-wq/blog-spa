/**
 * 📝 Componente de lista de TODOs usando Zustand
 */

import React, { useState } from 'react';
import {
  useFilteredTodos,
  useStats,
  useFilter,
  useTodoActions,
} from './todoStore';
import type { Todo } from '../types';

// ============================================
// 🎯 COMPONENTE PRINCIPAL
// ============================================

export const TodoList: React.FC = () => {
  // ✅ VENTAJA: Selectores granulares - solo re-renderiza cuando cambia lo específico
  const filteredTodos = useFilteredTodos();
  const stats = useStats();
  const filter = useFilter();
  const actions = useTodoActions();

  const [newTodoText, setNewTodoText] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');

  // ============================================
  // 🎬 HANDLERS
  // ============================================

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodoText.trim()) {
      actions.addTodo(newTodoText);
      setNewTodoText('');
    }
  };

  const handleStartEdit = (todo: Todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  const handleSaveEdit = (id: string) => {
    if (editText.trim()) {
      actions.updateTodo(id, editText);
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
        <h2 style={styles.title}>🐻 TODO - Zustand</h2>
        <div style={styles.badge}>~1 KB</div>
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
          onClick={() => actions.setFilter('all')}
          style={{
            ...styles.filterButton,
            ...(filter === 'all' ? styles.filterButtonActive : {}),
          }}
        >
          Todas
        </button>
        <button
          onClick={() => actions.setFilter('active')}
          style={{
            ...styles.filterButton,
            ...(filter === 'active' ? styles.filterButtonActive : {}),
          }}
        >
          Activas
        </button>
        <button
          onClick={() => actions.setFilter('completed')}
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
                onChange={() => actions.toggleTodo(todo.id)}
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
                    onClick={() => actions.deleteTodo(todo.id)}
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
        <button onClick={actions.clearCompleted} style={styles.clearButton}>
          Limpiar completadas ({stats.completed})
        </button>
      )}

      {/* Información */}
      <div style={styles.info}>
        <p style={styles.infoText}>
          💡 <strong>Zustand:</strong> Código mínimo, rendimiento máximo.
        </p>
        <p style={styles.infoText}>
          ✅ Solo re-renderiza componentes que usan el estado específico.
        </p>
        <p style={styles.infoText}>
          🛠️ DevTools, persist y middleware incluidos.
        </p>
      </div>

      {/* Demostración de acceso directo */}
      <div style={styles.demo}>
        <h3 style={styles.demoTitle}>🎯 Ventajas de Zustand:</h3>
        <ul style={styles.demoList}>
          <li>✅ Sin Providers - Usa el hook directamente</li>
          <li>✅ Selectores granulares - Mejor rendimiento</li>
          <li>✅ DevTools integradas - Abre Redux DevTools</li>
          <li>✅ Persist automático - Guarda en localStorage</li>
          <li>✅ TypeScript excelente - Inferencia automática</li>
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
    backgroundColor: '#ff6b6b',
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
    backgroundColor: '#ff6b6b',
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
    backgroundColor: '#ff6b6b',
    color: '#000',
    borderColor: '#ff6b6b',
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
    border: '2px solid #ff6b6b',
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
    backgroundColor: '#ffe0e0',
    borderRadius: '6px',
    borderLeft: '4px solid #ff6b6b',
    marginBottom: '20px',
  },
  infoText: {
    margin: '5px 0',
    fontSize: '13px',
    color: '#c92a2a',
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
