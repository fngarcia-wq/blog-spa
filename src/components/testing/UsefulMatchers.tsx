export function UsefulMatchers() {
  return (
    <div className="testing-section">
      <h2 className="testing-section-title">
        🎯 Matchers Útiles
      </h2>
      <p className="testing-section-subtitle">
        Referencia completa de matchers de Jest y Testing Library para todos los casos de uso
      </p>

      <div className="testing-card">
        <h3 className="testing-card-title">🧪 Jest Matchers Básicos</h3>
        <p className="text-sm text-gray-600 mb-4">
          Matchers fundamentales para assertions básicas:
        </p>
        
        <div className="testing-code-block">
{`// Equality matchers
expect(2 + 2).toBe(4);                    // Strict equality (===)
expect({ name: 'John' }).toEqual({        // Deep equality
  name: 'John'
});
expect(['a', 'b']).toEqual(['a', 'b']);   // Array equality

// Truthiness matchers
expect(true).toBeTruthy();                // Any truthy value
expect(false).toBeFalsy();                // Any falsy value
expect(null).toBeNull();                  // Specifically null
expect(undefined).toBeUndefined();        // Specifically undefined
expect('hello').toBeDefined();            // Not undefined

// Number matchers
expect(2 + 2).toBeGreaterThan(3);
expect(3.14).toBeGreaterThanOrEqual(3);
expect(2).toBeLessThan(5);
expect(2.5).toBeLessThanOrEqual(3);
expect(0.1 + 0.2).toBeCloseTo(0.3);      // Floating point precision

// String matchers
expect('hello world').toMatch(/world/);    // Regex match
expect('hello world').toMatch('world');    // String contains
expect('hello').toHaveLength(5);           // String length

// Array/Object matchers
expect(['a', 'b', 'c']).toContain('b');   // Array contains
expect(['a', 'b']).toHaveLength(2);       // Array length
expect({ a: 1, b: 2 }).toHaveProperty('a'); // Object property
expect({ a: 1, b: 2 }).toHaveProperty('a', 1); // Property value

// Exception matchers
expect(() => {
  throw new Error('Wrong!');
}).toThrow();                             // Any error
expect(() => {
  throw new Error('Wrong!');
}).toThrow('Wrong!');                     // Specific error message`}
        </div>
      </div>

      <div className="testing-card">
        <h3 className="testing-card-title">🎭 jest-dom Matchers</h3>
        <p className="text-sm text-gray-600 mb-4">
          Matchers específicos para testing de elementos DOM:
        </p>
        
        <div className="testing-code-block">
{`// Visibility matchers
expect(element).toBeInTheDocument();      // Element exists in DOM
expect(element).toBeVisible();            // Element is visible
expect(element).not.toBeVisible();        // Element is hidden

// Content matchers
expect(element).toHaveTextContent('Hello'); // Text content
expect(element).toContainHTML('<span>');    // HTML content
expect(element).toBeEmptyDOMElement();      // No children

// Attribute matchers
expect(input).toHaveValue('test');          // Input value
expect(input).toHaveDisplayValue('Test');   // Displayed value
expect(element).toHaveAttribute('id', 'test'); // Specific attribute
expect(element).toHaveClass('active');      // CSS class
expect(element).toHaveStyle('color: red');  // Inline styles

// Form matchers
expect(checkbox).toBeChecked();             // Checkbox/radio checked
expect(input).toBeRequired();               // Required field
expect(input).toBeDisabled();               // Disabled field
expect(input).toBeEnabled();                // Enabled field
expect(input).toBeValid();                  // Valid field
expect(input).toBeInvalid();                // Invalid field

// Focus matchers
expect(element).toHaveFocus();              // Element has focus

// Accessibility matchers
expect(element).toHaveAccessibleName('Submit'); // Accessible name
expect(element).toHaveAccessibleDescription('Click to submit'); // Description`}
        </div>
      </div>

      <div className="testing-card">
        <h3 className="testing-card-title">🎯 Testing Library Queries</h3>
        <p className="text-sm text-gray-600 mb-4">
          Jerarquía de queries recomendada para encontrar elementos:
        </p>
        
        <div className="testing-code-block">
{`// 1. ByRole - PREFERIDO (más accesible)
screen.getByRole('button', { name: /submit/i });
screen.getByRole('textbox', { name: /username/i });
screen.getByRole('checkbox', { name: /agree/i });
screen.getByRole('link', { name: /home/i });

// 2. ByLabelText - Formularios con labels
screen.getByLabelText(/username/i);
screen.getByLabelText('Password');

// 3. ByPlaceholderText - Inputs con placeholder
screen.getByPlaceholderText(/enter your email/i);

// 4. ByText - Contenido visible
screen.getByText(/submit/i);
screen.getByText('Exact text match');

// 5. ByDisplayValue - Valores de inputs
screen.getByDisplayValue(/current value/i);

// 6. ByAltText - Imágenes con alt text
screen.getByAltText(/profile picture/i);

// 7. ByTitle - Elementos con title attribute
screen.getByTitle(/tooltip text/i);

// 8. ByTestId - ÚLTIMO RECURSO
screen.getByTestId('complex-component');

// Variants para cada query:
// getBy* - Encuentra uno, falla si no existe
// queryBy* - Encuentra uno, retorna null si no existe
// findBy* - Encuentra uno async, espera hasta timeout
// getAllBy* - Encuentra múltiples, falla si no existe ninguno
// queryAllBy* - Encuentra múltiples, retorna [] si no existe
// findAllBy* - Encuentra múltiples async`}
        </div>
      </div>

      <div className="testing-highlight">
        <h3 className="testing-highlight-title">
          🎨 Matchers para Casos Comunes en React
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-blue-700 mb-2">📝 Forms y Inputs</h4>
            <div className="testing-code-block text-sm">
{`// Input validation
expect(input).toBeValid();
expect(input).toBeInvalid();
expect(input).toBeRequired();

// Form submission
expect(form).toHaveFormValues({
  username: 'john',
  email: 'john@example.com'
});

// Checkbox states
expect(checkbox).toBeChecked();
expect(checkbox).not.toBeChecked();
expect(checkbox).toBePartiallyChecked();`}
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-green-700 mb-2">🎭 UI States</h4>
            <div className="testing-code-block text-sm">
{`// Loading states
expect(spinner).toBeInTheDocument();
expect(screen.queryByText(/loading/i))
  .not.toBeInTheDocument();

// Error states
expect(screen.getByRole('alert'))
  .toHaveTextContent(/error occurred/i);

// Empty states
expect(screen.getByText(/no items found/i))
  .toBeInTheDocument();`}
            </div>
          </div>
        </div>
      </div>

      <div className="testing-card">
        <h3 className="testing-card-title">🔄 Async Testing Matchers</h3>
        <p className="text-sm text-gray-600 mb-4">
          Matchers para código asíncrono y efectos de lado:
        </p>
        
        <div className="testing-code-block">
{`// waitFor - Esperar cambios en DOM
await waitFor(() => {
  expect(screen.getByText('Success!')).toBeInTheDocument();
});

// waitForElementToBeRemoved - Esperar que elemento desaparezca
await waitForElementToBeRemoved(screen.getByText('Loading...'));

// findBy queries - Automáticamente async
const button = await screen.findByRole('button', { name: /submit/i });
expect(button).toBeInTheDocument();

// waitFor con timeout personalizado
await waitFor(() => {
  expect(mockApiCall).toHaveBeenCalled();
}, { timeout: 5000 });

// waitFor con intervalo personalizado
await waitFor(() => {
  expect(counter).toBe(5);
}, { interval: 100 });

// Esperar múltiples elementos
const items = await screen.findAllByTestId('todo-item');
expect(items).toHaveLength(3);`}
        </div>
      </div>

      <div className="testing-card">
        <h3 className="testing-card-title">🎭 Mock Matchers</h3>
        <p className="text-sm text-gray-600 mb-4">
          Matchers para verificar llamadas a mocks y funciones:
        </p>
        
        <div className="testing-code-block">
{`// Mock function calls
expect(mockFunction).toHaveBeenCalled();
expect(mockFunction).toHaveBeenCalledTimes(2);
expect(mockFunction).toHaveBeenCalledWith('arg1', 'arg2');
expect(mockFunction).toHaveBeenLastCalledWith('last arg');
expect(mockFunction).toHaveBeenNthCalledWith(1, 'first call arg');

// Mock return values
expect(mockFunction).toHaveReturnedWith('expected return');
expect(mockFunction).toHaveLastReturnedWith('last return');
expect(mockFunction).toHaveNthReturnedWith(1, 'first return');

// Mock implementation verification
const mockCallback = jest.fn(x => x * 2);
[1, 2, 3].forEach(mockCallback);

expect(mockCallback).toHaveBeenCalledTimes(3);
expect(mockCallback).toHaveReturnedWith(2);
expect(mockCallback).toHaveReturnedWith(4);
expect(mockCallback).toHaveReturnedWith(6);

// Verificar que NO fue llamado
expect(mockFunction).not.toHaveBeenCalled();

// Verificar orden de llamadas
expect(mockFunction).toHaveBeenCalledBefore(otherMockFunction);
expect(mockFunction).toHaveBeenCalledAfter(otherMockFunction);`}
        </div>
      </div>

      <div className="testing-card">
        <h3 className="testing-card-title">🛠️ Custom Matchers</h3>
        <p className="text-sm text-gray-600 mb-4">
          Crear matchers personalizados para casos específicos:
        </p>
        
        <div className="testing-code-block">
{`// setupTests.ts - Extending Jest matchers
import { expect } from '@jest/globals';

// Custom matcher para verificar loading states
expect.extend({
  toBeLoading(received) {
    const pass = received.classList.contains('loading') || 
                received.getAttribute('aria-busy') === 'true';
    
    if (pass) {
      return {
        message: () => \`expected element not to be loading\`,
        pass: true,
      };
    } else {
      return {
        message: () => \`expected element to be loading\`,
        pass: false,
      };
    }
  },
});

// Custom matcher para arrays de todos
expect.extend({
  toContainTodoWithText(received, expectedText) {
    const pass = received.some(todo => todo.text === expectedText);
    
    if (pass) {
      return {
        message: () => \`expected todos not to contain "\${expectedText}"\`,
        pass: true,
      };
    } else {
      return {
        message: () => \`expected todos to contain "\${expectedText}"\`,
        pass: false,
      };
    }
  },
});

// Uso de custom matchers
expect(loadingSpinner).toBeLoading();
expect(todos).toContainTodoWithText('Learn React');

// Custom matcher para verificar accessibility
expect.extend({
  toBeAccessible(received) {
    const hasAriaLabel = received.getAttribute('aria-label');
    const hasRole = received.getAttribute('role');
    const hasAccessibleName = received.textContent || hasAriaLabel;
    
    const pass = hasAccessibleName && (hasRole || received.tagName === 'BUTTON');
    
    return {
      message: () => pass
        ? \`expected element not to be accessible\`
        : \`expected element to be accessible (needs aria-label or text content)\`,
      pass,
    };
  },
});`}
        </div>
      </div>

      <div className="testing-card">
        <h3 className="testing-card-title">📚 Quick Reference</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <h4 className="font-semibold text-purple-700 mb-2">🎯 Most Used</h4>
            <ul className="text-sm space-y-1">
              <li>• <code>toBeInTheDocument()</code></li>
              <li>• <code>toHaveTextContent()</code></li>
              <li>• <code>toBeVisible()</code></li>
              <li>• <code>toHaveValue()</code></li>
              <li>• <code>toBeChecked()</code></li>
              <li>• <code>toHaveBeenCalled()</code></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-blue-700 mb-2">🔍 Finding Elements</h4>
            <ul className="text-sm space-y-1">
              <li>• <code>getByRole()</code></li>
              <li>• <code>getByLabelText()</code></li>
              <li>• <code>getByText()</code></li>
              <li>• <code>findByRole()</code></li>
              <li>• <code>queryByText()</code></li>
              <li>• <code>getAllByRole()</code></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-green-700 mb-2">⏰ Async</h4>
            <ul className="text-sm space-y-1">
              <li>• <code>waitFor()</code></li>
              <li>• <code>findBy*()</code></li>
              <li>• <code>waitForElementToBeRemoved()</code></li>
              <li>• <code>act()</code></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="testing-highlight">
        <h3 className="testing-highlight-title">
          💡 Tips para Usar Matchers Efectivamente
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-green-700 mb-2">✅ Buenas Prácticas</h4>
            <ul className="text-sm space-y-1">
              <li>• Usar el matcher más específico posible</li>
              <li>• Preferir <code>toBeInTheDocument()</code> sobre <code>toBeTruthy()</code></li>
              <li>• Usar regex para texto que puede cambiar</li>
              <li>• Combinar múltiples matchers cuando necesario</li>
              <li>• Usar custom matchers para lógica repetitiva</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-red-700 mb-2">❌ Evitar</h4>
            <ul className="text-sm space-y-1">
              <li>• Matchers demasiado genéricos</li>
              <li>• Hard-coded text exacto en assertions</li>
              <li>• Verificar implementation details</li>
              <li>• Múltiples assertions no relacionadas</li>
              <li>• Ignorar mensajes de error de matchers</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}