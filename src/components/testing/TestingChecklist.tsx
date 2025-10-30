export function TestingChecklist() {
  return (
    <div className="testing-section">
      <h2 className="testing-section-title">✅ Testing Checklist</h2>
      <p className="testing-section-subtitle">
        Guía práctica y checklist completo para asegurar testing efectivo en tus
        proyectos
      </p>

      <div className="testing-card">
        <h3 className="testing-card-title">🚀 Setup Inicial de Testing</h3>
        <div className="space-y-4">
          <div>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span className="text-sm">
                <strong>Instalar dependencias de testing</strong>
                <code className="ml-2 px-2 py-1 bg-gray-100 rounded text-xs">
                  npm install --save-dev @testing-library/react
                  @testing-library/jest-dom @testing-library/user-event
                  jest-environment-jsdom
                </code>
              </span>
            </label>
          </div>

          <div>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span className="text-sm">
                <strong>Configurar Jest</strong> - Crear{" "}
                <code>jest.config.js</code> con setup adecuado
              </span>
            </label>
          </div>

          <div>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span className="text-sm">
                <strong>Setup file</strong> - Crear <code>setupTests.ts</code>{" "}
                con configuración global
              </span>
            </label>
          </div>

          <div>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span className="text-sm">
                <strong>Scripts en package.json</strong> - Agregar comandos de
                test, coverage, y watch
              </span>
            </label>
          </div>

          <div>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span className="text-sm">
                <strong>ESLint rules</strong> - Configurar reglas específicas
                para tests
              </span>
            </label>
          </div>
        </div>
      </div>

      <div className="testing-card">
        <h3 className="testing-card-title">🎯 Pre-Test Planning</h3>
        <div className="space-y-4">
          <div>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-green-600"
              />
              <span className="text-sm">
                <strong>Identificar funcionalidad crítica</strong> - ¿Qué debe
                funcionar siempre?
              </span>
            </label>
          </div>

          <div>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-green-600"
              />
              <span className="text-sm">
                <strong>Mapear user flows</strong> - ¿Cómo interactúan los
                usuarios?
              </span>
            </label>
          </div>

          <div>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-green-600"
              />
              <span className="text-sm">
                <strong>Definir edge cases</strong> - ¿Qué puede fallar? Datos
                vacíos, errores de red, etc.
              </span>
            </label>
          </div>

          <div>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-green-600"
              />
              <span className="text-sm">
                <strong>Planear mocks</strong> - APIs, localStorage, timers,
                external dependencies
              </span>
            </label>
          </div>

          <div>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-green-600"
              />
              <span className="text-sm">
                <strong>Decidir test types</strong> - Unit, integration, e2e
                según complejidad
              </span>
            </label>
          </div>
        </div>
      </div>

      <div className="testing-card">
        <h3 className="testing-card-title">✍️ Escribiendo Tests</h3>
        <div className="space-y-4">
          <div>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-purple-600"
              />
              <span className="text-sm">
                <strong>Nombres descriptivos</strong> - "should add todo when
                user types and clicks submit"
              </span>
            </label>
          </div>

          <div>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-purple-600"
              />
              <span className="text-sm">
                <strong>Patrón AAA</strong> - Arrange, Act, Assert claramente
                separados
              </span>
            </label>
          </div>

          <div>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-purple-600"
              />
              <span className="text-sm">
                <strong>Usar queries apropiadas</strong> - Preferir{" "}
                <code>getByRole</code> sobre <code>getByTestId</code>
              </span>
            </label>
          </div>

          <div>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-purple-600"
              />
              <span className="text-sm">
                <strong>Test user behavior</strong> - No implementation details
              </span>
            </label>
          </div>

          <div>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-purple-600"
              />
              <span className="text-sm">
                <strong>Un concepto por test</strong> - Tests focalizados y
                específicos
              </span>
            </label>
          </div>

          <div>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-purple-600"
              />
              <span className="text-sm">
                <strong>Async handling</strong> - Usar <code>waitFor</code>,{" "}
                <code>findBy*</code> cuando sea necesario
              </span>
            </label>
          </div>
        </div>
      </div>

      <div className="testing-card">
        <h3 className="testing-card-title">🎭 Component Testing Checklist</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-blue-700 mb-2">
              🎨 UI Components
            </h4>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-blue-600"
                />
                <span className="text-sm">Renders with default props</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-blue-600"
                />
                <span className="text-sm">
                  Renders with different prop combinations
                </span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-blue-600"
                />
                <span className="text-sm">
                  Handles click/interaction events
                </span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-blue-600"
                />
                <span className="text-sm">Shows correct text/content</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-blue-600"
                />
                <span className="text-sm">
                  Accessibility (roles, aria-labels)
                </span>
              </label>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-green-700 mb-2">
              📝 Form Components
            </h4>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-green-600"
                />
                <span className="text-sm">Input field updates on typing</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-green-600"
                />
                <span className="text-sm">Form submission works</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-green-600"
                />
                <span className="text-sm">Validation messages appear</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-green-600"
                />
                <span className="text-sm">Error states handled</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-green-600"
                />
                <span className="text-sm">Disabled states work</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="testing-card">
        <h3 className="testing-card-title">🔄 Integration Testing Checklist</h3>
        <div className="space-y-4">
          <div>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-orange-600"
              />
              <span className="text-sm">
                <strong>Complete user flows</strong> - End-to-end scenarios que
                usuarios reales harían
              </span>
            </label>
          </div>

          <div>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-orange-600"
              />
              <span className="text-sm">
                <strong>State management</strong> - Cambios de estado entre
                componentes
              </span>
            </label>
          </div>

          <div>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-orange-600"
              />
              <span className="text-sm">
                <strong>API interactions</strong> - Mock de llamadas de red y
                respuestas
              </span>
            </label>
          </div>

          <div>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-orange-600"
              />
              <span className="text-sm">
                <strong>Error handling</strong> - Qué pasa cuando algo falla
              </span>
            </label>
          </div>

          <div>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-orange-600"
              />
              <span className="text-sm">
                <strong>Loading states</strong> - Spinners, disabled buttons
                durante async operations
              </span>
            </label>
          </div>

          <div>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-orange-600"
              />
              <span className="text-sm">
                <strong>Persistence</strong> - localStorage, sessionStorage,
                cache
              </span>
            </label>
          </div>
        </div>
      </div>

      <div className="testing-card">
        <h3 className="testing-card-title">📊 Quality Assurance</h3>
        <div className="space-y-4">
          <div>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-red-600"
              />
              <span className="text-sm">
                <strong>Coverage thresholds</strong> - Configurar y mantener
                mínimos aceptables (80%+)
              </span>
            </label>
          </div>

          <div>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-red-600"
              />
              <span className="text-sm">
                <strong>Tests pass consistently</strong> - No flaky tests,
                resultados determinísticos
              </span>
            </label>
          </div>

          <div>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-red-600"
              />
              <span className="text-sm">
                <strong>Performance</strong> - Tests corren en tiempo razonable
                (&lt; 30s para suite completa)
              </span>
            </label>
          </div>

          <div>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-red-600"
              />
              <span className="text-sm">
                <strong>No warnings</strong> - Resolver todos los warnings de
                React Testing Library
              </span>
            </label>
          </div>

          <div>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-red-600"
              />
              <span className="text-sm">
                <strong>Tests independent</strong> - Cada test puede correr
                solo, sin dependencias de orden
              </span>
            </label>
          </div>
        </div>
      </div>

      <div className="testing-highlight">
        <h3 className="testing-highlight-title">
          🎯 Testing Strategy por Feature
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-blue-700 mb-2">
              📝 Nueva Feature
            </h4>
            <ul className="text-sm space-y-1">
              <li>1. Escribir test para happy path</li>
              <li>2. Identificar edge cases</li>
              <li>3. Test error scenarios</li>
              <li>4. Verificar accessibility</li>
              <li>5. Test interactions con resto del app</li>
              <li>6. Performance/memory leaks</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-green-700 mb-2">🐛 Bug Fix</h4>
            <ul className="text-sm space-y-1">
              <li>1. Escribir test que reproduce el bug</li>
              <li>2. Verificar que el test falla</li>
              <li>3. Implementar fix</li>
              <li>4. Verificar que test pasa</li>
              <li>5. Test regression scenarios</li>
              <li>6. Revisar tests relacionados</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="testing-card">
        <h3 className="testing-card-title">🚀 CI/CD Testing Checklist</h3>
        <div className="space-y-4">
          <div>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-indigo-600"
              />
              <span className="text-sm">
                <strong>Tests in CI pipeline</strong> - Tests corren
                automáticamente en cada PR
              </span>
            </label>
          </div>

          <div>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-indigo-600"
              />
              <span className="text-sm">
                <strong>Coverage reporting</strong> - Reports de coverage
                visibles en CI
              </span>
            </label>
          </div>

          <div>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-indigo-600"
              />
              <span className="text-sm">
                <strong>Parallel testing</strong> - Tests optimizados para speed
                en CI
              </span>
            </label>
          </div>

          <div>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-indigo-600"
              />
              <span className="text-sm">
                <strong>Artifact storage</strong> - Test reports guardados para
                review
              </span>
            </label>
          </div>

          <div>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-indigo-600"
              />
              <span className="text-sm">
                <strong>Branch protection</strong> - No merge sin tests passing
              </span>
            </label>
          </div>
        </div>
      </div>

      <div className="testing-card">
        <h3 className="testing-card-title">📚 Maintenance & Review</h3>
        <div className="space-y-4">
          <div>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-gray-600"
              />
              <span className="text-sm">
                <strong>Regular test review</strong> - Revisar tests monthly
                para relevancia
              </span>
            </label>
          </div>

          <div>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-gray-600"
              />
              <span className="text-sm">
                <strong>Remove obsolete tests</strong> - Limpiar tests de
                features removidas
              </span>
            </label>
          </div>

          <div>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-gray-600"
              />
              <span className="text-sm">
                <strong>Update dependencies</strong> - Mantener testing
                libraries actualizadas
              </span>
            </label>
          </div>

          <div>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-gray-600"
              />
              <span className="text-sm">
                <strong>Refactor test utilities</strong> - DRY principle en
                helpers y mocks
              </span>
            </label>
          </div>

          <div>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-gray-600"
              />
              <span className="text-sm">
                <strong>Team knowledge sharing</strong> - Documentar patterns y
                best practices
              </span>
            </label>
          </div>
        </div>
      </div>

      <div className="testing-highlight">
        <h3 className="testing-highlight-title">🎖️ Testing Maturity Levels</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-red-50 p-4 rounded-lg">
            <h4 className="font-semibold text-red-700 mb-2">🔴 Beginner</h4>
            <ul className="text-sm space-y-1">
              <li>• Basic component rendering tests</li>
              <li>• Simple user interactions</li>
              <li>• Manual test running</li>
              <li>• &lt; 50% coverage</li>
            </ul>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h4 className="font-semibold text-yellow-700 mb-2">
              🟡 Intermediate
            </h4>
            <ul className="text-sm space-y-1">
              <li>• Integration testing</li>
              <li>• Mocking external dependencies</li>
              <li>• CI/CD integration</li>
              <li>• 70-80% coverage</li>
            </ul>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold text-green-700 mb-2">🟢 Advanced</h4>
            <ul className="text-sm space-y-1">
              <li>• E2E testing strategy</li>
              <li>• Performance testing</li>
              <li>• Visual regression testing</li>
              <li>• 90%+ coverage</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="testing-card">
        <h3 className="testing-card-title">
          🎯 Final Checklist - Ready for Production
        </h3>
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="space-y-3">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-green-600"
              />
              <span className="text-sm font-medium">
                ✅ Todos los tests pasan consistentemente
              </span>
            </label>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-green-600"
              />
              <span className="text-sm font-medium">
                ✅ Coverage &gt; 80% en funcionalidad crítica
              </span>
            </label>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-green-600"
              />
              <span className="text-sm font-medium">
                ✅ Tests corren en CI/CD pipeline
              </span>
            </label>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-green-600"
              />
              <span className="text-sm font-medium">
                ✅ No warnings o deprecations
              </span>
            </label>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-green-600"
              />
              <span className="text-sm font-medium">
                ✅ User flows críticos cubiertos
              </span>
            </label>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-green-600"
              />
              <span className="text-sm font-medium">
                ✅ Error scenarios manejados
              </span>
            </label>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-green-600"
              />
              <span className="text-sm font-medium">
                ✅ Team trained en testing practices
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
