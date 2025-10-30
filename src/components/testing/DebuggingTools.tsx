export function DebuggingTools() {
  return (
    <div className="testing-section">
      <h2 className="testing-section-title">🐛 Herramientas de Debugging</h2>
      <p className="testing-section-subtitle">
        Técnicas y herramientas para debuggear tests, troubleshooting y análisis
        de problemas
      </p>

      <div className="testing-card">
        <h3 className="testing-card-title">🔍 screen.debug()</h3>
        <p className="text-sm text-gray-600 mb-4">
          La herramienta más básica y útil para ver el estado actual del DOM:
        </p>

        <div className="testing-code-block">
          {`// Debugging básico con screen.debug()
import { render, screen } from '@testing-library/react';
import { TodoApp } from './TodoApp';

describe('TodoApp Debug Examples', () => {
  it('debugs the entire DOM', () => {
    render(<TodoApp />);
    
    // Imprime todo el DOM renderizado
    screen.debug();
    
    // Resultado en consola:
    // <body>
    //   <div>
    //     <h1>Todo App</h1>
    //     <input placeholder="What needs to be done?" />
    //     <!-- resto del DOM -->
    //   </div>
    // </body>
  });

  it('debugs specific elements', () => {
    render(<TodoApp />);
    
    const input = screen.getByTestId('todo-input');
    
    // Imprime solo el elemento específico y sus hijos
    screen.debug(input);
    
    // Resultado:
    // <input
    //   type="text"
    //   placeholder="What needs to be done?"
    //   data-testid="todo-input"
    //   value=""
    // />
  });

  it('debugs with custom maxLength', () => {
    render(<TodoApp />);
    
    // Por defecto, output se trunca a 7000 caracteres
    screen.debug(undefined, 20000); // Aumentar límite
  });

  it('debugs multiple elements', () => {
    render(<TodoApp />);
    
    const buttons = screen.getAllByRole('button');
    
    // Debug múltiples elementos
    buttons.forEach((button, index) => {
      console.log(\`Button \${index}:\`);
      screen.debug(button);
    });
  });
});`}
        </div>
      </div>

      <div className="testing-card">
        <h3 className="testing-card-title">🎮 Testing Playground</h3>
        <p className="text-sm text-gray-600 mb-4">
          Herramienta interactiva para encontrar el mejor selector para
          elementos:
        </p>

        <div className="testing-code-block">
          {`// Usando Testing Playground
import { render, screen } from '@testing-library/react';

describe('Testing Playground Examples', () => {
  it('opens testing playground URL', () => {
    render(<TodoApp />);
    
    // Genera URL para Testing Playground con el DOM actual
    screen.logTestingPlaygroundURL();
    
    // Output en consola:
    // https://testing-playground.com/#markup=DwEwlgbgfA...
    
    // Abrir la URL para:
    // 1. Ver el DOM renderizado
    // 2. Clickear en elementos
    // 3. Ver queries sugeridas
    // 4. Probar diferentes selectores
  });

  it('opens playground for specific element', () => {
    render(<TodoApp />);
    
    const form = screen.getByRole('form');
    
    // URL del playground enfocada en elemento específico
    screen.logTestingPlaygroundURL(form);
  });
});

// Testing Playground te ayuda a:
// 1. Encontrar el mejor query para un elemento
// 2. Ver todos los roles disponibles
// 3. Entender la estructura del DOM
// 4. Verificar accessibility tree
// 5. Probar queries antes de escribirlas en código`}
        </div>
      </div>

      <div className="testing-card">
        <h3 className="testing-card-title">🎯 prettyDOM y logRoles</h3>
        <p className="text-sm text-gray-600 mb-4">
          Herramientas adicionales para inspeccionar y entender el DOM:
        </p>

        <div className="testing-code-block">
          {`import { render, screen, prettyDOM, logRoles } from '@testing-library/react';

describe('DOM Inspection Tools', () => {
  it('uses prettyDOM for formatted output', () => {
    const { container } = render(<TodoApp />);
    
    // prettyDOM formatea mejor que console.log
    console.log(prettyDOM(container));
    
    // Con opciones de formatting
    console.log(prettyDOM(container, {
      maxLength: 10000,
      highlight: true
    }));
  });

  it('logs all available roles', () => {
    const { container } = render(<TodoApp />);
    
    // Muestra todos los roles accesibles en el componente
    logRoles(container);
    
    // Output ejemplo:
    // button:
    //   Name "Add":
    //     <button data-testid="add-button" />
    //   Name "Delete":
    //     <button data-testid="delete-1" />
    // 
    // textbox:
    //   Name "":
    //     <input data-testid="todo-input" />
    //
    // checkbox:
    //   Name "":
    //     <input type="checkbox" />
  });

  it('logs roles for specific element', () => {
    render(<TodoApp />);
    
    const form = screen.getByTestId('todo-form');
    logRoles(form); // Solo roles dentro del form
  });
});`}
        </div>
      </div>

      <div className="testing-highlight">
        <h3 className="testing-highlight-title">
          🔬 Debugging Strategies por Tipo de Problema
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-red-700 mb-2">
              🚫 Element Not Found
            </h4>
            <ul className="text-sm space-y-1">
              <li>
                • Usar <code>screen.debug()</code> para ver DOM actual
              </li>
              <li>• Verificar si elemento se renderiza condicionalmente</li>
              <li>
                • Usar <code>screen.logTestingPlaygroundURL()</code>
              </li>
              <li>
                • Probar con <code>queryBy*</code> para verificar ausencia
              </li>
              <li>
                • Verificar timing con <code>findBy*</code>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-orange-700 mb-2">
              ⏰ Async Issues
            </h4>
            <ul className="text-sm space-y-1">
              <li>
                • Usar <code>findBy*</code> en lugar de <code>getBy*</code>
              </li>
              <li>
                • Verificar que <code>waitFor</code> esté esperando lo correcto
              </li>
              <li>
                • Aumentar timeout en <code>waitFor</code>
              </li>
              <li>
                • Debug dentro de <code>waitFor</code> callback
              </li>
              <li>• Verificar mocks de timers</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="testing-card">
        <h3 className="testing-card-title">🐛 Advanced Debugging</h3>
        <p className="text-sm text-gray-600 mb-4">
          Técnicas avanzadas para problemas complejos:
        </p>

        <div className="testing-code-block">
          {`// 1. Debug con breakpoints
describe('Advanced Debugging', () => {
  it('uses debugger breakpoints', async () => {
    render(<TodoApp />);
    
    // Pausar execution aquí
    debugger;
    
    const input = screen.getByTestId('todo-input');
    
    // Pausar antes de interacción
    debugger;
    
    await userEvent.type(input, 'Debug todo');
    
    // Pausar después de interacción
    debugger;
    
    expect(input).toHaveValue('Debug todo');
  });

  // 2. Debug con console.log estratégicos
  it('uses strategic console logging', async () => {
    render(<TodoApp />);
    
    console.log('1. Initial render:');
    screen.debug();
    
    const input = screen.getByTestId('todo-input');
    console.log('2. Found input:', input);
    
    await userEvent.type(input, 'Test');
    console.log('3. After typing:');
    screen.debug(input);
    
    await userEvent.click(screen.getByTestId('add-button'));
    console.log('4. After adding todo:');
    screen.debug();
  });

  // 3. Debug de eventos
  it('debugs event handling', async () => {
    const mockSubmit = jest.fn();
    render(<TodoApp onSubmit={mockSubmit} />);
    
    const button = screen.getByTestId('add-button');
    
    console.log('Button before click:', {
      disabled: button.disabled,
      className: button.className,
      textContent: button.textContent
    });
    
    await userEvent.click(button);
    
    console.log('Mock calls:', mockSubmit.mock.calls);
    console.log('Mock call count:', mockSubmit.mock.calls.length);
  });

  // 4. Debug de estado de componente
  it('debugs component state', () => {
    let componentRef;
    
    const TestWrapper = () => {
      const [todos, setTodos] = useState([]);
      componentRef = { todos, setTodos };
      return <TodoApp todos={todos} setTodos={setTodos} />;
    };
    
    render(<TestWrapper />);
    
    console.log('Initial state:', componentRef.todos);
    
    // Modificar estado directamente para testing
    act(() => {
      componentRef.setTodos([{ id: 1, text: 'Test', completed: false }]);
    });
    
    console.log('After state change:', componentRef.todos);
  });
});`}
        </div>
      </div>

      <div className="testing-card">
        <h3 className="testing-card-title">🎛️ Jest Debug Configuration</h3>
        <p className="text-sm text-gray-600 mb-4">
          Configurar Jest para mejor debugging experience:
        </p>

        <div className="testing-code-block">
          {`// jest.config.js - Debug configuration
module.exports = {
  // Mostrar tests individuales con más detalle
  verbose: true,
  
  // No limpiar mocks entre tests para debugging
  clearMocks: false,
  
  // Tiempo de espera más largo para debugging
  testTimeout: 30000,
  
  // Correr tests en serie para debugging
  maxWorkers: 1,
  
  // Configurar para debugging en VS Code
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  
  // Setup para debugging
  setupFilesAfterEnv: [
    '<rootDir>/src/setupTests.ts',
    '<rootDir>/src/setupDebug.ts'
  ]
};

// setupDebug.ts - Debugging helpers
global.debug = (element) => {
  console.log('=== DEBUG START ===');
  if (element) {
    console.log(element);
  } else {
    screen.debug();
  }
  console.log('=== DEBUG END ===');
};

// Agregar timeout más largo para debugging manual
jest.setTimeout(30000);

// Log cuando test inicia
beforeEach(() => {
  console.log(\`\\n🧪 Starting test: \${expect.getState().currentTestName}\`);
});

// Log cuando test termina
afterEach(() => {
  console.log(\`✅ Finished test: \${expect.getState().currentTestName}\\n\`);
});`}
        </div>
      </div>

      <div className="testing-card">
        <h3 className="testing-card-title">📊 VS Code Debugging</h3>
        <p className="text-sm text-gray-600 mb-4">
          Configurar VS Code para debugging de tests:
        </p>

        <div className="testing-code-block">
          {`// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug Jest Tests",
      "type": "node",
      "request": "launch",
      "program": "\${workspaceFolder}/node_modules/.bin/jest",
      "args": [
        "--runInBand",
        "--no-cache",
        "--no-coverage",
        "--testNamePattern=\${input:testNamePattern}"
      ],
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen",
      "disableOptimisticBPs": true,
      "windows": {
        "program": "\${workspaceFolder}/node_modules/jest/bin/jest"
      }
    },
    {
      "name": "Debug Current Test File",
      "type": "node",
      "request": "launch",
      "program": "\${workspaceFolder}/node_modules/.bin/jest",
      "args": [
        "\${relativeFile}",
        "--runInBand",
        "--no-cache"
      ],
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen",
      "disableOptimisticBPs": true
    }
  ],
  "inputs": [
    {
      "id": "testNamePattern",
      "description": "Test name pattern",
      "default": ".*",
      "type": "promptString"
    }
  ]
}

// Para usar:
// 1. Poner breakpoints en tu test
// 2. Ir a Run and Debug (Ctrl+Shift+D)
// 3. Seleccionar "Debug Current Test File"
// 4. Press F5`}
        </div>
      </div>

      <div className="testing-card">
        <h3 className="testing-card-title">🚨 Common Debugging Scenarios</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-red-700 mb-2">
              🔍 Elemento No Encontrado
            </h4>
            <div className="testing-code-block text-sm">
              {`// 1. Verificar si existe
const element = screen.queryByText('Not Found');
console.log('Element exists:', !!element);

// 2. Ver todo el DOM
screen.debug();

// 3. Buscar variaciones
screen.getByText(/not found/i); // Case insensitive
screen.getByText('Not Found', { exact: false });

// 4. Usar Testing Playground
screen.logTestingPlaygroundURL();`}
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-orange-700 mb-2">
              ⏰ Problemas Async
            </h4>
            <div className="testing-code-block text-sm">
              {`// 1. Debug dentro de waitFor
await waitFor(() => {
  console.log('Waiting for element...');
  screen.debug();
  expect(element).toBeInTheDocument();
});

// 2. Aumentar timeout
await waitFor(() => {
  expect(element).toBeInTheDocument();
}, { timeout: 5000 });

// 3. Usar findBy instead
const element = await screen.findByText('Async content');`}
            </div>
          </div>
        </div>
      </div>

      <div className="testing-highlight">
        <h3 className="testing-highlight-title">💡 Debugging Best Practices</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-green-700 mb-2">✅ Hacer</h4>
            <ul className="text-sm space-y-1">
              <li>
                • Usar <code>screen.debug()</code> frecuentemente
              </li>
              <li>• Combinar múltiples herramientas de debugging</li>
              <li>• Aislar el problema con tests mínimos</li>
              <li>• Usar descriptive console.log messages</li>
              <li>• Verificar timing de elementos async</li>
              <li>• Usar Testing Playground para queries complejas</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-red-700 mb-2">❌ Evitar</h4>
            <ul className="text-sm space-y-1">
              <li>• Asumir que el DOM es como esperas</li>
              <li>• Usar only breakpoints sin screen.debug</li>
              <li>• Debugging múltiples issues al mismo tiempo</li>
              <li>• Ignorar warnings en console</li>
              <li>• No verificar element timing</li>
              <li>• Hardcoded waits (setTimeout)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
