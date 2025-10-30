export function JestSetup() {
  return (
    <div className="testing-section">
      <h2 className="testing-section-title">
        🃏 Jest - Instalación y Configuración
      </h2>
      <p className="testing-section-subtitle">
        Setup completo de Jest, configuración, sintaxis básica y primeros tests
      </p>

      {/* Instalación */}
      <div className="testing-card">
        <h3 className="testing-card-title">📦 Instalación de Dependencias</h3>
        <p className="text-sm text-gray-600 mb-3">
          Instala Jest, React Testing Library y las utilidades necesarias:
        </p>

        <div className="testing-code-block">
          {`# Dependencias principales
npm install --save-dev jest @testing-library/react @testing-library/jest-dom

# Para eventos de usuario más realistas
npm install --save-dev @testing-library/user-event

# Para TypeScript (si lo usas)
npm install --save-dev @types/jest

# Para entornos de testing de DOM
npm install --save-dev jest-environment-jsdom`}
        </div>
      </div>

      {/* Configuración Jest */}
      <div className="testing-card">
        <h3 className="testing-card-title">⚙️ Configuración de Jest</h3>

        <h4 className="font-semibold mb-2">1. package.json - Scripts</h4>
        <div className="testing-code-block">
          {`{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:ci": "jest --ci --coverage --watchAll=false"
  }
}`}
        </div>

        <h4 className="font-semibold mb-2 mt-4">
          2. jest.config.js - Configuración
        </h4>
        <div className="testing-code-block">
          {`module.exports = {
  // Entorno de testing
  testEnvironment: 'jsdom',
  
  // Setup files
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  
  // Module paths
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  
  // Transform files
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  
  // Coverage
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/index.tsx',
    '!src/setupTests.ts'
  ],
  
  // Test patterns
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{ts,tsx}',
    '<rootDir>/src/**/*.{test,spec}.{ts,tsx}'
  ]
};`}
        </div>

        <h4 className="font-semibold mb-2 mt-4">3. src/setupTests.ts</h4>
        <div className="testing-code-block">
          {`// Jest DOM matchers
import '@testing-library/jest-dom';

// Mock de módulos globales si es necesario
global.fetch = jest.fn();

// Configuración global de testing
beforeEach(() => {
  // Limpiar mocks antes de cada test
  jest.clearAllMocks();
});`}
        </div>
      </div>

      {/* Sintaxis Básica */}
      <div className="testing-card">
        <h3 className="testing-card-title">📝 Sintaxis Básica de Jest</h3>

        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-blue-700 mb-2">Test Básico</h4>
            <div className="testing-code-block">
              {`// Estructura básica de un test
test('should add two numbers correctly', () => {
  // Arrange (Preparar)
  const a = 2;
  const b = 3;
  
  // Act (Actuar)
  const result = a + b;
  
  // Assert (Afirmar)
  expect(result).toBe(5);
});

// Alternativa con describe para agrupar
describe('Math operations', () => {
  test('should add correctly', () => {
    expect(2 + 3).toBe(5);
  });
  
  test('should subtract correctly', () => {
    expect(5 - 3).toBe(2);
  });
});`}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-green-700 mb-2">
              Lifecycle Hooks
            </h4>
            <div className="testing-code-block">
              {`describe('Component tests', () => {
  // Se ejecuta antes de TODOS los tests
  beforeAll(() => {
    console.log('Setup inicial');
  });
  
  // Se ejecuta antes de CADA test
  beforeEach(() => {
    console.log('Setup antes de cada test');
  });
  
  // Se ejecuta después de CADA test
  afterEach(() => {
    console.log('Cleanup después de cada test');
  });
  
  // Se ejecuta después de TODOS los tests
  afterAll(() => {
    console.log('Cleanup final');
  });
  
  test('example test', () => {
    expect(true).toBe(true);
  });
});`}
            </div>
          </div>
        </div>
      </div>

      {/* Matchers Esenciales */}
      <div className="testing-card">
        <h3 className="testing-card-title">🎯 Matchers Esenciales de Jest</h3>

        <div className="testing-grid">
          <div className="bg-blue-50 p-3 rounded-lg">
            <h4 className="font-semibold text-blue-700 mb-2">Igualdad</h4>
            <div className="testing-code-block">
              {`// Igualdad exacta
expect(2 + 2).toBe(4);

// Igualdad de objetos
expect({name: 'John'}).toEqual({name: 'John'});

// Igualdad estricta con tipos
expect('4').not.toBe(4);`}
            </div>
          </div>

          <div className="bg-green-50 p-3 rounded-lg">
            <h4 className="font-semibold text-green-700 mb-2">Truthiness</h4>
            <div className="testing-code-block">
              {`// Truthy/Falsy
expect('hello').toBeTruthy();
expect('').toBeFalsy();

// Null/Undefined
expect(null).toBeNull();
expect(undefined).toBeUndefined();
expect('test').toBeDefined();`}
            </div>
          </div>

          <div className="bg-purple-50 p-3 rounded-lg">
            <h4 className="font-semibold text-purple-700 mb-2">Números</h4>
            <div className="testing-code-block">
              {`// Comparaciones numéricas
expect(2 + 2).toBeGreaterThan(3);
expect(3.14).toBeCloseTo(3.1, 1);

// Arrays y strings
expect(['a', 'b']).toContain('a');
expect('hello world').toMatch(/world/);`}
            </div>
          </div>

          <div className="bg-orange-50 p-3 rounded-lg">
            <h4 className="font-semibold text-orange-700 mb-2">Funciones</h4>
            <div className="testing-code-block">
              {`// Mock functions
const mockFn = jest.fn();
mockFn();
expect(mockFn).toHaveBeenCalled();

// Errores
expect(() => {
  throw new Error('Oops!');
}).toThrow('Oops!');`}
            </div>
          </div>
        </div>
      </div>

      {/* Primer test React */}
      <div className="testing-card">
        <h3 className="testing-card-title">
          ⚛️ Primer Test de React Component
        </h3>

        <h4 className="font-semibold mb-2">Componente a testear:</h4>
        <div className="testing-code-block">
          {`// src/components/Welcome.tsx
interface WelcomeProps {
  name: string;
  isLoggedIn?: boolean;
}

export function Welcome({ name, isLoggedIn = false }: WelcomeProps) {
  return (
    <div>
      <h1>Welcome {name}!</h1>
      {isLoggedIn && <p>You are logged in</p>}
      {!isLoggedIn && <p>Please log in</p>}
    </div>
  );
}`}
        </div>

        <h4 className="font-semibold mb-2 mt-4">Test del componente:</h4>
        <div className="testing-code-block">
          {`// src/components/__tests__/Welcome.test.tsx
import { render, screen } from '@testing-library/react';
import { Welcome } from '../Welcome';

describe('Welcome Component', () => {
  test('renders welcome message with name', () => {
    // Arrange
    const name = 'John Doe';
    
    // Act
    render(<Welcome name={name} />);
    
    // Assert
    expect(screen.getByText('Welcome John Doe!')).toBeInTheDocument();
  });

  test('shows login message when not logged in', () => {
    render(<Welcome name="John" isLoggedIn={false} />);
    
    expect(screen.getByText('Please log in')).toBeInTheDocument();
    expect(screen.queryByText('You are logged in')).not.toBeInTheDocument();
  });

  test('shows logged in message when logged in', () => {
    render(<Welcome name="John" isLoggedIn={true} />);
    
    expect(screen.getByText('You are logged in')).toBeInTheDocument();
    expect(screen.queryByText('Please log in')).not.toBeInTheDocument();
  });
});`}
        </div>
      </div>

      {/* Comandos útiles */}
      <div className="testing-highlight">
        <h3 className="testing-highlight-title">🚀 Comandos Útiles de Jest</h3>
        <div className="testing-grid">
          <div>
            <h4 className="font-semibold mb-2">Ejecución</h4>
            <div className="testing-code-block">
              {`# Ejecutar todos los tests
npm test

# Watch mode (re-ejecuta al cambiar archivos)
npm run test:watch

# Solo tests que cambiaronv
jest --onlyChanged

# Test específico
jest Welcome.test.tsx`}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Coverage</h4>
            <div className="testing-code-block">
              {`# Reporte de coverage
npm run test:coverage

# Coverage de archivos específicos
jest --coverage --collectCoverageFrom="src/components/**"

# Threshold de coverage
jest --coverage --coverageThreshold='{"global":{"branches":80}}'`}
            </div>
          </div>
        </div>
      </div>

      {/* Debugging */}
      <div className="testing-card">
        <h3 className="testing-card-title">🐛 Debugging de Tests</h3>

        <div className="space-y-3">
          <div className="bg-yellow-50 p-3 rounded-lg">
            <h4 className="font-semibold text-yellow-700 mb-1">
              screen.debug()
            </h4>
            <p className="text-sm text-gray-600 mb-2">
              Ver el DOM renderizado en consola
            </p>
            <div className="testing-code-block">
              {`test('debug example', () => {
  render(<Welcome name="John" />);
  
  // Muestra todo el DOM
  screen.debug();
  
  // Muestra un elemento específico
  screen.debug(screen.getByText('Welcome John!'));
});`}
            </div>
          </div>

          <div className="bg-blue-50 p-3 rounded-lg">
            <h4 className="font-semibold text-blue-700 mb-1">logRoles()</h4>
            <p className="text-sm text-gray-600 mb-2">
              Ver todos los roles accesibles
            </p>
            <div className="testing-code-block">
              {`import { logRoles } from '@testing-library/dom';

test('see roles', () => {
  const { container } = render(<Welcome name="John" />);
  logRoles(container);
});`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
