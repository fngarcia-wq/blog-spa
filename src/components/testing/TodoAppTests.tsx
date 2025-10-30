export function TodoAppTests() {
  return (
    <div className="testing-section">
      <h2 className="testing-section-title">
        🧪 TodoApp - Tests de Integración
      </h2>
      <p className="testing-section-subtitle">
        Suite completa de tests para la TodoApp con casos reales de integración
      </p>

      <div className="testing-card">
        <h3 className="testing-card-title">🏗️ Estructura de Tests</h3>
        <p className="text-sm text-gray-600 mb-4">
          Los tests de integración verifican que múltiples componentes trabajen
          juntos correctamente
        </p>

        <div className="testing-code-block">
          {`// TodoApp.test.tsx - Suite completa de tests
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TodoApp } from './TodoApp';

// Mock localStorage
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});

describe('TodoApp Integration Tests', () => {
  beforeEach(() => {
    mockLocalStorage.getItem.mockClear();
    mockLocalStorage.setItem.mockClear();
    mockLocalStorage.clear.mockClear();
  });

  describe('Initial Render', () => {
    it('renders with empty state when no saved todos', () => {
      mockLocalStorage.getItem.mockReturnValue(null);
      
      render(<TodoApp />);
      
      expect(screen.getByText('Todo App')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('What needs to be done?')).toBeInTheDocument();
      expect(screen.getByTestId('empty-state')).toHaveTextContent('No todos yet. Add one above!');
    });

    it('loads saved todos from localStorage on mount', () => {
      const savedTodos = [
        { id: 1, text: 'Learn React', completed: false, createdAt: new Date().toISOString() },
        { id: 2, text: 'Write tests', completed: true, createdAt: new Date().toISOString() }
      ];
      
      mockLocalStorage.getItem.mockReturnValue(JSON.stringify(savedTodos));
      
      render(<TodoApp />);
      
      expect(screen.getByText('Learn React')).toBeInTheDocument();
      expect(screen.getByText('Write tests')).toBeInTheDocument();
      expect(screen.getByTestId('todo-count')).toHaveTextContent('1 of 2 todos remaining');
    });
  });

  describe('Adding Todos', () => {
    it('adds a new todo when user types and clicks Add', async () => {
      const user = userEvent.setup();
      render(<TodoApp />);
      
      const input = screen.getByTestId('todo-input');
      const addButton = screen.getByTestId('add-button');
      
      await user.type(input, 'New todo item');
      await user.click(addButton);
      
      expect(screen.getByText('New todo item')).toBeInTheDocument();
      expect(input).toHaveValue('');
      expect(mockLocalStorage.setItem).toHaveBeenCalled();
    });

    it('adds todo when user presses Enter', async () => {
      const user = userEvent.setup();
      render(<TodoApp />);
      
      const input = screen.getByTestId('todo-input');
      
      await user.type(input, 'Todo with Enter');
      await user.keyboard('{Enter}');
      
      expect(screen.getByText('Todo with Enter')).toBeInTheDocument();
      expect(input).toHaveValue('');
    });

    it('does not add empty todos', async () => {
      const user = userEvent.setup();
      render(<TodoApp />);
      
      const input = screen.getByTestId('todo-input');
      const addButton = screen.getByTestId('add-button');
      
      await user.type(input, '   '); // Only spaces
      await user.click(addButton);
      
      expect(screen.getByTestId('empty-state')).toBeInTheDocument();
      expect(mockLocalStorage.setItem).not.toHaveBeenCalled();
    });

    it('trims whitespace from todo text', async () => {
      const user = userEvent.setup();
      render(<TodoApp />);
      
      const input = screen.getByTestId('todo-input');
      
      await user.type(input, '  Todo with spaces  ');
      await user.keyboard('{Enter}');
      
      expect(screen.getByText('Todo with spaces')).toBeInTheDocument();
    });
  });

  describe('Todo Operations', () => {
    beforeEach(() => {
      // Setup with some initial todos
      const initialTodos = [
        { id: 1, text: 'Active todo', completed: false, createdAt: new Date().toISOString() },
        { id: 2, text: 'Completed todo', completed: true, createdAt: new Date().toISOString() }
      ];
      mockLocalStorage.getItem.mockReturnValue(JSON.stringify(initialTodos));
    });

    it('toggles todo completion status', async () => {
      const user = userEvent.setup();
      render(<TodoApp />);
      
      const checkbox = screen.getByTestId('todo-checkbox-1');
      expect(checkbox).not.toBeChecked();
      
      await user.click(checkbox);
      
      expect(checkbox).toBeChecked();
      expect(screen.getByTestId('todo-text-1')).toHaveClass('line-through');
      expect(mockLocalStorage.setItem).toHaveBeenCalled();
    });

    it('deletes todo when delete button is clicked', async () => {
      const user = userEvent.setup();
      render(<TodoApp />);
      
      expect(screen.getByText('Active todo')).toBeInTheDocument();
      
      const deleteButton = screen.getByTestId('delete-1');
      await user.click(deleteButton);
      
      expect(screen.queryByText('Active todo')).not.toBeInTheDocument();
      expect(mockLocalStorage.setItem).toHaveBeenCalled();
    });

    it('enters edit mode and saves changes', async () => {
      const user = userEvent.setup();
      render(<TodoApp />);
      
      const editButton = screen.getByTestId('edit-1');
      await user.click(editButton);
      
      const editInput = screen.getByTestId('edit-input');
      expect(editInput).toHaveValue('Active todo');
      
      await user.clear(editInput);
      await user.type(editInput, 'Updated todo');
      
      const saveButton = screen.getByTestId('save-edit');
      await user.click(saveButton);
      
      expect(screen.getByText('Updated todo')).toBeInTheDocument();
      expect(screen.queryByTestId('edit-input')).not.toBeInTheDocument();
    });

    it('cancels edit mode without saving', async () => {
      const user = userEvent.setup();
      render(<TodoApp />);
      
      const editButton = screen.getByTestId('edit-1');
      await user.click(editButton);
      
      const editInput = screen.getByTestId('edit-input');
      await user.clear(editInput);
      await user.type(editInput, 'Changed text');
      
      const cancelButton = screen.getByTestId('cancel-edit');
      await user.click(cancelButton);
      
      expect(screen.getByText('Active todo')).toBeInTheDocument();
      expect(screen.queryByTestId('edit-input')).not.toBeInTheDocument();
    });

    it('saves edit on Enter key', async () => {
      const user = userEvent.setup();
      render(<TodoApp />);
      
      await user.click(screen.getByTestId('edit-1'));
      
      const editInput = screen.getByTestId('edit-input');
      await user.clear(editInput);
      await user.type(editInput, 'Saved with Enter');
      await user.keyboard('{Enter}');
      
      expect(screen.getByText('Saved with Enter')).toBeInTheDocument();
    });

    it('cancels edit on Escape key', async () => {
      const user = userEvent.setup();
      render(<TodoApp />);
      
      await user.click(screen.getByTestId('edit-1'));
      
      const editInput = screen.getByTestId('edit-input');
      await user.clear(editInput);
      await user.type(editInput, 'Will be canceled');
      await user.keyboard('{Escape}');
      
      expect(screen.getByText('Active todo')).toBeInTheDocument();
    });
  });

  describe('Filtering', () => {
    beforeEach(() => {
      const todos = [
        { id: 1, text: 'Active 1', completed: false, createdAt: new Date().toISOString() },
        { id: 2, text: 'Active 2', completed: false, createdAt: new Date().toISOString() },
        { id: 3, text: 'Completed 1', completed: true, createdAt: new Date().toISOString() },
        { id: 4, text: 'Completed 2', completed: true, createdAt: new Date().toISOString() }
      ];
      mockLocalStorage.getItem.mockReturnValue(JSON.stringify(todos));
    });

    it('shows all todos by default', () => {
      render(<TodoApp />);
      
      expect(screen.getByText('Active 1')).toBeInTheDocument();
      expect(screen.getByText('Active 2')).toBeInTheDocument();
      expect(screen.getByText('Completed 1')).toBeInTheDocument();
      expect(screen.getByText('Completed 2')).toBeInTheDocument();
    });

    it('filters to show only active todos', async () => {
      const user = userEvent.setup();
      render(<TodoApp />);
      
      await user.click(screen.getByTestId('filter-active'));
      
      expect(screen.getByText('Active 1')).toBeInTheDocument();
      expect(screen.getByText('Active 2')).toBeInTheDocument();
      expect(screen.queryByText('Completed 1')).not.toBeInTheDocument();
      expect(screen.queryByText('Completed 2')).not.toBeInTheDocument();
    });

    it('filters to show only completed todos', async () => {
      const user = userEvent.setup();
      render(<TodoApp />);
      
      await user.click(screen.getByTestId('filter-completed'));
      
      expect(screen.queryByText('Active 1')).not.toBeInTheDocument();
      expect(screen.queryByText('Active 2')).not.toBeInTheDocument();
      expect(screen.getByText('Completed 1')).toBeInTheDocument();
      expect(screen.getByText('Completed 2')).toBeInTheDocument();
    });

    it('shows appropriate empty state for filters', async () => {
      // Start with no todos
      mockLocalStorage.getItem.mockReturnValue('[]');
      const user = userEvent.setup();
      render(<TodoApp />);
      
      await user.click(screen.getByTestId('filter-active'));
      
      expect(screen.getByTestId('empty-state')).toHaveTextContent('No active todos');
    });
  });

  describe('Bulk Operations', () => {
    beforeEach(() => {
      const todos = [
        { id: 1, text: 'Todo 1', completed: false, createdAt: new Date().toISOString() },
        { id: 2, text: 'Todo 2', completed: false, createdAt: new Date().toISOString() },
        { id: 3, text: 'Todo 3', completed: true, createdAt: new Date().toISOString() }
      ];
      mockLocalStorage.getItem.mockReturnValue(JSON.stringify(todos));
    });

    it('marks all todos as completed', async () => {
      const user = userEvent.setup();
      render(<TodoApp />);
      
      const toggleAllButton = screen.getByTestId('toggle-all');
      expect(toggleAllButton).toHaveTextContent('Mark all as complete');
      
      await user.click(toggleAllButton);
      
      expect(screen.getByTestId('todo-checkbox-1')).toBeChecked();
      expect(screen.getByTestId('todo-checkbox-2')).toBeChecked();
      expect(screen.getByTestId('todo-checkbox-3')).toBeChecked();
      expect(toggleAllButton).toHaveTextContent('Mark all as active');
    });

    it('clears completed todos', async () => {
      const user = userEvent.setup();
      render(<TodoApp />);
      
      expect(screen.getByText('Todo 3')).toBeInTheDocument();
      
      const clearButton = screen.getByTestId('clear-completed');
      expect(clearButton).toHaveTextContent('Clear completed (1)');
      
      await user.click(clearButton);
      
      expect(screen.queryByText('Todo 3')).not.toBeInTheDocument();
      expect(screen.getByText('Todo 1')).toBeInTheDocument();
      expect(screen.getByText('Todo 2')).toBeInTheDocument();
    });
  });

  describe('Todo Count and Stats', () => {
    it('shows correct count of remaining todos', () => {
      const todos = [
        { id: 1, text: 'Active 1', completed: false, createdAt: new Date().toISOString() },
        { id: 2, text: 'Active 2', completed: false, createdAt: new Date().toISOString() },
        { id: 3, text: 'Completed', completed: true, createdAt: new Date().toISOString() }
      ];
      mockLocalStorage.getItem.mockReturnValue(JSON.stringify(todos));
      
      render(<TodoApp />);
      
      expect(screen.getByTestId('todo-count')).toHaveTextContent('2 of 3 todos remaining');
    });

    it('updates count when todos are toggled', async () => {
      const todos = [
        { id: 1, text: 'Todo', completed: false, createdAt: new Date().toISOString() }
      ];
      mockLocalStorage.getItem.mockReturnValue(JSON.stringify(todos));
      
      const user = userEvent.setup();
      render(<TodoApp />);
      
      expect(screen.getByTestId('todo-count')).toHaveTextContent('1 of 1 todos remaining');
      
      await user.click(screen.getByTestId('todo-checkbox-1'));
      
      expect(screen.getByTestId('todo-count')).toHaveTextContent('0 of 1 todos remaining');
    });
  });

  describe('LocalStorage Persistence', () => {
    it('saves todos to localStorage after adding', async () => {
      const user = userEvent.setup();
      render(<TodoApp />);
      
      await user.type(screen.getByTestId('todo-input'), 'Test todo');
      await user.click(screen.getByTestId('add-button'));
      
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        'todos',
        expect.stringContaining('Test todo')
      );
    });

    it('handles corrupted localStorage data gracefully', () => {
      mockLocalStorage.getItem.mockReturnValue('invalid json');
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      
      render(<TodoApp />);
      
      expect(screen.getByTestId('empty-state')).toBeInTheDocument();
      expect(consoleSpy).toHaveBeenCalledWith('Failed to load todos:', expect.any(Error));
      
      consoleSpy.mockRestore();
    });
  });

  describe('User Experience Flows', () => {
    it('completes a full todo lifecycle', async () => {
      const user = userEvent.setup();
      render(<TodoApp />);
      
      // Add todo
      await user.type(screen.getByTestId('todo-input'), 'Complete lifecycle test');
      await user.click(screen.getByTestId('add-button'));
      
      expect(screen.getByText('Complete lifecycle test')).toBeInTheDocument();
      
      // Edit todo
      const todoId = expect.any(Number); // Dynamic ID
      await user.click(screen.getByText('Edit'));
      await user.clear(screen.getByTestId('edit-input'));
      await user.type(screen.getByTestId('edit-input'), 'Updated lifecycle test');
      await user.click(screen.getByTestId('save-edit'));
      
      expect(screen.getByText('Updated lifecycle test')).toBeInTheDocument();
      
      // Complete todo
      await user.click(screen.getByRole('checkbox'));
      
      expect(screen.getByRole('checkbox')).toBeChecked();
      
      // Delete todo
      await user.click(screen.getByText('Delete'));
      
      expect(screen.queryByText('Updated lifecycle test')).not.toBeInTheDocument();
    });
  });
});`}
        </div>
      </div>

      <div className="testing-highlight">
        <h3 className="testing-highlight-title">
          🎯 Estrategias de Testing de Integración
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-green-700 mb-2">
              ✅ Qué Testear
            </h4>
            <ul className="text-sm space-y-1">
              <li>
                • <strong>User flows:</strong> Flujos completos de usuario
              </li>
              <li>
                • <strong>State changes:</strong> Cambios de estado entre
                componentes
              </li>
              <li>
                • <strong>Side effects:</strong> LocalStorage, API calls
              </li>
              <li>
                • <strong>Conditional rendering:</strong> Diferentes estados de
                UI
              </li>
              <li>
                • <strong>Event handling:</strong> Interactions complejas
              </li>
              <li>
                • <strong>Data persistence:</strong> Save/Load scenarios
              </li>
              <li>
                • <strong>Edge cases:</strong> Error handling, empty states
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-red-700 mb-2">
              ❌ Qué NO Testear
            </h4>
            <ul className="text-sm space-y-1">
              <li>
                • <strong>Implementation details:</strong> Estado interno
                privado
              </li>
              <li>
                • <strong>Third-party libraries:</strong> Funcionalidad externa
              </li>
              <li>
                • <strong>Styling:</strong> CSS específico
              </li>
              <li>
                • <strong>Browser APIs:</strong> Ya están probadas
              </li>
              <li>
                • <strong>Constants:</strong> Valores hardcoded
              </li>
              <li>
                • <strong>Pure rendering:</strong> Sin lógica
              </li>
              <li>
                • <strong>Console logs:</strong> Debug utilities
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="testing-card">
        <h3 className="testing-card-title">
          🛠️ Configuración de Test Environment
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Setup adicional necesario para tests de integración:
        </p>

        <div className="testing-code-block">
          {`// setupTests.ts - Configuración adicional
import '@testing-library/jest-dom';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

// Mock Date para tests determinísticos
const mockDate = new Date('2024-01-01T00:00:00.000Z');
jest.spyOn(global, 'Date').mockImplementation(() => mockDate);

// Mock console.error para tests de error handling
const originalError = console.error;
beforeAll(() => {
  console.error = jest.fn();
});

afterAll(() => {
  console.error = originalError;
});`}
        </div>
      </div>

      <div className="testing-card">
        <h3 className="testing-card-title">📊 Comandos de Testing</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold mb-2">Ejecutar Tests</h4>
            <div className="testing-code-block">
              {`# Ejecutar todos los tests
npm test

# Ejecutar tests en modo watch
npm test -- --watch

# Ejecutar tests con coverage
npm test -- --coverage

# Ejecutar tests específicos
npm test TodoApp

# Ejecutar tests en modo debug
npm test -- --runInBand --no-cache`}
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Filtros Útiles</h4>
            <div className="testing-code-block">
              {`# Solo tests que fallaron la última vez
npm test -- --onlyFailures

# Tests que cambiaron en git
npm test -- --changedSince=main

# Tests relacionados a archivos específicos
npm test -- --findRelatedTests src/TodoApp.tsx

# Actualizar snapshots
npm test -- --updateSnapshot`}
            </div>
          </div>
        </div>
      </div>

      <div className="testing-card">
        <h3 className="testing-card-title">🎭 Debugging Tests</h3>
        <p className="text-sm text-gray-600 mb-4">
          Herramientas para debuggear tests complejos:
        </p>

        <div className="testing-code-block">
          {`// Debugging técnicas
describe('TodoApp Debug Example', () => {
  it('debugs complex interactions', async () => {
    const user = userEvent.setup();
    render(<TodoApp />);
    
    // 1. Inspeccionar DOM actual
    screen.debug(); // Imprime todo el DOM
    screen.debug(screen.getByTestId('todo-input')); // Solo un elemento
    
    // 2. Encontrar elementos problemáticos
    screen.logTestingPlaygroundURL(); // URL para Testing Playground
    
    // 3. Verificar queries disponibles
    const { container } = render(<TodoApp />);
    console.log(prettyDOM(container));
    
    // 4. Pausar execution para investigar
    await waitFor(() => {
      // Usar debugger en browser dev tools
      debugger;
      expect(screen.getByText('Expected text')).toBeInTheDocument();
    });
    
    // 5. Verificar state en puntos específicos
    await user.type(screen.getByTestId('todo-input'), 'Debug todo');
    screen.debug(); // Estado después de typing
    
    await user.click(screen.getByTestId('add-button'));
    screen.debug(); // Estado después de adding
  });
});`}
        </div>
      </div>
    </div>
  );
}
