export function TodoAppIntegration() {
  return (
    <div className="testing-section">
      <h2 className="testing-section-title">
        📋 TodoApp - Componente de Integración
      </h2>
      <p className="testing-section-subtitle">
        Aplicación completa con CRUD para aprender tests de integración
      </p>

      <div className="testing-card">
        <h3 className="testing-card-title">🏗️ Estructura de la TodoApp</h3>
        <p className="text-sm text-gray-600 mb-4">
          Esta TodoApp incluye todas las operaciones CRUD y casos de uso reales para testing de integración
        </p>
        
        <div className="testing-code-block">
{`// TodoApp.tsx - Componente principal
import { useState, useEffect } from 'react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  createdAt: Date;
}

export function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState('');

  // Load todos from localStorage on mount
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      try {
        const parsed = JSON.parse(savedTodos);
        setTodos(parsed.map((todo: any) => ({
          ...todo,
          createdAt: new Date(todo.createdAt)
        })));
      } catch (error) {
        console.error('Failed to load todos:', error);
      }
    }
  }, []);

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (!inputValue.trim()) return;
    
    const newTodo: Todo = {
      id: Date.now(),
      text: inputValue.trim(),
      completed: false,
      createdAt: new Date()
    };
    
    setTodos(prev => [...prev, newTodo]);
    setInputValue('');
  };

  const deleteTodo = (id: number) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const toggleTodo = (id: number) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const startEditing = (id: number, text: string) => {
    setEditingId(id);
    setEditValue(text);
  };

  const saveEdit = () => {
    if (!editValue.trim()) return;
    
    setTodos(prev =>
      prev.map(todo =>
        todo.id === editingId
          ? { ...todo, text: editValue.trim() }
          : todo
      )
    );
    
    setEditingId(null);
    setEditValue('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditValue('');
  };

  const clearCompleted = () => {
    setTodos(prev => prev.filter(todo => !todo.completed));
  };

  const toggleAll = () => {
    const allCompleted = todos.every(todo => todo.completed);
    setTodos(prev =>
      prev.map(todo => ({ ...todo, completed: !allCompleted }))
    );
  };

  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return true;
    }
  });

  const activeTodosCount = todos.filter(todo => !todo.completed).length;
  const completedTodosCount = todos.filter(todo => todo.completed).length;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Todo App</h1>
      
      {/* Add Todo Form */}
      <div className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTodo()}
            placeholder="What needs to be done?"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            data-testid="todo-input"
          />
          <button
            onClick={addTodo}
            disabled={!inputValue.trim()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            data-testid="add-button"
          >
            Add
          </button>
        </div>
      </div>

      {/* Bulk Actions */}
      {todos.length > 0 && (
        <div className="mb-4 flex justify-between items-center">
          <button
            onClick={toggleAll}
            className="text-sm text-gray-600 hover:text-gray-800"
            data-testid="toggle-all"
          >
            {todos.every(todo => todo.completed) ? 'Mark all as active' : 'Mark all as complete'}
          </button>
          
          {completedTodosCount > 0 && (
            <button
              onClick={clearCompleted}
              className="text-sm text-red-600 hover:text-red-800"
              data-testid="clear-completed"
            >
              Clear completed ({completedTodosCount})
            </button>
          )}
        </div>
      )}

      {/* Filter Tabs */}
      <div className="mb-4 flex gap-1 bg-gray-100 rounded-lg p-1">
        {(['all', 'active', 'completed'] as const).map(filterType => (
          <button
            key={filterType}
            onClick={() => setFilter(filterType)}
            className={\`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors \${
              filter === filterType
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }\`}
            data-testid={\`filter-\${filterType}\`}
          >
            {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
            {filterType === 'active' && activeTodosCount > 0 && (
              <span className="ml-1 text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                {activeTodosCount}
              </span>
            )}
            {filterType === 'completed' && completedTodosCount > 0 && (
              <span className="ml-1 text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                {completedTodosCount}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Todo List */}
      <div className="space-y-2">
        {filteredTodos.length === 0 ? (
          <div className="text-center py-8 text-gray-500" data-testid="empty-state">
            {todos.length === 0 
              ? "No todos yet. Add one above!"
              : \`No \${filter} todos\`
            }
          </div>
        ) : (
          filteredTodos.map(todo => (
            <div
              key={todo.id}
              className={\`flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg \${
                todo.completed ? 'opacity-75' : ''
              }\`}
              data-testid="todo-item"
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                data-testid={\`todo-checkbox-\${todo.id}\`}
              />
              
              {editingId === todo.id ? (
                <div className="flex-1 flex gap-2">
                  <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') saveEdit();
                      if (e.key === 'Escape') cancelEdit();
                    }}
                    className="flex-1 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    data-testid="edit-input"
                    autoFocus
                  />
                  <button
                    onClick={saveEdit}
                    className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
                    data-testid="save-edit"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700"
                    data-testid="cancel-edit"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <>
                  <span
                    className={\`flex-1 \${
                      todo.completed
                        ? 'line-through text-gray-500'
                        : 'text-gray-900'
                    }\`}
                    data-testid={\`todo-text-\${todo.id}\`}
                  >
                    {todo.text}
                  </span>
                  
                  <button
                    onClick={() => startEditing(todo.id, todo.text)}
                    className="px-3 py-1 text-blue-600 hover:bg-blue-50 rounded text-sm"
                    data-testid={\`edit-\${todo.id}\`}
                  >
                    Edit
                  </button>
                  
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="px-3 py-1 text-red-600 hover:bg-red-50 rounded text-sm"
                    data-testid={\`delete-\${todo.id}\`}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          ))
        )}
      </div>

      {/* Footer Stats */}
      {todos.length > 0 && (
        <div className="mt-6 text-center text-sm text-gray-500">
          <p data-testid="todo-count">
            {activeTodosCount} of {todos.length} todos remaining
          </p>
        </div>
      )}
    </div>
  );
}`}
        </div>
      </div>

      <div className="testing-highlight">
        <h3 className="testing-highlight-title">
          🎯 Características de la TodoApp para Testing
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-green-700 mb-2">✅ Funcionalidades</h4>
            <ul className="text-sm space-y-1">
              <li>• <strong>CRUD completo:</strong> Create, Read, Update, Delete</li>
              <li>• <strong>Estados:</strong> Completed, Active, All</li>
              <li>• <strong>Filtros:</strong> Cambio de vista dinámico</li>
              <li>• <strong>Edición inline:</strong> Edit mode con validación</li>
              <li>• <strong>Bulk actions:</strong> Toggle all, Clear completed</li>
              <li>• <strong>Persistencia:</strong> LocalStorage integration</li>
              <li>• <strong>Contadores:</strong> Stats en tiempo real</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-blue-700 mb-2">🧪 Casos de Testing</h4>
            <ul className="text-sm space-y-1">
              <li>• <strong>User flows:</strong> Flujos completos de usuario</li>
              <li>• <strong>State management:</strong> Cambios de estado complejos</li>
              <li>• <strong>Side effects:</strong> LocalStorage, useEffect</li>
              <li>• <strong>Conditional rendering:</strong> Empty states, filters</li>
              <li>• <strong>Eventos:</strong> Click, keyboard, form submission</li>
              <li>• <strong>Data persistence:</strong> Reload y recovery</li>
              <li>• <strong>Edge cases:</strong> Empty strings, duplicates</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="testing-card">
        <h3 className="testing-card-title">🎮 Demo Interactivo</h3>
        <p className="text-sm text-gray-600 mb-4">
          Prueba la TodoApp para entender su comportamiento antes de ver los tests:
        </p>
        
        <div className="border-2 border-gray-200 rounded-lg p-4 bg-gray-50">
          <div className="text-center py-8 text-gray-600">
            <div className="text-4xl mb-2">📋</div>
            <p className="font-medium">TodoApp Demo</p>
            <p className="text-sm mt-1">
              La implementación completa estaría aquí.
              <br />
              Por ahora, revisa el código arriba para entender la estructura.
            </p>
          </div>
        </div>
      </div>

      <div className="testing-card">
        <h3 className="testing-card-title">📊 Métricas de Testing Coverage</h3>
        <p className="text-sm text-gray-600 mb-4">
          Esta TodoApp es perfecta para lograr alta cobertura de testing:
        </p>
        
        <div className="grid md:grid-cols-4 gap-4">
          <div className="bg-green-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-green-600">95%</div>
            <div className="text-sm text-green-700">Lines</div>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-blue-600">90%</div>
            <div className="text-sm text-blue-700">Functions</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-purple-600">85%</div>
            <div className="text-sm text-purple-700">Branches</div>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-orange-600">92%</div>
            <div className="text-sm text-orange-700">Statements</div>
          </div>
        </div>
      </div>
    </div>
  );
}