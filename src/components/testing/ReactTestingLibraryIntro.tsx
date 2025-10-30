export function ReactTestingLibraryIntro() {
  return (
    <div className="testing-section">
      <h2 className="testing-section-title">⚛️ React Testing Library</h2>
      <p className="testing-section-subtitle">
        Principios, queries, selectores y filosofía de testing centrada en el
        usuario
      </p>

      {/* Filosofía */}
      <div className="testing-highlight">
        <h3 className="testing-highlight-title">
          🧠 Filosofía de React Testing Library
        </h3>
        <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-700 mb-4">
          "The more your tests resemble the way your software is used, the more
          confidence they can give you."
        </blockquote>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-green-700 mb-2">
              ✅ Principios Clave
            </h4>
            <ul className="text-sm space-y-1">
              <li>• Testear comportamiento, no implementación</li>
              <li>• Queries basadas en accesibilidad</li>
              <li>• Pensar como un usuario final</li>
              <li>• Evitar detalles internos</li>
              <li>• Promover mejores prácticas</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-red-700 mb-2">
              ❌ Lo que NO hacer
            </h4>
            <ul className="text-sm space-y-1">
              <li>• Testear estado interno</li>
              <li>• Usar selectores de clase/ID</li>
              <li>• Testear métodos de componente</li>
              <li>• Verificar props directamente</li>
              <li>• Shallow rendering</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Queries Principales */}
      <div className="testing-card">
        <h3 className="testing-card-title">🔍 Queries Principales</h3>
        <p className="text-sm text-gray-600 mb-4">
          Las queries son métodos para encontrar elementos en el DOM. Están
          ordenadas por prioridad de uso:
        </p>

        <div className="space-y-4">
          {/* getByRole */}
          <div className="border-l-4 border-green-500 pl-4 bg-green-50 p-3 rounded-r-lg">
            <h4 className="font-semibold text-green-700 mb-2">
              1. getByRole (Preferida)
            </h4>
            <p className="text-sm text-gray-600 mb-2">
              Encuentra elementos por su rol de accesibilidad (ARIA roles)
            </p>
            <div className="testing-code-block">
              {`// Elementos con roles implícitos
screen.getByRole('button');           // <button>
screen.getByRole('textbox');          // <input type="text">
screen.getByRole('heading');          // <h1>, <h2>, etc.
screen.getByRole('link');             // <a href="...">

// Con opciones adicionales
screen.getByRole('button', { name: 'Submit' });
screen.getByRole('textbox', { name: /email/i });
screen.getByRole('heading', { level: 1 });

// Ver todos los roles disponibles
import { logRoles } from '@testing-library/dom';
logRoles(container);`}
            </div>
          </div>

          {/* getByLabelText */}
          <div className="border-l-4 border-blue-500 pl-4 bg-blue-50 p-3 rounded-r-lg">
            <h4 className="font-semibold text-blue-700 mb-2">
              2. getByLabelText
            </h4>
            <p className="text-sm text-gray-600 mb-2">
              Encuentra elementos por su label asociado (forms)
            </p>
            <div className="testing-code-block">
              {`// Por label exacto
screen.getByLabelText('Email Address');

// Por regex
screen.getByLabelText(/email/i);

// Por aria-label
screen.getByLabelText('Close dialog');

// Ejemplo de HTML correspondiente:
<label htmlFor="email">Email Address</label>
<input id="email" type="email" />

// O con aria-label
<input aria-label="Email Address" type="email" />`}
            </div>
          </div>

          {/* getByText */}
          <div className="border-l-4 border-purple-500 pl-4 bg-purple-50 p-3 rounded-r-lg">
            <h4 className="font-semibold text-purple-700 mb-2">3. getByText</h4>
            <p className="text-sm text-gray-600 mb-2">
              Encuentra elementos por su contenido de texto
            </p>
            <div className="testing-code-block">
              {`// Texto exacto
screen.getByText('Save Changes');

// Con regex (case insensitive)
screen.getByText(/save/i);

// Texto parcial
screen.getByText('Save', { exact: false });

// En elemento específico
screen.getByText('Submit', { selector: 'button' });

// Función personalizada
screen.getByText((content, element) => {
  return element?.tagName.toLowerCase() === 'button' && 
         content.includes('Save');
});`}
            </div>
          </div>

          {/* getByDisplayValue */}
          <div className="border-l-4 border-orange-500 pl-4 bg-orange-50 p-3 rounded-r-lg">
            <h4 className="font-semibold text-orange-700 mb-2">
              4. getByDisplayValue
            </h4>
            <p className="text-sm text-gray-600 mb-2">
              Encuentra inputs por su valor actual
            </p>
            <div className="testing-code-block">
              {`// Por valor actual del input
screen.getByDisplayValue('john@example.com');

// Con regex
screen.getByDisplayValue(/john/i);

// Útil para verificar valores predeterminados
<input defaultValue="john@example.com" />
screen.getByDisplayValue('john@example.com');`}
            </div>
          </div>

          {/* getByPlaceholderText */}
          <div className="border-l-4 border-yellow-500 pl-4 bg-yellow-50 p-3 rounded-r-lg">
            <h4 className="font-semibold text-yellow-700 mb-2">
              5. getByPlaceholderText
            </h4>
            <p className="text-sm text-gray-600 mb-2">
              Encuentra elementos por su placeholder
            </p>
            <div className="testing-code-block">
              {`// Por placeholder exacto
screen.getByPlaceholderText('Enter your email');

// Con regex
screen.getByPlaceholderText(/email/i);

// HTML correspondiente:
<input placeholder="Enter your email" />`}
            </div>
          </div>

          {/* getByTestId */}
          <div className="border-l-4 border-red-500 pl-4 bg-red-50 p-3 rounded-r-lg">
            <h4 className="font-semibold text-red-700 mb-2">
              6. getByTestId (Último recurso)
            </h4>
            <p className="text-sm text-gray-600 mb-2">
              Encuentra elementos por data-testid (usar solo cuando otras
              queries no funcionen)
            </p>
            <div className="testing-code-block">
              {`// Por test ID
screen.getByTestId('submit-button');

// HTML correspondiente:
<button data-testid="submit-button">Submit</button>

// ⚠️ Usar solo cuando:
// - No hay rol/label/texto disponible
// - Es un elemento puramente visual
// - Otras queries son muy complejas`}
            </div>
          </div>
        </div>
      </div>

      {/* Variantes de Queries */}
      <div className="testing-card">
        <h3 className="testing-card-title">🔄 Variantes de Queries</h3>

        <div className="testing-grid">
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-bold text-green-700 mb-2">getBy*</h4>
            <p className="text-sm text-gray-600 mb-2">
              Encuentra un elemento, falla si no existe
            </p>
            <div className="testing-code-block">
              {`// Retorna el elemento o lanza error
const button = screen.getByRole('button');

// Uso: Cuando DEBE existir el elemento
expect(screen.getByText('Submit')).toBeInTheDocument();`}
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-bold text-blue-700 mb-2">queryBy*</h4>
            <p className="text-sm text-gray-600 mb-2">
              Encuentra un elemento, retorna null si no existe
            </p>
            <div className="testing-code-block">
              {`// Retorna el elemento o null
const button = screen.queryByRole('button');

// Uso: Verificar que NO existe
expect(screen.queryByText('Error')).not.toBeInTheDocument();`}
            </div>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="font-bold text-purple-700 mb-2">findBy*</h4>
            <p className="text-sm text-gray-600 mb-2">
              Encuentra un elemento de forma asíncrona
            </p>
            <div className="testing-code-block">
              {`// Retorna una Promise
const button = await screen.findByRole('button');

// Uso: Elementos que aparecen después
await waitFor(() => {
  expect(screen.getByText('Loaded!')).toBeInTheDocument();
});

// O más simple:
expect(await screen.findByText('Loaded!')).toBeInTheDocument();`}
            </div>
          </div>

          <div className="bg-orange-50 p-4 rounded-lg">
            <h4 className="font-bold text-orange-700 mb-2">
              getAllBy*, queryAllBy*, findAllBy*
            </h4>
            <p className="text-sm text-gray-600 mb-2">
              Versiones que retornan arrays
            </p>
            <div className="testing-code-block">
              {`// Múltiples elementos
const buttons = screen.getAllByRole('button');
expect(buttons).toHaveLength(3);

// Query múltiple (puede ser array vacío)
const errors = screen.queryAllByText(/error/i);

// Find múltiple (asíncrono)
const items = await screen.findAllByTestId('list-item');`}
            </div>
          </div>
        </div>
      </div>

      {/* Prioridad de Queries */}
      <div className="testing-highlight">
        <h3 className="testing-highlight-title">
          📋 Orden de Prioridad para Queries
        </h3>
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-bold">
              1
            </span>
            <span className="font-semibold">getByRole</span>
            <span className="text-gray-600">- Roles de accesibilidad</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="bg-green-400 text-white px-2 py-1 rounded text-xs font-bold">
              2
            </span>
            <span className="font-semibold">getByLabelText</span>
            <span className="text-gray-600">- Labels de formularios</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-bold">
              3
            </span>
            <span className="font-semibold">getByPlaceholderText</span>
            <span className="text-gray-600">- Placeholders</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="bg-blue-400 text-white px-2 py-1 rounded text-xs font-bold">
              4
            </span>
            <span className="font-semibold">getByText</span>
            <span className="text-gray-600">- Contenido visible</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="bg-yellow-500 text-white px-2 py-1 rounded text-xs font-bold">
              5
            </span>
            <span className="font-semibold">getByDisplayValue</span>
            <span className="text-gray-600">- Valores de inputs</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
              6
            </span>
            <span className="font-semibold">getByTestId</span>
            <span className="text-gray-600">- Test IDs (último recurso)</span>
          </div>
        </div>
      </div>

      {/* Ejemplos Prácticos */}
      <div className="testing-card">
        <h3 className="testing-card-title">🛠️ Ejemplos Prácticos</h3>

        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-blue-700 mb-2">
              Formulario de Login
            </h4>
            <div className="testing-code-block">
              {`// HTML del componente
<form>
  <label htmlFor="email">Email</label>
  <input id="email" type="email" placeholder="Enter your email" />
  
  <label htmlFor="password">Password</label>
  <input id="password" type="password" />
  
  <button type="submit">Log In</button>
  <button type="button">Cancel</button>
</form>

// Tests con queries apropiadas
test('login form queries', () => {
  render(<LoginForm />);
  
  // Por label (mejor para inputs)
  const emailInput = screen.getByLabelText('Email');
  const passwordInput = screen.getByLabelText('Password');
  
  // Por role y name (mejor para buttons)
  const submitButton = screen.getByRole('button', { name: 'Log In' });
  const cancelButton = screen.getByRole('button', { name: 'Cancel' });
  
  // Por placeholder (alternativa)
  const emailByPlaceholder = screen.getByPlaceholderText('Enter your email');
  
  expect(emailInput).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();
});`}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-green-700 mb-2">
              Lista de elementos
            </h4>
            <div className="testing-code-block">
              {`// HTML del componente
<ul>
  <li>Task 1</li>
  <li>Task 2</li>
  <li>Task 3</li>
</ul>

// Test con queries múltiples
test('task list queries', () => {
  render(<TaskList />);
  
  // Todos los elementos de lista
  const listItems = screen.getAllByRole('listitem');
  expect(listItems).toHaveLength(3);
  
  // Un elemento específico
  expect(screen.getByText('Task 1')).toBeInTheDocument();
  
  // Verificar que la lista existe
  expect(screen.getByRole('list')).toBeInTheDocument();
});`}
            </div>
          </div>
        </div>
      </div>

      {/* Debugging Tips */}
      <div className="testing-card">
        <h3 className="testing-card-title">🔧 Tips de Debugging</h3>

        <div className="testing-grid">
          <div className="bg-yellow-50 p-3 rounded-lg">
            <h4 className="font-semibold text-yellow-700 mb-2">
              screen.debug()
            </h4>
            <div className="testing-code-block">
              {`// Ver todo el DOM
screen.debug();

// Ver elemento específico
screen.debug(screen.getByRole('button'));

// Limitar output
screen.debug(undefined, 300000); // 300KB`}
            </div>
          </div>

          <div className="bg-blue-50 p-3 rounded-lg">
            <h4 className="font-semibold text-blue-700 mb-2">
              screen.logTestingPlaygroundURL()
            </h4>
            <div className="testing-code-block">
              {`// Abre testing-playground en browser
test('debug with playground', () => {
  render(<MyComponent />);
  screen.logTestingPlaygroundURL();
});`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
