/**
 * 📚 Página de Aprendizaje de Gestión de Estados
 * 
 * Vista educativa con explicaciones, snippets de código y ejemplos interactivos
 */

import React, { useState } from 'react';

type Section = 'intro' | 'context' | 'zustand' | 'redux' | 'comparison' | 'integration';

export const StateManagementLearning: React.FC = () => {
  const [activeSection, setActiveSection] = useState<Section>('intro');

  return (
    <div style={styles.container}>
      {/* Sidebar Navigation */}
      <aside style={styles.sidebar}>
        <h2 style={styles.sidebarTitle}>📚 Contenido</h2>
        <nav style={styles.nav}>
          <button
            onClick={() => setActiveSection('intro')}
            style={{
              ...styles.navButton,
              ...(activeSection === 'intro' ? styles.navButtonActive : {}),
            }}
          >
            🎯 Introducción
          </button>
          <button
            onClick={() => setActiveSection('context')}
            style={{
              ...styles.navButton,
              ...(activeSection === 'context' ? styles.navButtonActive : {}),
            }}
          >
            📋 Context API
          </button>
          <button
            onClick={() => setActiveSection('zustand')}
            style={{
              ...styles.navButton,
              ...(activeSection === 'zustand' ? styles.navButtonActive : {}),
            }}
          >
            🐻 Zustand
          </button>
          <button
            onClick={() => setActiveSection('redux')}
            style={{
              ...styles.navButton,
              ...(activeSection === 'redux' ? styles.navButtonActive : {}),
            }}
          >
            ⚛️ Redux Toolkit
          </button>
          <button
            onClick={() => setActiveSection('comparison')}
            style={{
              ...styles.navButton,
              ...(activeSection === 'comparison' ? styles.navButtonActive : {}),
            }}
          >
            📊 Comparación
          </button>
          <button
            onClick={() => setActiveSection('integration')}
            style={{
              ...styles.navButton,
              ...(activeSection === 'integration' ? styles.navButtonActive : {}),
            }}
          >
            🤝 Integración
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main style={styles.main}>
        {activeSection === 'intro' && <IntroSection />}
        {activeSection === 'context' && <ContextSection />}
        {activeSection === 'zustand' && <ZustandSection />}
        {activeSection === 'redux' && <ReduxSection />}
        {activeSection === 'comparison' && <ComparisonSection />}
        {activeSection === 'integration' && <IntegrationSection />}
      </main>
    </div>
  );
};

// ============================================
// 🎯 SECCIÓN: INTRODUCCIÓN
// ============================================

const IntroSection: React.FC = () => (
  <div style={styles.section}>
    <h1 style={styles.h1}>🎯 Gestión de Estados en React</h1>
    
    <div style={styles.card}>
      <h2 style={styles.h2}>¿Por qué necesitamos gestión de estados?</h2>
      <p style={styles.p}>
        En aplicaciones React, el estado es la información que cambia con el tiempo.
        A medida que tu aplicación crece, compartir estado entre componentes se vuelve complejo.
      </p>
      
      <div style={styles.highlight}>
        <strong style={{ color: '#856404' }}>Problema:</strong> Prop Drilling
        <pre style={styles.code}>{`// ❌ Pasar props a través de muchos niveles
<App>
  <Header user={user} />
    <Nav user={user} />
      <UserMenu user={user} />
        <Avatar user={user} /> // ¡Finalmente lo usamos aquí!`}</pre>
      </div>
    </div>

    <div style={styles.card}>
      <h2 style={styles.h2}>Las 3 Soluciones Principales</h2>
      
      <div style={styles.grid}>
        <div style={styles.gridItem}>
          <h3 style={styles.h3}>📋 Context API</h3>
          <p style={styles.p}>Nativo de React, ideal para estados simples</p>
          <ul style={styles.list}>
            <li>✅ Sin dependencias</li>
            <li>✅ Fácil de aprender</li>
            <li>⚠️ Re-renders innecesarios</li>
          </ul>
        </div>

        <div style={styles.gridItem}>
          <h3 style={styles.h3}>🐻 Zustand</h3>
          <p style={styles.p}>Librería minimalista, máximo rendimiento</p>
          <ul style={styles.list}>
            <li>✅ Código mínimo (~1 KB)</li>
            <li>✅ Excelente rendimiento</li>
            <li>✅ Sin Providers</li>
          </ul>
        </div>

        <div style={styles.gridItem}>
          <h3 style={styles.h3}>⚛️ Redux Toolkit</h3>
          <p style={styles.p}>Solución empresarial, muy escalable</p>
          <ul style={styles.list}>
            <li>✅ Arquitectura robusta</li>
            <li>✅ DevTools potentes</li>
            <li>✅ Comunidad enorme</li>
          </ul>
        </div>
      </div>
    </div>

    <div style={styles.callout}>
      <strong style={{ color: '#0c5460' }}>💡 Tip:</strong> No tienes que elegir solo una. La mejor arquitectura combina las tres
      según las necesidades específicas de cada parte de tu aplicación.
    </div>
  </div>
);

// ============================================
// 📋 SECCIÓN: CONTEXT API
// ============================================

const ContextSection: React.FC = () => (
  <div style={styles.section}>
    <h1 style={styles.h1}>📋 Context API</h1>
    
    <div style={styles.card}>
      <h2 style={styles.h2}>¿Qué es Context API?</h2>
      <p style={styles.p}>
        Context API es una característica nativa de React que permite compartir datos entre componentes
        sin tener que pasar props manualmente en cada nivel.
      </p>
    </div>

    <div style={styles.card}>
      <h2 style={styles.h2}>📝 Código de Ejemplo</h2>
      
      <h3 style={styles.h3}>1. Crear el Contexto</h3>
      <pre style={styles.codeBlock}>{`import { createContext, useContext, useState } from 'react';

// Definir el tipo
interface User {
  id: number;
  name: string;
  email: string;
}

interface UserContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

// Crear el contexto
const UserContext = createContext<UserContextType | undefined>(undefined);`}</pre>

      <h3 style={styles.h3}>2. Crear el Provider</h3>
      <pre style={styles.codeBlock}>{`export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};`}</pre>

      <h3 style={styles.h3}>3. Crear Hook Personalizado</h3>
      <pre style={styles.codeBlock}>{`export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser debe usarse dentro de UserProvider');
  }
  return context;
};`}</pre>

      <h3 style={styles.h3}>4. Usar en Componentes</h3>
      <pre style={styles.codeBlock}>{`function MyComponent() {
  const { user, login, logout } = useUser();

  return (
    <div>
      {user ? (
        <>
          <p>Bienvenido, {user.name}!</p>
          <button onClick={logout}>Cerrar Sesión</button>
        </>
      ) : (
        <button onClick={() => login({ id: 1, name: 'Ana', email: 'ana@example.com' })}>
          Iniciar Sesión
        </button>
      )}
    </div>
  );
}`}</pre>
    </div>

    <div style={styles.card}>
      <h2 style={styles.h2}>✅ Ventajas</h2>
      <ul style={styles.list}>
        <li><strong>Nativo de React:</strong> No requiere instalación adicional</li>
        <li><strong>Simple:</strong> Fácil de entender y usar</li>
        <li><strong>Ideal para estados simples:</strong> Autenticación, tema, idioma</li>
      </ul>
    </div>

    <div style={styles.card}>
      <h2 style={styles.h2}>❌ Desventajas</h2>
      <ul style={styles.list}>
        <li><strong>Re-renders innecesarios:</strong> Todos los consumidores se re-renderizan</li>
        <li><strong>Sin DevTools:</strong> Dificulta el debugging</li>
        <li><strong>Difícil de optimizar:</strong> Requiere useMemo y useCallback</li>
      </ul>
    </div>

    <div style={styles.callout}>
      <strong style={{ color: '#0c5460' }}>🎯 Cuándo usar:</strong> Autenticación, tema, idioma, y otros estados que cambian raramente.
    </div>
  </div>
);

// ============================================
// 🐻 SECCIÓN: ZUSTAND
// ============================================

const ZustandSection: React.FC = () => (
  <div style={styles.section}>
    <h1 style={styles.h1}>🐻 Zustand</h1>
    
    <div style={styles.card}>
      <h2 style={styles.h2}>¿Qué es Zustand?</h2>
      <p style={styles.p}>
        Zustand es una librería de gestión de estados minimalista (~1 KB) con excelente rendimiento.
        Sin Providers, sin boilerplate, solo código simple y efectivo.
      </p>
      
      <div style={styles.highlight}>
        <strong style={{ color: '#856404' }}>Instalación:</strong>
        <pre style={styles.code}>npm install zustand</pre>
      </div>
    </div>

    <div style={styles.card}>
      <h2 style={styles.h2}>📝 Código de Ejemplo</h2>
      
      <h3 style={styles.h3}>1. Crear el Store</h3>
      <pre style={styles.codeBlock}>{`import { create } from 'zustand';

interface UIStore {
  // Estado
  sidebarOpen: boolean;
  activeModal: string | null;
  
  // Acciones
  toggleSidebar: () => void;
  openModal: (modal: string) => void;
  closeModal: () => void;
}

export const useUIStore = create<UIStore>((set) => ({
  // Estado inicial
  sidebarOpen: false,
  activeModal: null,
  
  // Acciones
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  openModal: (modal) => set({ activeModal: modal }),
  closeModal: () => set({ activeModal: null }),
}));`}</pre>

      <h3 style={styles.h3}>2. Usar en Componentes</h3>
      <pre style={styles.codeBlock}>{`function MyComponent() {
  // ✅ Selector granular - solo re-renderiza cuando cambia activeModal
  const activeModal = useUIStore((state) => state.activeModal);
  const openModal = useUIStore((state) => state.openModal);
  const closeModal = useUIStore((state) => state.closeModal);

  return (
    <div>
      <button onClick={() => openModal('confirm')}>
        Abrir Modal
      </button>
      
      {activeModal === 'confirm' && (
        <ConfirmModal onClose={closeModal} />
      )}
    </div>
  );
}`}</pre>

      <h3 style={styles.h3}>3. Con Middleware (Persist + DevTools)</h3>
      <pre style={styles.codeBlock}>{`import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export const useUIStore = create<UIStore>()(
  devtools(
    persist(
      (set) => ({
        // ... tu store aquí
      }),
      {
        name: 'ui-storage', // Nombre en localStorage
      }
    ),
    {
      name: 'UIStore', // Nombre en DevTools
    }
  )
);`}</pre>
    </div>

    <div style={styles.card}>
      <h2 style={styles.h2}>✅ Ventajas</h2>
      <ul style={styles.list}>
        <li><strong>Código mínimo:</strong> Menos boilerplate que cualquier otra solución</li>
        <li><strong>Excelente rendimiento:</strong> Solo re-renderiza lo necesario</li>
        <li><strong>Sin Providers:</strong> Usa el hook directamente</li>
        <li><strong>DevTools integradas:</strong> Compatible con Redux DevTools</li>
        <li><strong>Tamaño mínimo:</strong> ~1 KB gzipped</li>
      </ul>
    </div>

    <div style={styles.card}>
      <h2 style={styles.h2}>❌ Desventajas</h2>
      <ul style={styles.list}>
        <li><strong>Menos estructura:</strong> Puede llevar a código desorganizado</li>
        <li><strong>Comunidad más pequeña:</strong> Menos recursos que Redux</li>
      </ul>
    </div>

    <div style={styles.callout}>
      <strong style={{ color: '#0c5460' }}>🎯 Cuándo usar:</strong> UI state (modales, filtros), estados que cambian frecuentemente.
    </div>
  </div>
);

// ============================================
// ⚛️ SECCIÓN: REDUX TOOLKIT
// ============================================

const ReduxSection: React.FC = () => (
  <div style={styles.section}>
    <h1 style={styles.h1}>⚛️ Redux Toolkit</h1>
    
    <div style={styles.card}>
      <h2 style={styles.h2}>¿Qué es Redux Toolkit?</h2>
      <p style={styles.p}>
        Redux Toolkit es la forma oficial y recomendada de usar Redux. Simplifica la configuración
        y reduce el boilerplate, manteniendo la arquitectura robusta de Redux.
      </p>
      
      <div style={styles.highlight}>
        <strong style={{ color: '#856404' }}>Instalación:</strong>
        <pre style={styles.code}>npm install @reduxjs/toolkit react-redux</pre>
      </div>
    </div>

    <div style={styles.card}>
      <h2 style={styles.h2}>📝 Código de Ejemplo</h2>
      
      <h3 style={styles.h3}>1. Crear un Slice</h3>
      <pre style={styles.codeBlock}>{`import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Post {
  id: number;
  title: string;
  content: string;
}

interface PostsState {
  posts: Post[];
  loading: boolean;
}

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    loading: false,
  } as PostsState,
  reducers: {
    addPost: (state, action: PayloadAction<Post>) => {
      state.posts.push(action.payload); // ✅ Immer permite "mutaciones"
    },
    deletePost: (state, action: PayloadAction<number>) => {
      state.posts = state.posts.filter(p => p.id !== action.payload);
    },
  },
});

export const { addPost, deletePost } = postsSlice.actions;
export default postsSlice.reducer;`}</pre>

      <h3 style={styles.h3}>2. Configurar el Store</h3>
      <pre style={styles.codeBlock}>{`import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './slices/postsSlice';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;`}</pre>

      <h3 style={styles.h3}>3. Crear Hooks Tipados</h3>
      <pre style={styles.codeBlock}>{`import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from './store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;`}</pre>

      <h3 style={styles.h3}>4. Usar en Componentes</h3>
      <pre style={styles.codeBlock}>{`import { useAppDispatch, useAppSelector } from './store/hooks';
import { addPost, deletePost } from './store/slices/postsSlice';

function PostList() {
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state) => state.posts.posts);

  const handleAdd = () => {
    dispatch(addPost({
      id: Date.now(),
      title: 'Nuevo Post',
      content: 'Contenido...',
    }));
  };

  return (
    <div>
      <button onClick={handleAdd}>Agregar Post</button>
      {posts.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <button onClick={() => dispatch(deletePost(post.id))}>
            Eliminar
          </button>
        </div>
      ))}
    </div>
  );
}`}</pre>
    </div>

    <div style={styles.card}>
      <h2 style={styles.h2}>✅ Ventajas</h2>
      <ul style={styles.list}>
        <li><strong>Arquitectura robusta:</strong> Patrón predecible y escalable</li>
        <li><strong>DevTools potentes:</strong> Time-travel debugging</li>
        <li><strong>Comunidad enorme:</strong> Muchos recursos y soluciones</li>
        <li><strong>RTK Query:</strong> Gestión de cache y fetching incluida</li>
        <li><strong>Immer integrado:</strong> "Mutaciones" seguras</li>
      </ul>
    </div>

    <div style={styles.card}>
      <h2 style={styles.h2}>❌ Desventajas</h2>
      <ul style={styles.list}>
        <li><strong>Más complejo:</strong> Conceptos adicionales (slices, reducers, actions)</li>
        <li><strong>Mayor bundle size:</strong> ~10 KB</li>
        <li><strong>Curva de aprendizaje:</strong> Requiere entender Redux</li>
      </ul>
    </div>

    <div style={styles.callout}>
      <strong style={{ color: '#0c5460' }}>🎯 Cuándo usar:</strong> Aplicaciones empresariales, estados complejos, equipos grandes.
    </div>
  </div>
);

// ============================================
// 📊 SECCIÓN: COMPARACIÓN
// ============================================

const ComparisonSection: React.FC = () => (
  <div style={styles.section}>
    <h1 style={styles.h1}>📊 Comparación Detallada</h1>
    
    <div style={styles.card}>
      <h2 style={styles.h2}>Tabla Comparativa</h2>
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Característica</th>
              <th style={styles.th}>Context API</th>
              <th style={styles.th}>Zustand</th>
              <th style={styles.th}>Redux Toolkit</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={styles.td}><strong>Complejidad</strong></td>
              <td style={styles.td}>🟡 Baja</td>
              <td style={styles.td}>🟢 Muy Baja</td>
              <td style={styles.td}>🟠 Media</td>
            </tr>
            <tr>
              <td style={styles.td}><strong>Boilerplate</strong></td>
              <td style={styles.td}>🟡 Medio</td>
              <td style={styles.td}>🟢 Mínimo</td>
              <td style={styles.td}>🟡 Bajo</td>
            </tr>
            <tr>
              <td style={styles.td}><strong>Rendimiento</strong></td>
              <td style={styles.td}>🟡 Medio*</td>
              <td style={styles.td}>🟢 Alto</td>
              <td style={styles.td}>🟢 Alto</td>
            </tr>
            <tr>
              <td style={styles.td}><strong>DevTools</strong></td>
              <td style={styles.td}>❌ No</td>
              <td style={styles.td}>✅ Sí</td>
              <td style={styles.td}>✅ Sí</td>
            </tr>
            <tr>
              <td style={styles.td}><strong>Bundle Size</strong></td>
              <td style={styles.td}>🟢 0 KB</td>
              <td style={styles.td}>🟢 ~1 KB</td>
              <td style={styles.td}>🟡 ~10 KB</td>
            </tr>
            <tr>
              <td style={styles.td}><strong>Curva de aprendizaje</strong></td>
              <td style={styles.td}>🟢 Baja</td>
              <td style={styles.td}>🟢 Muy Baja</td>
              <td style={styles.td}>🟡 Media</td>
            </tr>
            <tr>
              <td style={styles.td}><strong>TypeScript</strong></td>
              <td style={styles.td}>🟡 Bueno</td>
              <td style={styles.td}>🟢 Excelente</td>
              <td style={styles.td}>🟢 Excelente</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p style={styles.footnote}>* Context API puede causar re-renders innecesarios sin optimización</p>
    </div>

    <div style={styles.card}>
      <h2 style={styles.h2}>Rendimiento: Re-renders</h2>
      <p style={styles.p}>
        Escenario: Actualizar un contador cada 100ms en una app con 50 componentes
      </p>
      
      <div style={styles.performanceGrid}>
        <div style={styles.performanceItem}>
          <h3 style={styles.h3}>Context API</h3>
          <div style={styles.performanceBad}>
            <strong>50 componentes</strong> se re-renderizan
          </div>
          <p style={styles.small}>Todos los consumidores del contexto</p>
        </div>

        <div style={styles.performanceItem}>
          <h3 style={styles.h3}>Zustand</h3>
          <div style={styles.performanceGood}>
            <strong>1 componente</strong> se re-renderiza
          </div>
          <p style={styles.small}>Solo el que usa el valor específico</p>
        </div>

        <div style={styles.performanceItem}>
          <h3 style={styles.h3}>Redux Toolkit</h3>
          <div style={styles.performanceGood}>
            <strong>1 componente</strong> se re-renderiza
          </div>
          <p style={styles.small}>Solo el suscrito al slice específico</p>
        </div>
      </div>
    </div>

    <div style={styles.callout}>
      <strong style={{ color: '#0c5460' }}>💡 Conclusión:</strong> Para estados que cambian frecuentemente, Zustand y Redux
      ofrecen mejor rendimiento que Context API sin optimización.
    </div>
  </div>
);

// ============================================
// 🤝 SECCIÓN: INTEGRACIÓN
// ============================================

const IntegrationSection: React.FC = () => (
  <div style={styles.section}>
    <h1 style={styles.h1}>🤝 Integración Armónica</h1>
    
    <div style={styles.card}>
      <h2 style={styles.h2}>La Mejor Arquitectura: Combinar las 3</h2>
      <p style={styles.p}>
        No tienes que elegir solo una solución. La arquitectura más eficiente usa cada herramienta
        para lo que hace mejor.
      </p>
    </div>

    <div style={styles.card}>
      <h2 style={styles.h2}>Estrategia Recomendada</h2>
      
      <div style={styles.architectureGrid}>
        <div style={styles.architectureItem}>
          <h3 style={styles.h3}>📋 Context API</h3>
          <p style={styles.p}><strong>Para: Configuración Global</strong></p>
          <ul style={styles.list}>
            <li>Autenticación</li>
            <li>Tema (dark/light)</li>
            <li>Idioma (i18n)</li>
            <li>Preferencias de usuario</li>
          </ul>
          <div style={styles.badge}>Cambia raramente</div>
        </div>

        <div style={styles.architectureItem}>
          <h3 style={styles.h3}>🐻 Zustand</h3>
          <p style={styles.p}><strong>Para: UI State</strong></p>
          <ul style={styles.list}>
            <li>Modales y Dialogs</li>
            <li>Sidebar/Navigation</li>
            <li>Filtros y Búsquedas</li>
            <li>Notificaciones</li>
          </ul>
          <div style={styles.badge}>Cambia frecuentemente</div>
        </div>

        <div style={styles.architectureItem}>
          <h3 style={styles.h3}>⚛️ Redux Toolkit</h3>
          <p style={styles.p}><strong>Para: Lógica de Negocio</strong></p>
          <ul style={styles.list}>
            <li>Posts (CRUD)</li>
            <li>Comments</li>
            <li>RTK Query (API Cache)</li>
            <li>Estados complejos</li>
          </ul>
          <div style={styles.badge}>Lógica compleja</div>
        </div>
      </div>
    </div>

    <div style={styles.card}>
      <h2 style={styles.h2}>Ejemplo de Código Integrado</h2>
      <pre style={styles.codeBlock}>{`function BlogPost({ postId }: { postId: string }) {
  // 1️⃣ Context API - Autenticación
  const { user, isTeacher } = useUser();
  
  // 2️⃣ Zustand - UI State
  const { openModal, addNotification } = useUIStore();
  
  // 3️⃣ Redux - Datos de negocio
  const dispatch = useAppDispatch();
  const post = useAppSelector(state => selectPostById(state, postId));

  const handleDelete = async () => {
    // Verificar permisos con Context
    if (!isTeacher) {
      addNotification({ type: 'error', message: 'Sin permisos' });
      return;
    }
    
    // Abrir modal de confirmación con Zustand
    openModal('confirm-delete');
    
    // Eliminar post con Redux
    await dispatch(deletePost(postId));
    
    // Mostrar notificación con Zustand
    addNotification({ type: 'success', message: 'Post eliminado' });
  };

  return (
    <div>
      <h1>{post?.title}</h1>
      {isTeacher && (
        <button onClick={handleDelete}>Eliminar</button>
      )}
    </div>
  );
}`}</pre>
    </div>

    <div style={styles.callout}>
      <strong style={{ color: '#0c5460' }}>🎯 Regla de Oro:</strong> Usa la herramienta correcta para cada problema.
      Context para configuración, Zustand para UI, Redux para lógica de negocio.
    </div>
  </div>
);

// ============================================
// 🎨 ESTILOS
// ============================================

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#f8f9fa',
    fontFamily: 'system-ui, -apple-system, sans-serif',
  },
  sidebar: {
    width: '250px',
    backgroundColor: '#fff',
    borderRight: '1px solid #dee2e6',
    padding: '20px',
    position: 'sticky' as const,
    top: 0,
    height: '100vh',
    overflowY: 'auto' as const,
  },
  sidebarTitle: {
    fontSize: '20px',
    marginBottom: '20px',
    color: '#333',
  },
  nav: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '8px',
  },
  navButton: {
    padding: '12px 16px',
    fontSize: '14px',
    textAlign: 'left' as const,
    border: 'none',
    borderRadius: '6px',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    transition: 'all 0.2s',
    color: '#666',
  },
  navButtonActive: {
    backgroundColor: '#61dafb',
    color: '#fff',
    fontWeight: 'bold',
  },
  main: {
    flex: 1,
    padding: '40px',
    maxWidth: '900px',
    margin: '0 auto',
  },
  section: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '30px',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '30px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  h1: {
    fontSize: '36px',
    margin: '0 0 30px 0',
    color: '#333',
  },
  h2: {
    fontSize: '24px',
    margin: '0 0 20px 0',
    color: '#333',
  },
  h3: {
    fontSize: '18px',
    margin: '20px 0 10px 0',
    color: '#333',
  },
  p: {
    fontSize: '16px',
    lineHeight: '1.6',
    color: '#666',
    margin: '0 0 15px 0',
  },
  list: {
    fontSize: '15px',
    lineHeight: '1.8',
    color: '#666',
    paddingLeft: '20px',
  },
  code: {
    display: 'block',
    padding: '10px',
    backgroundColor: '#f8f9fa',
    borderRadius: '4px',
    fontFamily: 'monospace',
    fontSize: '13px',
    margin: '10px 0',
    overflowX: 'auto' as const,
    color: '#333',
  },
  codeBlock: {
    display: 'block',
    padding: '20px',
    backgroundColor: '#1e1e1e',
    color: '#d4d4d4',
    borderRadius: '6px',
    fontFamily: 'monospace',
    fontSize: '13px',
    margin: '15px 0',
    overflowX: 'auto' as const,
    lineHeight: '1.5',
  },
  highlight: {
    padding: '15px',
    backgroundColor: '#fff3cd',
    borderLeft: '4px solid #ffc107',
    borderRadius: '4px',
    margin: '15px 0',
    color: '#856404',
  },
  callout: {
    padding: '20px',
    backgroundColor: '#e7f5ff',
    borderLeft: '4px solid #61dafb',
    borderRadius: '4px',
    fontSize: '15px',
    color: '#0c5460',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    marginTop: '20px',
  },
  gridItem: {
    padding: '20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '6px',
    border: '1px solid #dee2e6',
  },
  tableContainer: {
    overflowX: 'auto' as const,
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse' as const,
    fontSize: '14px',
  },
  th: {
    padding: '12px',
    textAlign: 'left' as const,
    backgroundColor: '#f8f9fa',
    borderBottom: '2px solid #dee2e6',
    fontWeight: 'bold',
    color: '#333',
  },
  td: {
    padding: '12px',
    borderBottom: '1px solid #dee2e6',
    color: '#333',
  },
  footnote: {
    fontSize: '12px',
    color: '#999',
    fontStyle: 'italic',
    marginTop: '10px',
  },
  performanceGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
    marginTop: '20px',
  },
  performanceItem: {
    textAlign: 'center' as const,
  },
  performanceGood: {
    padding: '15px',
    backgroundColor: '#d4edda',
    color: '#155724',
    borderRadius: '6px',
    fontWeight: 'bold',
    margin: '10px 0',
  },
  performanceBad: {
    padding: '15px',
    backgroundColor: '#f8d7da',
    color: '#721c24',
    borderRadius: '6px',
    fontWeight: 'bold',
    margin: '10px 0',
  },
  small: {
    fontSize: '13px',
    color: '#666',
  },
  architectureGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    marginTop: '20px',
  },
  architectureItem: {
    padding: '20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    border: '2px solid #dee2e6',
  },
  badge: {
    display: 'inline-block',
    padding: '4px 12px',
    backgroundColor: '#61dafb',
    color: '#fff',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: 'bold',
    marginTop: '10px',
  },
};
