export function CoverageAndBestPractices() {
  return (
    <div className="testing-section">
      <h2 className="testing-section-title">📊 Coverage y Mejores Prácticas</h2>
      <p className="testing-section-subtitle">
        Métricas de cobertura, patrones AAA, y mejores prácticas para testing
        efectivo
      </p>

      <div className="testing-card">
        <h3 className="testing-card-title">📈 Configuración de Coverage</h3>
        <p className="text-sm text-gray-600 mb-4">
          Configurar Jest para generar reportes de cobertura detallados:
        </p>

        <div className="testing-code-block">
          {`// jest.config.js - Configuración de coverage
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  
  // Configuración de coverage
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: [
    'text',           // Reporte en consola
    'html',           // Reporte HTML navegable
    'lcov',           // Para herramientas CI/CD
    'json-summary'    // Para badges
  ],
  
  // Qué archivos incluir en coverage
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/index.tsx',
    '!src/reportWebVitals.ts',
    '!src/**/*.stories.{ts,tsx}',
    '!src/**/*.test.{ts,tsx}',
    '!src/setupTests.ts'
  ],
  
  // Umbrales de coverage mínimos
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    },
    // Umbrales específicos por directorio
    './src/components/': {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90
    },
    // Archivo específico crítico
    './src/hooks/useAuth.tsx': {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  }
};`}
        </div>
      </div>

      <div className="testing-highlight">
        <h3 className="testing-highlight-title">
          🎯 Entendiendo las Métricas de Coverage
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-blue-700 mb-2">
              📊 Tipos de Coverage
            </h4>
            <ul className="text-sm space-y-2">
              <li>
                • <strong>Lines:</strong> % de líneas ejecutadas
              </li>
              <li>
                • <strong>Functions:</strong> % de funciones llamadas
              </li>
              <li>
                • <strong>Branches:</strong> % de ramas if/else ejecutadas
              </li>
              <li>
                • <strong>Statements:</strong> % de declaraciones ejecutadas
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-green-700 mb-2">
              🎯 Metas Realistas
            </h4>
            <ul className="text-sm space-y-2">
              <li>
                • <strong>80-90%:</strong> Buen coverage general
              </li>
              <li>
                • <strong>90-95%:</strong> Código crítico/core
              </li>
              <li>
                • <strong>100%:</strong> Solo para funciones críticas
              </li>
              <li>
                • <strong>Calidad &gt; Cantidad:</strong> Tests significativos
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="testing-card">
        <h3 className="testing-card-title">
          🧪 Patrón AAA (Arrange-Act-Assert)
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Estructura estándar para organizar tests claros y mantenibles:
        </p>

        <div className="testing-code-block">
          {`// Ejemplo del patrón AAA
describe('TodoApp - AAA Pattern Examples', () => {
  it('adds a new todo item', async () => {
    // 🏗️ ARRANGE - Preparar el escenario
    const user = userEvent.setup();
    const mockTodos = [
      { id: 1, text: 'Existing todo', completed: false, createdAt: new Date() }
    ];
    localStorage.setItem('todos', JSON.stringify(mockTodos));
    
    render(<TodoApp />);
    const input = screen.getByTestId('todo-input');
    const addButton = screen.getByTestId('add-button');
    
    // ⚡ ACT - Ejecutar la acción
    await user.type(input, 'New todo item');
    await user.click(addButton);
    
    // ✅ ASSERT - Verificar el resultado
    expect(screen.getByText('New todo item')).toBeInTheDocument();
    expect(input).toHaveValue('');
    expect(screen.getByTestId('todo-count')).toHaveTextContent('2 of 2 todos');
  });

  it('toggles todo completion status', async () => {
    // 🏗️ ARRANGE
    const user = userEvent.setup();
    const mockTodos = [
      { id: 1, text: 'Test todo', completed: false, createdAt: new Date() }
    ];
    localStorage.setItem('todos', JSON.stringify(mockTodos));
    
    render(<TodoApp />);
    const checkbox = screen.getByTestId('todo-checkbox-1');
    
    // Verificar estado inicial
    expect(checkbox).not.toBeChecked();
    
    // ⚡ ACT
    await user.click(checkbox);
    
    // ✅ ASSERT
    expect(checkbox).toBeChecked();
    expect(screen.getByTestId('todo-text-1')).toHaveClass('line-through');
    expect(screen.getByTestId('todo-count')).toHaveTextContent('0 of 1 todos');
  });

  it('handles error when localStorage fails', () => {
    // 🏗️ ARRANGE
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    const mockGetItem = jest.spyOn(Storage.prototype, 'getItem')
      .mockImplementation(() => {
        throw new Error('localStorage error');
      });
    
    // ⚡ ACT
    render(<TodoApp />);
    
    // ✅ ASSERT
    expect(consoleSpy).toHaveBeenCalledWith(
      'Failed to load todos:',
      expect.any(Error)
    );
    expect(screen.getByTestId('empty-state')).toBeInTheDocument();
    
    // Cleanup
    consoleSpy.mockRestore();
    mockGetItem.mockRestore();
  });
});`}
        </div>
      </div>

      <div className="testing-card">
        <h3 className="testing-card-title">🏆 Mejores Prácticas de Testing</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-green-700 mb-2">✅ Hacer</h4>
            <ul className="text-sm space-y-2">
              <li>
                • <strong>Test behavior, not implementation</strong>
              </li>
              <li>
                • <strong>Usar nombres descriptivos</strong>
              </li>
              <li>
                • <strong>Un concepto por test</strong>
              </li>
              <li>
                • <strong>Tests independientes</strong>
              </li>
              <li>
                • <strong>Setup y cleanup apropiados</strong>
              </li>
              <li>
                • <strong>Usar data-testid para elementos complejos</strong>
              </li>
              <li>
                • <strong>Mock external dependencies</strong>
              </li>
              <li>
                • <strong>Test edge cases y error paths</strong>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-red-700 mb-2">❌ Evitar</h4>
            <ul className="text-sm space-y-2">
              <li>
                • <strong>Test implementation details</strong>
              </li>
              <li>
                • <strong>Tests que dependen del orden</strong>
              </li>
              <li>
                • <strong>Hard-coded test data</strong>
              </li>
              <li>
                • <strong>Tests demasiado complejos</strong>
              </li>
              <li>
                • <strong>Múltiples assertions no relacionadas</strong>
              </li>
              <li>
                • <strong>Ignorar warnings de tests</strong>
              </li>
              <li>
                • <strong>Tests sin asserts</strong>
              </li>
              <li>
                • <strong>Coverage por coverage</strong>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="testing-card">
        <h3 className="testing-card-title">🔧 Herramientas de Coverage</h3>
        <p className="text-sm text-gray-600 mb-4">
          Comandos y herramientas para trabajar con coverage:
        </p>

        <div className="testing-code-block">
          {`# Comandos de coverage
npm test -- --coverage                    # Generar reporte básico
npm test -- --coverage --watchAll=false   # Solo una vez
npm test -- --coverage --silent          # Sin output de tests

# Coverage específico
npm test TodoApp.test.tsx -- --coverage  # Solo para un archivo

# Reportes detallados
npm test -- --coverage --verbose         # Información detallada

# Coverage en CI/CD
npm test -- --coverage --ci --watchAll=false --silent

# Abrir reporte HTML
# Después de ejecutar coverage, abrir:
# coverage/lcov-report/index.html`}
        </div>
      </div>

      <div className="testing-card">
        <h3 className="testing-card-title">📋 Test Organization</h3>
        <p className="text-sm text-gray-600 mb-4">
          Estructura recomendada para organizar tests:
        </p>

        <div className="testing-code-block">
          {`// Estructura de archivos de test
src/
├── components/
│   ├── TodoApp/
│   │   ├── TodoApp.tsx
│   │   ├── TodoApp.test.tsx
│   │   ├── TodoApp.stories.tsx
│   │   └── __tests__/
│   │       ├── TodoApp.integration.test.tsx
│   │       ├── TodoApp.unit.test.tsx
│   │       └── helpers.ts
│   └── Button/
│       ├── Button.tsx
│       └── Button.test.tsx
├── hooks/
│   ├── useAuth.tsx
│   └── useAuth.test.tsx
├── utils/
│   ├── validation.ts
│   └── validation.test.ts
└── __tests__/
    ├── setup.ts
    ├── mocks/
    │   ├── localStorage.ts
    │   └── api.ts
    └── fixtures/
        ├── todos.ts
        └── users.ts

// Naming conventions
ComponentName.test.tsx        // Tests principales
ComponentName.unit.test.tsx   // Tests unitarios específicos
ComponentName.integration.test.tsx // Tests de integración
hookName.test.tsx            // Tests de hooks
utilityName.test.ts          // Tests de utilities`}
        </div>
      </div>

      <div className="testing-card">
        <h3 className="testing-card-title">
          🎯 Test Strategies por Tipo de Código
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-purple-700 mb-2">
              🔧 Components
            </h4>
            <ul className="text-sm space-y-1">
              <li>• Rendering con diferentes props</li>
              <li>• Event handling</li>
              <li>• Conditional rendering</li>
              <li>• User interactions</li>
              <li>• Accessibility</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-blue-700 mb-2">🪝 Hooks</h4>
            <ul className="text-sm space-y-1">
              <li>• Estado inicial</li>
              <li>• State transitions</li>
              <li>• Side effects</li>
              <li>• Cleanup</li>
              <li>• Error handling</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-orange-700 mb-2">🛠️ Utils</h4>
            <ul className="text-sm space-y-1">
              <li>• Input/output combinations</li>
              <li>• Edge cases</li>
              <li>• Error conditions</li>
              <li>• Type safety</li>
              <li>• Performance</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-green-700 mb-2">
              🌐 Integration
            </h4>
            <ul className="text-sm space-y-1">
              <li>• User flows completos</li>
              <li>• Cross-component communication</li>
              <li>• State management</li>
              <li>• External dependencies</li>
              <li>• Error boundaries</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="testing-highlight">
        <h3 className="testing-highlight-title">
          💡 Tips para Testing Efectivo
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-blue-700 mb-2">🚀 Performance</h4>
            <ul className="text-sm space-y-1">
              <li>
                • Usar <code>screen.getByRole</code> when possible
              </li>
              <li>• Minimize DOM queries en loops</li>
              <li>
                • Usar <code>findBy*</code> para elementos async
              </li>
              <li>
                • Setup compartido en <code>beforeEach</code>
              </li>
              <li>• Mock expensive operations</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-green-700 mb-2">
              🎯 Maintainability
            </h4>
            <ul className="text-sm space-y-1">
              <li>• Test helpers para setup común</li>
              <li>• Factories para test data</li>
              <li>• Descriptive test names</li>
              <li>• Group related tests</li>
              <li>• Regular refactoring</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
