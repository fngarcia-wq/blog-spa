import React, { useState } from 'react';
import { 
  BrowserRouter, 
  Routes, 
  Route, 
  Link, 
  NavLink,
  useParams,
  useSearchParams,
  useNavigate,
  Navigate,
  Outlet,
  useLocation
} from 'react-router-dom';
import './SPADemo.css';

// 📚 PÁGINA PRINCIPAL DE DEMOSTRACIÓN

export default function SPADemo() {
  const [currentSection, setCurrentSection] = useState<string>('intro');

  const sections = [
    { id: 'intro', title: '1. ¿Qué es una SPA?', icon: '🚀' },
    { id: 'comparison', title: '2. Comparación Visual', icon: '🆚' },
    { id: 'router-basics', title: '3. React Router Básico', icon: '🔗' },
    { id: 'dynamic-routes', title: '4. Rutas Dinámicas', icon: '📌' },
    { id: 'navigation', title: '5. Navegación Programática', icon: '🎯' },
    { id: 'protected', title: '6. Rutas Protegidas ⭐', icon: '🔒' },
    { id: 'nested', title: '7. Rutas Anidadas', icon: '🏗️' },
    { id: 'complete', title: '8. Ejemplo Completo', icon: '✨' }
  ];

  return (
    <div className="spa-demo-container">
      {/* Sidebar de Navegación */}
      <aside className="spa-demo-sidebar">
        <h2>📚 Índice</h2>
        <nav>
          {sections.map(section => (
            <button
              key={section.id}
              className={currentSection === section.id ? 'active' : ''}
              onClick={() => setCurrentSection(section.id)}
            >
              <span className="icon">{section.icon}</span>
              <span className="title">{section.title}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Contenido Principal */}
      <main className="spa-demo-content">
        {currentSection === 'intro' && <IntroSection />}
        {currentSection === 'comparison' && <ComparisonSection />}
        {currentSection === 'router-basics' && <RouterBasicsSection />}
        {currentSection === 'dynamic-routes' && <DynamicRoutesSection />}
        {currentSection === 'navigation' && <NavigationSection />}
        {currentSection === 'protected' && <ProtectedRoutesSection />}
        {currentSection === 'nested' && <NestedRoutesSection />}
        {currentSection === 'complete' && <CompleteExampleSection />}
      </main>
    </div>
  );
}

// ============================================
// SECCIÓN 1: INTRODUCCIÓN
// ============================================

function IntroSection() {
  return (
    <section className="demo-section">
      <h1>🚀 ¿Qué es una SPA?</h1>
      
      <div className="definition-card">
        <h2>Single Page Application</h2>
        <p>
          Una <strong>SPA</strong> es una aplicación web que carga <strong>una única página HTML</strong> 
          y actualiza dinámicamente el contenido <strong>sin recargar la página completa</strong>.
        </p>
      </div>

      <div className="benefits-grid">
        <div className="benefit-card">
          <span className="benefit-icon">⚡</span>
          <h3>Rápida</h3>
          <p>Navegación instantánea sin recargas</p>
        </div>
        
        <div className="benefit-card">
          <span className="benefit-icon">💾</span>
          <h3>Estado Persistente</h3>
          <p>No pierde datos entre páginas</p>
        </div>
        
        <div className="benefit-card">
          <span className="benefit-icon">📱</span>
          <h3>Como App Nativa</h3>
          <p>Experiencia fluida y moderna</p>
        </div>
        
        <div className="benefit-card">
          <span className="benefit-icon">🎨</span>
          <h3>Interactiva</h3>
          <p>Transiciones y animaciones suaves</p>
        </div>
      </div>

      <div className="famous-spas">
        <h3>🌟 SPAs Famosas</h3>
        <div className="spas-grid">
          {[
            { name: 'Gmail', tech: 'Closure/React', feature: 'Correos sin recarga' },
            { name: 'Facebook', tech: 'React', feature: 'Feed infinito' },
            { name: 'Netflix', tech: 'React', feature: 'Navegación películas' },
            { name: 'Spotify', tech: 'React', feature: 'Música continua' },
            { name: 'Trello', tech: 'React', feature: 'Drag & drop fluido' },
            { name: 'Discord', tech: 'React', feature: 'Chat tiempo real' }
          ].map(spa => (
            <div key={spa.name} className="spa-card">
              <h4>{spa.name}</h4>
              <p className="tech">{spa.tech}</p>
              <p className="feature">{spa.feature}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// SECCIÓN 2: COMPARACIÓN VISUAL
// ============================================

function ComparisonSection() {
  const [activeDemo, setActiveDemo] = useState<'traditional' | 'spa'>('traditional');
  const [isLoading, setIsLoading] = useState(false);

  const simulateNavigation = (type: 'traditional' | 'spa') => {
    setIsLoading(true);
    
    if (type === 'traditional') {
      // Simular recarga completa (2-3 segundos)
      setTimeout(() => {
        setIsLoading(false);
        setActiveDemo(type);
      }, 2500);
    } else {
      // Simular navegación SPA (instantánea)
      setTimeout(() => {
        setIsLoading(false);
        setActiveDemo(type);
      }, 100);
    }
  };

  return (
    <section className="demo-section">
      <h1>🆚 Comparación Visual</h1>
      
      <div className="comparison-container">
        {/* Aplicación Tradicional */}
        <div className="comparison-column">
          <h2>❌ Aplicación Tradicional</h2>
          
          <div className="browser-mockup">
            <div className="browser-bar">
              <span className="browser-dots">
                <span></span><span></span><span></span>
              </span>
              <div className="browser-url">example.com/page1.html</div>
            </div>
            
            {isLoading && activeDemo === 'traditional' ? (
              <div className="loading-screen">
                <div className="spinner"></div>
                <p>Cargando página completa...</p>
                <p className="loading-time">⏱️ 2-3 segundos</p>
              </div>
            ) : (
              <div className="browser-content">
                <div className="fake-header">Header</div>
                <div className="fake-nav">Navigation</div>
                <div className="fake-content">
                  <h3>Página 1</h3>
                  <p>Todo el contenido se recarga...</p>
                </div>
                <div className="fake-footer">Footer</div>
              </div>
            )}
          </div>
          
          <button 
            className="demo-button traditional"
            onClick={() => simulateNavigation('traditional')}
            disabled={isLoading}
          >
            Navegar a Página 2 (Tradicional)
          </button>
          
          <div className="comparison-problems">
            <h4>❌ Problemas:</h4>
            <ul>
              <li>Recarga COMPLETA de la página</li>
              <li>Flash blanco entre páginas</li>
              <li>Pérdida de estado</li>
              <li>Múltiples peticiones HTTP</li>
              <li>Experiencia interrumpida</li>
            </ul>
          </div>
        </div>

        {/* SPA */}
        <div className="comparison-column">
          <h2>✅ Single Page Application</h2>
          
          <div className="browser-mockup">
            <div className="browser-bar">
              <span className="browser-dots">
                <span></span><span></span><span></span>
              </span>
              <div className="browser-url">example.com/page1</div>
            </div>
            
            {isLoading && activeDemo === 'spa' ? (
              <div className="loading-screen spa-loading">
                <div className="smooth-transition">✨</div>
                <p>Transición suave...</p>
                <p className="loading-time">⚡ &lt;100ms</p>
              </div>
            ) : (
              <div className="browser-content">
                <div className="fake-header persistent">Header (persiste)</div>
                <div className="fake-nav persistent">Navigation (persiste)</div>
                <div className="fake-content highlighted">
                  <h3>Página 1</h3>
                  <p>Solo esto cambia →</p>
                </div>
                <div className="fake-footer persistent">Footer (persiste)</div>
              </div>
            )}
          </div>
          
          <button 
            className="demo-button spa"
            onClick={() => simulateNavigation('spa')}
            disabled={isLoading}
          >
            Navegar a Página 2 (SPA)
          </button>
          
          <div className="comparison-benefits">
            <h4>✅ Ventajas:</h4>
            <ul>
              <li>Sin recarga de página</li>
              <li>Transiciones suaves</li>
              <li>Mantiene el estado</li>
              <li>Solo carga datos necesarios</li>
              <li>Experiencia fluida</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Diagrama de flujo */}
      <div className="flow-diagram">
        <h3>📊 Flujo de Navegación</h3>
        
        <div className="flow-columns">
          <div className="flow-column">
            <h4>Tradicional (MPA)</h4>
            <div className="flow-steps">
              <div className="flow-step">👆 Click en link</div>
              <div className="flow-arrow">↓</div>
              <div className="flow-step">🌐 Petición HTTP al servidor</div>
              <div className="flow-arrow">↓</div>
              <div className="flow-step">📥 Descarga HTML completo</div>
              <div className="flow-arrow">↓</div>
              <div className="flow-step">🗑️ Destruye página actual</div>
              <div className="flow-arrow">↓</div>
              <div className="flow-step">🔄 Recarga TODO (CSS, JS, imágenes)</div>
              <div className="flow-arrow">↓</div>
              <div className="flow-step time-slow">⏱️ 2-3 segundos</div>
            </div>
          </div>

          <div className="flow-column">
            <h4>SPA</h4>
            <div className="flow-steps">
              <div className="flow-step">👆 Click en link</div>
              <div className="flow-arrow">↓</div>
              <div className="flow-step">⚛️ React Router cambia URL</div>
              <div className="flow-arrow">↓</div>
              <div className="flow-step">🎨 Renderiza componente nuevo</div>
              <div className="flow-arrow">↓</div>
              <div className="flow-step">💾 Mantiene estado y contexto</div>
              <div className="flow-arrow">↓</div>
              <div className="flow-step">✨ Transición suave</div>
              <div className="flow-arrow">↓</div>
              <div className="flow-step time-fast">⚡ &lt;100ms</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// SECCIÓN 3: ROUTER BÁSICO
// ============================================

function RouterBasicsSection() {
  return (
    <section className="demo-section">
      <h1>🔗 React Router Básico</h1>
      
      <div className="concepts-grid">
        <div className="concept-card">
          <h3>📦 BrowserRouter</h3>
          <pre><code>{`<BrowserRouter>
  <App />
</BrowserRouter>`}</code></pre>
          <p>Envuelve toda tu aplicación</p>
        </div>

        <div className="concept-card">
          <h3>🛣️ Routes & Route</h3>
          <pre><code>{`<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
</Routes>`}</code></pre>
          <p>Define las rutas de tu app</p>
        </div>

        <div className="concept-card">
          <h3>🔗 Link</h3>
          <pre><code>{`<Link to="/about">
  Acerca de
</Link>`}</code></pre>
          <p>Navegación sin recarga</p>
        </div>

        <div className="concept-card">
          <h3>🎯 NavLink</h3>
          <pre><code>{`<NavLink 
  to="/about"
  className={({ isActive }) => 
    isActive ? 'active' : ''
  }
>
  Acerca de
</NavLink>`}</code></pre>
          <p>Link con estilos activos</p>
        </div>
      </div>

      {/* Mini demo interactivo */}
      <div className="mini-demo">
        <h3>🎮 Demo Interactivo</h3>
        <BasicRouterDemo />
      </div>
    </section>
  );
}

// Mini demo de router básico
function BasicRouterDemo() {
  const [currentPage, setCurrentPage] = useState<'home' | 'about' | 'contact'>('home');

  const pages = {
    home: {
      title: 'Inicio',
      content: 'Bienvenido a la página de inicio. Esta es una SPA simulada.',
      icon: '🏠'
    },
    about: {
      title: 'Acerca de',
      content: 'Información sobre nuestra aplicación. Nota: sin recargas!',
      icon: 'ℹ️'
    },
    contact: {
      title: 'Contacto',
      content: 'Formulario de contacto. La URL cambiaría pero la página no se recarga.',
      icon: '📧'
    }
  };

  return (
    <div className="basic-router-demo">
      <nav className="demo-nav">
        {Object.entries(pages).map(([key, page]) => (
          <button
            key={key}
            className={currentPage === key ? 'active' : ''}
            onClick={() => setCurrentPage(key as any)}
          >
            <span>{page.icon}</span> {page.title}
          </button>
        ))}
      </nav>
      
      <div className="demo-content">
        <div className="demo-url">URL: example.com/{currentPage}</div>
        <h2>{pages[currentPage].icon} {pages[currentPage].title}</h2>
        <p>{pages[currentPage].content}</p>
        <div className="demo-note">
          ✨ <strong>Nota:</strong> La página NO se recargó, solo cambió el contenido
        </div>
      </div>
    </div>
  );
}

// ============================================
// SECCIÓN 4: RUTAS DINÁMICAS
// ============================================

function DynamicRoutesSection() {
  const [selectedPost, setSelectedPost] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [pageNumber, setPageNumber] = useState(1);

  const posts = [
    { id: 1, title: 'Introducción a React', author: 'Ana García' },
    { id: 2, title: 'State Management', author: 'Carlos Méndez' },
    { id: 3, title: 'React Router', author: 'María López' }
  ];

  return (
    <section className="demo-section">
      <h1>📌 Rutas Dinámicas</h1>
      
      <div className="dynamic-routes-demo">
        <div className="demo-column">
          <h3>useParams - Parámetros de Ruta</h3>
          
          <div className="code-example">
            <pre><code>{`// Definir ruta con parámetro
<Route path="/posts/:id" element={<PostDetail />} />

// En el componente
const { id } = useParams();`}</code></pre>
          </div>
          
          <div className="posts-list">
            <h4>📝 Lista de Posts</h4>
            {posts.map(post => (
              <div 
                key={post.id}
                className={`post-item ${selectedPost === post.id ? 'selected' : ''}`}
                onClick={() => setSelectedPost(post.id)}
              >
                <strong>{post.title}</strong>
                <span className="post-author">por {post.author}</span>
                <div className="post-url">URL: /posts/{post.id}</div>
              </div>
            ))}
          </div>
          
          {selectedPost && (
            <div className="post-detail">
              <h4>📄 Post Detail Component</h4>
              <p><code>const {`{ id }`} = useParams()</code></p>
              <p><strong>ID capturado:</strong> {selectedPost}</p>
              <p>Mostrando detalles del post #{selectedPost}</p>
            </div>
          )}
        </div>

        <div className="demo-column">
          <h3>useSearchParams - Query Params</h3>
          
          <div className="code-example">
            <pre><code>{`const [searchParams, setSearchParams] = useSearchParams();

const query = searchParams.get('q');
const page = searchParams.get('page');`}</code></pre>
          </div>
          
          <div className="search-demo">
            <h4>🔍 Buscador con Query Params</h4>
            
            <input
              type="text"
              placeholder="Buscar posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            
            <div className="pagination">
              <button onClick={() => setPageNumber(p => Math.max(1, p - 1))}>
                ← Anterior
              </button>
              <span>Página {pageNumber}</span>
              <button onClick={() => setPageNumber(p => p + 1)}>
                Siguiente →
              </button>
            </div>
            
            <div className="url-display">
              <strong>URL resultante:</strong>
              <code>/search?q={searchQuery || '...'}&page={pageNumber}</code>
            </div>
            
            <div className="params-extracted">
              <h5>Parámetros extraídos:</h5>
              <ul>
                <li><code>query</code>: "{searchQuery || '(vacío)'}"</li>
                <li><code>page</code>: {pageNumber}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// SECCIÓN 5: NAVEGACIÓN PROGRAMÁTICA
// ============================================

function NavigationSection() {
  const [navigationLog, setNavigationLog] = useState<string[]>([]);
  const [formData, setFormData] = useState({ title: '', content: '' });

  const addLog = (message: string) => {
    setNavigationLog(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const simulateNavigate = (action: string) => {
    addLog(action);
  };

  return (
    <section className="demo-section">
      <h1>🎯 Navegación Programática</h1>
      
      <div className="navigation-demo">
        <div className="demo-column">
          <h3>useNavigate Hook</h3>
          
          <div className="code-example">
            <pre><code>{`const navigate = useNavigate();

// Navegar a ruta
navigate('/dashboard');

// Navegar atrás
navigate(-1);

// Reemplazar historial
navigate('/home', { replace: true });

// Con estado
navigate('/profile', { 
  state: { message: 'Actualizado' } 
});`}</code></pre>
          </div>
        </div>

        <div className="demo-column">
          <h3>🎮 Casos de Uso Comunes</h3>
          
          {/* Caso 1: Después de submit */}
          <div className="use-case">
            <h4>1️⃣ Después de Submit</h4>
            <form onSubmit={(e) => {
              e.preventDefault();
              simulateNavigate(`✅ Post creado → navigate('/posts')`);
              setFormData({ title: '', content: '' });
            }}>
              <input
                type="text"
                placeholder="Título del post"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
              <textarea
                placeholder="Contenido"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              />
              <button type="submit">Crear Post</button>
            </form>
          </div>

          {/* Caso 2: Botón volver */}
          <div className="use-case">
            <h4>2️⃣ Botón Volver</h4>
            <button 
              onClick={() => simulateNavigate('⬅️ navigate(-1) - Volver atrás')}
              className="back-button"
            >
              ← Volver
            </button>
          </div>

          {/* Caso 3: Redirección condicional */}
          <div className="use-case">
            <h4>3️⃣ Redirección Condicional</h4>
            <button 
              onClick={() => simulateNavigate('🔐 Usuario no autenticado → navigate(\'/login\')')}
              className="conditional-button"
            >
              Acceder a Dashboard (sin auth)
            </button>
          </div>

          {/* Caso 4: Con estado */}
          <div className="use-case">
            <h4>4️⃣ Navegación con Estado</h4>
            <button 
              onClick={() => simulateNavigate('💾 navigate(\'/profile\', { state: { updated: true } })')}
              className="state-button"
            >
              Ir a Perfil (con mensaje)
            </button>
          </div>
        </div>
      </div>

      {/* Log de navegación */}
      <div className="navigation-log">
        <h4>📋 Log de Navegación</h4>
        <div className="log-content">
          {navigationLog.length === 0 ? (
            <p className="log-empty">Interactúa con los botones arriba para ver la navegación...</p>
          ) : (
            <ul>
              {navigationLog.map((log, index) => (
                <li key={index}>{log}</li>
              ))}
            </ul>
          )}
        </div>
        <button 
          onClick={() => setNavigationLog([])}
          className="clear-log"
        >
          Limpiar Log
        </button>
      </div>
    </section>
  );
}

// ============================================
// SECCIÓN 6: RUTAS PROTEGIDAS ⭐
// ============================================

function ProtectedRoutesSection() {
  const [user, setUser] = useState<{ name: string; role: 'admin' | 'teacher' | 'student' } | null>(null);
  const [attemptedRoute, setAttemptedRoute] = useState<string>('');
  const [protectionLog, setProtectionLog] = useState<string[]>([]);

  const addProtectionLog = (message: string) => {
    setProtectionLog(prev => [...prev, message]);
  };

  const attemptAccess = (route: string, requiredRoles?: string[]) => {
    setAttemptedRoute(route);

    if (!user) {
      addProtectionLog(`❌ Acceso a ${route} DENEGADO - No autenticado → Redirect a /login`);
      return false;
    }

    if (requiredRoles && !requiredRoles.includes(user.role)) {
      addProtectionLog(`❌ Acceso a ${route} DENEGADO - Rol ${user.role} no permitido → Redirect a /unauthorized`);
      return false;
    }

    addProtectionLog(`✅ Acceso a ${route} PERMITIDO - Usuario: ${user.name} (${user.role})`);
    return true;
  };

  return (
    <section className="demo-section">
      <h1>🔒 Rutas Protegidas</h1>
      
      {/* Control de Usuario */}
      <div className="user-control">
        <h3>👤 Estado de Usuario</h3>
        {!user ? (
          <div className="login-simulator">
            <p>No autenticado</p>
            <div className="login-buttons">
              <button onClick={() => {
                setUser({ name: 'Admin User', role: 'admin' });
                addProtectionLog('🔓 Login como Admin');
              }}>
                Login como Admin
              </button>
              <button onClick={() => {
                setUser({ name: 'Teacher User', role: 'teacher' });
                addProtectionLog('🔓 Login como Teacher');
              }}>
                Login como Teacher
              </button>
              <button onClick={() => {
                setUser({ name: 'Student User', role: 'student' });
                addProtectionLog('🔓 Login como Student');
              }}>
                Login como Student
              </button>
            </div>
          </div>
        ) : (
          <div className="user-info">
            <p>✅ Autenticado como: <strong>{user.name}</strong></p>
            <p>Rol: <span className={`role-badge ${user.role}`}>{user.role}</span></p>
            <button onClick={() => {
              setUser(null);
              addProtectionLog('🔐 Logout');
            }}>
              Logout
            </button>
          </div>
        )}
      </div>

      {/* 4 Métodos de Protección */}
      <div className="protection-methods">
        <h3>🛡️ 4 Métodos de Protección</h3>
        
        <div className="methods-grid">
          {/* Método 1 */}
          <div className="method-card">
            <h4>1️⃣ Básico</h4>
            <div className="code-snippet">
              <pre><code>{`<ProtectedRoute isAuth={!!user}>
  <Dashboard />
</ProtectedRoute>`}</code></pre>
            </div>
            <button onClick={() => attemptAccess('/dashboard')}>
              Acceder a Dashboard
            </button>
          </div>

          {/* Método 2 */}
          <div className="method-card">
            <h4>2️⃣ Con Contexto</h4>
            <div className="code-snippet">
              <pre><code>{`const { isAuth } = useAuth();
return isAuth ? children : <Navigate to="/login" />`}</code></pre>
            </div>
            <button onClick={() => attemptAccess('/profile')}>
              Acceder a Profile
            </button>
          </div>

          {/* Método 3 */}
          <div className="method-card">
            <h4>3️⃣ Con Redirección</h4>
            <div className="code-snippet">
              <pre><code>{`<Navigate 
  to="/login" 
  state={{ from: location }} 
/>`}</code></pre>
            </div>
            <button onClick={() => attemptAccess('/settings')}>
              Acceder a Settings
            </button>
          </div>

          {/* Método 4 */}
          <div className="method-card">
            <h4>4️⃣ Por Roles</h4>
            <div className="code-snippet">
              <pre><code>{`<RoleBasedRoute 
  allowedRoles={['admin']}
>
  <AdminPanel />
</RoleBasedRoute>`}</code></pre>
            </div>
            <button onClick={() => attemptAccess('/admin', ['admin'])}>
              Acceder a Admin Panel
            </button>
            <button onClick={() => attemptAccess('/dashboard', ['admin', 'teacher'])}>
              Acceder a Teacher Dashboard
            </button>
          </div>
        </div>
      </div>

      {/* Flujo Visual */}
      <div className="protection-flow">
        <h3>📊 Flujo de Protección</h3>
        <div className="flow-diagram-horizontal">
          <div className="flow-step">
            <div className="step-icon">👆</div>
            <div className="step-text">Usuario intenta acceder</div>
          </div>
          <div className="flow-arrow">→</div>
          <div className="flow-step">
            <div className="step-icon">🔍</div>
            <div className="step-text">¿Está autenticado?</div>
          </div>
          <div className="flow-split">
            <div className="flow-branch">
              <div className="branch-label no">NO</div>
              <div className="flow-arrow">↓</div>
              <div className="flow-step danger">
                <div className="step-icon">🚫</div>
                <div className="step-text">Redirect a /login</div>
              </div>
            </div>
            <div className="flow-branch">
              <div className="branch-label yes">SÍ</div>
              <div className="flow-arrow">↓</div>
              <div className="flow-step">
                <div className="step-icon">🔐</div>
                <div className="step-text">¿Tiene permiso?</div>
              </div>
              <div className="flow-split-inner">
                <div className="flow-branch">
                  <div className="branch-label no">NO</div>
                  <div className="flow-arrow">↓</div>
                  <div className="flow-step danger">
                    <div className="step-icon">⛔</div>
                    <div className="step-text">Redirect a /403</div>
                  </div>
                </div>
                <div className="flow-branch">
                  <div className="branch-label yes">SÍ</div>
                  <div className="flow-arrow">↓</div>
                  <div className="flow-step success">
                    <div className="step-icon">✅</div>
                    <div className="step-text">Renderizar componente</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Log de Protección */}
      <div className="protection-log">
        <h4>📋 Log de Protección</h4>
        <div className="log-content">
          {protectionLog.length === 0 ? (
            <p className="log-empty">Intenta acceder a las rutas arriba...</p>
          ) : (
            <ul>
              {protectionLog.map((log, index) => (
                <li key={index} className={log.includes('✅') ? 'success' : 'error'}>
                  {log}
                </li>
              ))}
            </ul>
          )}
        </div>
        <button onClick={() => setProtectionLog([])}>Limpiar Log</button>
      </div>
    </section>
  );
}

// ============================================
// SECCIÓN 7: RUTAS ANIDADAS
// ============================================

function NestedRoutesSection() {
  const [currentRoute, setCurrentRoute] = useState<string>('overview');

  const dashboardRoutes = [
    { id: 'overview', title: 'Overview', icon: '📊', content: 'Vista general del dashboard' },
    { id: 'posts', title: 'Posts', icon: '📝', content: 'Gestionar posts del blog' },
    { id: 'users', title: 'Users', icon: '👥', content: 'Administrar usuarios' },
    { id: 'settings', title: 'Settings', icon: '⚙️', content: 'Configuración del sistema' }
  ];

  return (
    <section className="demo-section">
      <h1>🏗️ Rutas Anidadas</h1>
      
      <div className="nested-concept">
        <h3>💡 Concepto: Outlet</h3>
        <p>
          <code>{'<Outlet />'}</code> es como un "agujero" donde React Router renderiza las rutas hijas.
        </p>
        
        <div className="code-example">
          <pre><code>{`// Layout Component
function DashboardLayout() {
  return (
    <div>
      <Sidebar />
      <main>
        <Outlet /> {/* Aquí se renderizan las rutas hijas */}
      </main>
    </div>
  );
}

// Rutas
<Route path="/dashboard" element={<DashboardLayout />}>
  <Route index element={<Overview />} />
  <Route path="posts" element={<Posts />} />
  <Route path="users" element={<Users />} />
</Route>`}</code></pre>
        </div>
      </div>

      {/* Demo Visual */}
      <div className="nested-demo">
        <h3>🎮 Dashboard Demo Interactivo</h3>
        
        <div className="dashboard-simulator">
          <aside className="dashboard-sidebar">
            <h4>Dashboard</h4>
            <nav>
              {dashboardRoutes.map(route => (
                <button
                  key={route.id}
                  className={currentRoute === route.id ? 'active' : ''}
                  onClick={() => setCurrentRoute(route.id)}
                >
                  <span className="nav-icon">{route.icon}</span>
                  <span className="nav-title">{route.title}</span>
                </button>
              ))}
            </nav>
            <div className="sidebar-note">
              ← Este sidebar persiste
            </div>
          </aside>

          <main className="dashboard-content">
            <div className="content-header">
              <div className="breadcrumb">
                Dashboard / {dashboardRoutes.find(r => r.id === currentRoute)?.title}
              </div>
              <div className="current-url">
                URL: /dashboard/{currentRoute}
              </div>
            </div>
            
            <div className="outlet-visualization">
              <div className="outlet-label">
                {'<Outlet>'} ← Aquí se renderiza:
              </div>
              <div className="outlet-content">
                <h2>
                  {dashboardRoutes.find(r => r.id === currentRoute)?.icon}{' '}
                  {dashboardRoutes.find(r => r.id === currentRoute)?.title}
                </h2>
                <p>{dashboardRoutes.find(r => r.id === currentRoute)?.content}</p>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Estructura Visual */}
      <div className="nested-structure">
        <h3>📁 Estructura de Rutas</h3>
        <div className="route-tree">
          <div className="tree-node root">
            <span className="node-icon">🌳</span>
            <span className="node-path">/dashboard</span>
            <span className="node-component">{'<DashboardLayout />'}</span>
            
            <div className="tree-children">
              <div className="tree-node">
                <span className="node-icon">📄</span>
                <span className="node-path">index</span>
                <span className="node-component">{'<Overview />'}</span>
                <span className="node-url">/dashboard</span>
              </div>
              
              <div className="tree-node">
                <span className="node-icon">📄</span>
                <span className="node-path">posts</span>
                <span className="node-component">{'<Posts />'}</span>
                <span className="node-url">/dashboard/posts</span>
              </div>
              
              <div className="tree-node">
                <span className="node-icon">📄</span>
                <span className="node-path">users</span>
                <span className="node-component">{'<Users />'}</span>
                <span className="node-url">/dashboard/users</span>
              </div>
              
              <div className="tree-node">
                <span className="node-icon">📄</span>
                <span className="node-path">settings</span>
                <span className="node-component">{'<Settings />'}</span>
                <span className="node-url">/dashboard/settings</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// SECCIÓN 8: EJEMPLO COMPLETO
// ============================================

function CompleteExampleSection() {
  return (
    <section className="demo-section">
      <h1>✨ Ejemplo Completo</h1>
      
      <div className="complete-example">
        <h3>🎯 App Integrada con Autenticación</h3>
        
        <div className="code-example large">
          <pre><code>{`// App.tsx
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';

// Páginas públicas
import HomePage from './pages/Home';
import LoginPage from './pages/Login';

// Páginas protegidas
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Públicas */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        
        {/* Protegidas con layout anidado */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="posts">
            <Route index element={<PostsList />} />
            <Route path=":id" element={<PostDetail />} />
            <Route path="new" element={<PostCreate />} />
          </Route>
        </Route>
        
        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}`}</code></pre>
        </div>

        <div className="features-checklist">
          <h4>✅ Características Implementadas:</h4>
          <ul>
            <li>✅ Rutas públicas y protegidas</li>
            <li>✅ Contexto de autenticación</li>
            <li>✅ Layouts anidados con Outlet</li>
            <li>✅ Rutas dinámicas con parámetros</li>
            <li>✅ Navegación programática</li>
            <li>✅ Página 404</li>
            <li>✅ Lazy loading (React.lazy)</li>
            <li>✅ Protected routes component</li>
          </ul>
        </div>

        <div className="best-practices-section">
          <h3>🌟 Mejores Prácticas Aplicadas</h3>
          
          <div className="practices-grid">
            <div className="practice-card">
              <h4>📂 Organización</h4>
              <ul>
                <li>Rutas en archivos separados</li>
                <li>Layouts reutilizables</li>
                <li>Páginas agrupadas por tipo</li>
              </ul>
            </div>

            <div className="practice-card">
              <h4>⚡ Rendimiento</h4>
              <ul>
                <li>Lazy loading de componentes</li>
                <li>Code splitting por ruta</li>
                <li>Suspense boundaries</li>
              </ul>
            </div>

            <div className="practice-card">
              <h4>🔒 Seguridad</h4>
              <ul>
                <li>Rutas protegidas</li>
                <li>Validación de roles</li>
                <li>Redirección segura</li>
              </ul>
            </div>

            <div className="practice-card">
              <h4>♿ Accesibilidad</h4>
              <ul>
                <li>Focus management</li>
                <li>ARIA labels</li>
                <li>Navegación por teclado</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
