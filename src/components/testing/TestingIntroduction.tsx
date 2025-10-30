export function TestingIntroduction() {
  return (
    <div className="testing-section">
      <h2 className="testing-section-title">
        🧪 Introducción al Testing
      </h2>
      <p className="testing-section-subtitle">
        Fundamentos del testing en React: pirámide de tests, tipos de tests y por qué testear
      </p>

      {/* ¿Por qué Testing? */}
      <div className="testing-highlight">
        <h3 className="testing-highlight-title">
          🎯 ¿Por qué hacer Testing?
        </h3>
        <ul className="space-y-2 text-sm">
          <li><strong>Confianza:</strong> Cambios de código sin miedo a romper funcionalidad</li>
          <li><strong>Documentación:</strong> Los tests actúan como documentación viva</li>
          <li><strong>Calidad:</strong> Detecta bugs antes de que lleguen a producción</li>
          <li><strong>Refactoring:</strong> Permite refactorizar código con seguridad</li>
          <li><strong>Velocidad:</strong> Feedback inmediato durante el desarrollo</li>
        </ul>
      </div>

      {/* Pirámide de Tests */}
      <div className="testing-card">
        <h3 className="testing-card-title">🏗️ Pirámide de Tests</h3>
        <div className="testing-grid">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h4 className="font-bold text-red-700 mb-2">🔺 E2E Tests (Pocos)</h4>
            <p className="text-sm text-gray-600 mb-2">
              Tests de extremo a extremo que prueban toda la aplicación
            </p>
            <ul className="text-xs text-gray-500 space-y-1">
              <li>• Cypress, Playwright</li>
              <li>• Lentos pero muy realistas</li>
              <li>• User journeys completos</li>
            </ul>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-bold text-yellow-700 mb-2">🔶 Integration Tests (Algunos)</h4>
            <p className="text-sm text-gray-600 mb-2">
              Tests que verifican la interacción entre componentes
            </p>
            <ul className="text-xs text-gray-500 space-y-1">
              <li>• React Testing Library</li>
              <li>• Testing de flujos completos</li>
              <li>• API calls y efectos</li>
            </ul>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-bold text-green-700 mb-2">🔻 Unit Tests (Muchos)</h4>
            <p className="text-sm text-gray-600 mb-2">
              Tests que verifican unidades individuales de código
            </p>
            <ul className="text-xs text-gray-500 space-y-1">
              <li>• Jest + RTL</li>
              <li>• Rápidos y focused</li>
              <li>• Funciones y componentes aislados</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Tipos de Tests en React */}
      <div className="testing-card">
        <h3 className="testing-card-title">⚛️ Tipos de Tests en React</h3>
        <div className="space-y-4">
          <div className="border-l-4 border-blue-500 pl-4">
            <h4 className="font-semibold text-blue-700">Component Testing</h4>
            <p className="text-sm text-gray-600">
              Testear componentes individualmente: props, estado, eventos
            </p>
            <div className="testing-code-block">
{`// Ejemplo: Test de componente Button
test('renders button with correct text', () => {
  render(<Button>Click me</Button>);
  expect(screen.getByText('Click me')).toBeInTheDocument();
});`}
            </div>
          </div>

          <div className="border-l-4 border-green-500 pl-4">
            <h4 className="font-semibold text-green-700">Integration Testing</h4>
            <p className="text-sm text-gray-600">
              Testear interacciones entre múltiples componentes
            </p>
            <div className="testing-code-block">
{`// Ejemplo: Test de integración Form + API
test('submits form data to API', async () => {
  render(<ContactForm />);
  
  fireEvent.change(screen.getByLabelText('Name'), {
    target: { value: 'John Doe' }
  });
  
  fireEvent.click(screen.getByText('Submit'));
  
  await waitFor(() => {
    expect(mockApiCall).toHaveBeenCalledWith('John Doe');
  });
});`}
            </div>
          </div>

          <div className="border-l-4 border-purple-500 pl-4">
            <h4 className="font-semibold text-purple-700">Snapshot Testing</h4>
            <p className="text-sm text-gray-600">
              Comparar el output renderizado contra snapshots guardados
            </p>
            <div className="testing-code-block">
{`// Ejemplo: Snapshot test
test('matches snapshot', () => {
  const tree = renderer
    .create(<Button variant="primary">Save</Button>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});`}
            </div>
          </div>
        </div>
      </div>

      {/* Testing Philosophy */}
      <div className="testing-highlight">
        <h3 className="testing-highlight-title">
          🧠 Filosofía de Testing
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-green-700 mb-2">✅ Qué Testear</h4>
            <ul className="text-sm space-y-1">
              <li>• Comportamiento visible del usuario</li>
              <li>• Funcionalidad crítica del negocio</li>
              <li>• Edge cases y error handling</li>
              <li>• Integraciones con APIs</li>
              <li>• Lógica compleja de la aplicación</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-red-700 mb-2">❌ Qué NO Testear</h4>
            <ul className="text-sm space-y-1">
              <li>• Detalles de implementación</li>
              <li>• Librerías de terceros</li>
              <li>• CSS y estilos (en general)</li>
              <li>• Estado interno no observable</li>
              <li>• Trivialidades obvias</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Testing Mindset */}
      <div className="testing-card">
        <h3 className="testing-card-title">🎭 Testing Mindset</h3>
        <div className="space-y-3">
          <div className="bg-blue-50 p-3 rounded-lg">
            <h4 className="font-semibold text-blue-700 mb-1">🤔 Piensa como un usuario</h4>
            <p className="text-sm text-gray-600">
              No testes cómo funciona internamente, sino qué ve y experimenta el usuario
            </p>
          </div>
          
          <div className="bg-green-50 p-3 rounded-lg">
            <h4 className="font-semibold text-green-700 mb-1">🔍 Test de comportamiento</h4>
            <p className="text-sm text-gray-600">
              Enfócate en inputs y outputs, no en la implementación interna
            </p>
          </div>
          
          <div className="bg-purple-50 p-3 rounded-lg">
            <h4 className="font-semibold text-purple-700 mb-1">🎯 Tests como documentación</h4>
            <p className="text-sm text-gray-600">
              Cada test debe ser legible y explicar claramente qué hace el código
            </p>
          </div>
        </div>
      </div>

      {/* Herramientas del Ecosistema */}
      <div className="testing-card">
        <h3 className="testing-card-title">🛠️ Herramientas del Ecosistema React Testing</h3>
        <div className="testing-grid">
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <div className="text-2xl mb-2">🃏</div>
            <h4 className="font-semibold">Jest</h4>
            <p className="text-xs text-gray-600">Test runner y framework</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <div className="text-2xl mb-2">⚛️</div>
            <h4 className="font-semibold">React Testing Library</h4>
            <p className="text-xs text-gray-600">Testing utilities para React</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <div className="text-2xl mb-2">🎭</div>
            <h4 className="font-semibold">jest-dom</h4>
            <p className="text-xs text-gray-600">Matchers adicionales para DOM</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <div className="text-2xl mb-2">👤</div>
            <h4 className="font-semibold">user-event</h4>
            <p className="text-xs text-gray-600">Simulación realista de eventos</p>
          </div>
        </div>
      </div>

      {/* Lo que veremos */}
      <div className="testing-highlight">
        <h3 className="testing-highlight-title">
          🗺️ Lo que aprenderemos en esta clase
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">Fundamentos</h4>
            <ul className="text-sm space-y-1">
              <li>• Setup de Jest y React Testing Library</li>
              <li>• Sintaxis básica y matchers</li>
              <li>• Queries y selectores</li>
              <li>• Eventos de usuario</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">Práctica Avanzada</h4>
            <ul className="text-sm space-y-1">
              <li>• Testing de formularios complejos</li>
              <li>• Mocking de APIs y módulos</li>
              <li>• Tests asíncronos</li>
              <li>• TodoApp completa con tests</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}