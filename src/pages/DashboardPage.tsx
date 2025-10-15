import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';
import { PostsList } from '../components/posts/PostsList';
import { CreatePostForm } from '../components/posts/CreatePostForm';
import { LoginDemo } from '../components/demos/LoginDemo';
import { PostsDemo } from '../components/demos/PostsDemo';
import { CommentsDemo } from '../components/demos/CommentsDemo';
import './Dashboard.css';

type Section = 'home' | 'learning' | 'api-posts' | 'api-login' | 'api-comments' | 'comparisons';

export function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<Section>('home');

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white">Blog SPA - Clases</h1>
              <p className="text-blue-100 text-sm mt-1">Consumo de API REST con Axios</p>
            </div>
            {user && (
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm text-blue-100">Hola,</p>
                  <p className="font-medium text-white">{user.name}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 text-sm font-medium transition-colors shadow-md"
                >
                  Cerrar Sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-2 py-4 overflow-x-auto">
            <button
              onClick={() => setActiveSection('home')}
              className={`px-5 py-2.5 rounded-lg whitespace-nowrap font-medium transition-all ${
                activeSection === 'home'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              🏠 Inicio
            </button>
            <button
              onClick={() => setActiveSection('learning')}
              className={`px-5 py-2.5 rounded-lg whitespace-nowrap font-medium transition-all ${
                activeSection === 'learning'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              📚 State Management
            </button>
            <button
              onClick={() => setActiveSection('api-posts')}
              className={`px-5 py-2.5 rounded-lg whitespace-nowrap font-medium transition-all ${
                activeSection === 'api-posts'
                  ? 'bg-green-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              📝 API - Posts
            </button>
            <button
              onClick={() => setActiveSection('api-login')}
              className={`px-5 py-2.5 rounded-lg whitespace-nowrap font-medium transition-all ${
                activeSection === 'api-login'
                  ? 'bg-orange-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              🔐 API - Login
            </button>
            <button
              onClick={() => setActiveSection('api-comments')}
              className={`px-5 py-2.5 rounded-lg whitespace-nowrap font-medium transition-all ${
                activeSection === 'api-comments'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              💬 API - Comments
            </button>
            <button
              onClick={() => setActiveSection('comparisons')}
              className={`px-5 py-2.5 rounded-lg whitespace-nowrap font-medium transition-all ${
                activeSection === 'comparisons'
                  ? 'bg-teal-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              ⚖️ Comparaciones
            </button>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {activeSection === 'home' && <HomeSection />}
        {activeSection === 'learning' && <LearningSection />}
        {activeSection === 'api-posts' && <ApiPostsSection />}
        {activeSection === 'api-login' && <ApiLoginSection />}
        {activeSection === 'api-comments' && <ApiCommentsSection />}
        {activeSection === 'comparisons' && <ComparisonsSection />}
      </main>
    </div>
  );
}

function HomeSection() {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg p-8 text-white">
        <h2 className="text-3xl font-bold mb-2">Bienvenido al Blog SPA</h2>
        <p className="text-blue-100">
          Plataforma educativa para aprender consumo de API REST con React y TypeScript
        </p>
      </div>

      {/* Destacado: Demo SPA y React Router */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl shadow-2xl p-8 text-white border-4 border-purple-300">
        <div className="flex items-start gap-6">
          <div className="text-6xl">🎓</div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-2xl font-bold">Clase de Hoy: SPA y React Router</h3>
              <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full">NUEVO</span>
            </div>
            <p className="text-purple-100 mb-4 text-lg">
              Demo interactiva completa con 8 secciones: conceptos de SPA, React Router, rutas dinámicas, 
              navegación programática, <strong>4 métodos de rutas protegidas</strong>, rutas anidadas y mejores prácticas
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-purple-400 text-white text-xs px-3 py-1 rounded-full">8 Secciones</span>
              <span className="bg-purple-400 text-white text-xs px-3 py-1 rounded-full">Demos Interactivos</span>
              <span className="bg-purple-400 text-white text-xs px-3 py-1 rounded-full">Rutas Protegidas</span>
              <span className="bg-purple-400 text-white text-xs px-3 py-1 rounded-full">Código Completo</span>
            </div>
            <Link 
              to="/spa-demo" 
              className="inline-flex items-center gap-2 bg-white text-purple-600 px-6 py-3 rounded-lg hover:bg-purple-50 font-bold transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <span>🚀</span>
              Abrir Demo Interactiva de SPA
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow">
          <div className="text-3xl mb-3">📚</div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">State Management</h3>
          <p className="text-gray-600 text-sm">Context API, Redux Toolkit, Zustand</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow">
          <div className="text-3xl mb-3">🔌</div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Consumo de API REST</h3>
          <p className="text-gray-600 text-sm">Axios vs Fetch, comparaciones en vivo</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow">
          <div className="text-3xl mb-3">🔐</div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Autenticación</h3>
          <p className="text-gray-600 text-sm">JWT Tokens, interceptores, rutas protegidas</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow">
          <div className="text-3xl mb-3">✏️</div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">CRUD Completo</h3>
          <p className="text-gray-600 text-sm">Posts y comentarios con todas las operaciones</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow">
          <div className="text-3xl mb-3">✅</div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Buenas Prácticas</h3>
          <p className="text-gray-600 text-sm">TypeScript, Error Handling, Loading States</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow">
          <div className="text-3xl mb-3">⚡</div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Comparaciones</h3>
          <p className="text-gray-600 text-sm">Código lado a lado, tablas comparativas</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">🚀 Comienza Explorando</h3>
        <p className="text-gray-600 mb-4">
          Usa las pestañas de navegación arriba para explorar cada sección:
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">1️⃣</span>
            <div>
              <p className="font-medium text-gray-900">State Management</p>
              <p className="text-sm text-gray-600">Revisa las clases anteriores</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-2xl">2️⃣</span>
            <div>
              <p className="font-medium text-gray-900">API - Posts</p>
              <p className="text-sm text-gray-600">Crea posts y ve comparaciones</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-2xl">3️⃣</span>
            <div>
              <p className="font-medium text-gray-900">API - Login</p>
              <p className="text-sm text-gray-600">Aprende sobre autenticación</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-2xl">4️⃣</span>
            <div>
              <p className="font-medium text-gray-900">Comparaciones</p>
              <p className="text-sm text-gray-600">Tabla completa y buenas prácticas</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LearningSection() {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl shadow-lg p-8 text-white">
        <h2 className="text-3xl font-bold mb-2">📚 State Management Learning</h2>
        <p className="text-purple-100">
          Contenido de clases anteriores sobre manejo de estado en React
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 card-hover">
          <div className="text-4xl mb-3">⚛️</div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Context API</h3>
          <p className="text-gray-600 text-sm mb-3">
            Manejo de estado global nativo de React
          </p>
          <span className="badge badge-info">Nativo</span>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 card-hover">
          <div className="text-4xl mb-3">🔴</div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Redux Toolkit</h3>
          <p className="text-gray-600 text-sm mb-3">
            Estado predecible con acciones y reducers
          </p>
          <span className="badge badge-success">Popular</span>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 card-hover">
          <div className="text-4xl mb-3">🐻</div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Zustand</h3>
          <p className="text-gray-600 text-sm mb-3">
            Estado simple y minimalista
          </p>
          <span className="badge badge-warning">Moderno</span>
        </div>
      </div>

      <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="text-4xl">💡</div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-blue-900 mb-2">
              Ver Contenido Completo
            </h3>
            <p className="text-blue-700 mb-4">
              Accede a todos los ejemplos, comparaciones y ejercicios de State Management
            </p>
            <Link 
              to="/learning" 
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-medium transition-colors shadow-md"
            >
              Ir a State Management Learning →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function ApiPostsSection() {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
        <h2 className="text-3xl font-bold mb-2">📝 API - Posts (CRUD)</h2>
        <p className="text-green-100 mb-4">
          Implementación completa de CRUD de posts con Axios
        </p>
        <Link 
          to="/posts" 
          className="inline-block bg-white text-green-600 px-5 py-2.5 rounded-lg hover:bg-green-50 font-medium transition-colors shadow-md"
        >
          Ver Aplicación Completa de Posts →
        </Link>
      </div>

      {/* Demo Funcional */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <span className="text-3xl">🎯</span>
          Demo Funcional - Crear Post
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <PostsDemo method="axios" />
          <PostsDemo method="fetch" />
        </div>
      </div>

      {/* Aplicación funcional completa */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <span className="text-3xl">📋</span>
          Aplicación Completa
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <CreatePostForm />
          </div>
          <div className="lg:col-span-2">
            <PostsList />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <span className="text-3xl">🔄</span>
          Comparación de Código
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border-2 border-green-200 rounded-lg p-4 bg-green-50">
            <h4 className="font-bold text-green-700 mb-3 flex items-center gap-2">
              <span>✅</span> Con Axios
            </h4>
            <pre className="bg-white p-4 rounded-lg text-sm overflow-x-auto border border-green-200 shadow-sm">
{`// Más limpio y conciso
const response = await axios.get('/posts');
const posts = response.data;

// Manejo automático de errores
try {
  await axios.post('/posts', data);
} catch (error) {
  // error.response.status
  // error.response.data
}`}
            </pre>
          </div>
          <div className="border-2 border-orange-200 rounded-lg p-4 bg-orange-50">
            <h4 className="font-bold text-orange-700 mb-3 flex items-center gap-2">
              <span>⚠️</span> Con Fetch
            </h4>
            <pre className="bg-white p-4 rounded-lg text-sm overflow-x-auto border border-orange-200 shadow-sm">
{`// Más verboso
const response = await fetch('/posts');
if (!response.ok) {
  throw new Error('Error');
}
const posts = await response.json();

// Manejo manual de errores
try {
  const res = await fetch('/posts', {
    method: 'POST',
    body: JSON.stringify(data)
  });
}`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

function ApiLoginSection() {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl shadow-lg p-6 text-white">
        <h2 className="text-3xl font-bold mb-2">🔐 API - Autenticación</h2>
        <p className="text-orange-100">
          Sistema de login/register con manejo de tokens JWT
        </p>
      </div>

      {/* Demo Funcional */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <span className="text-3xl">🎯</span>
          Demo Funcional - Prueba en Vivo
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <LoginDemo method="axios" />
          <LoginDemo method="fetch" />
        </div>
      </div>

      {/* Código de Comparación */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <span className="text-3xl">🔄</span>
          Comparación de Código
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border-2 border-green-200 rounded-lg p-4 bg-green-50">
            <h4 className="font-bold text-green-700 mb-3 flex items-center gap-2">
              <span>✅</span> Con Axios
            </h4>
            <pre className="bg-white p-4 rounded-lg text-sm overflow-x-auto border border-green-200 shadow-sm">
{`// Login con Axios
const login = async (credentials) => {
  const response = await axios.post(
    '/login', 
    credentials
  );
  
  // JSON automático
  const { access_token } = response.data;
  localStorage.setItem('token', access_token);
  return response.data;
};

// Interceptor para token
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = 
      \`Bearer \${token}\`;
  }
  return config;
});`}
            </pre>
          </div>
          <div className="border-2 border-orange-200 rounded-lg p-4 bg-orange-50">
            <h4 className="font-bold text-orange-700 mb-3 flex items-center gap-2">
              <span>⚠️</span> Con Fetch
            </h4>
            <pre className="bg-white p-4 rounded-lg text-sm overflow-x-auto border border-orange-200 shadow-sm">
{`// Login con Fetch
const login = async (credentials) => {
  const response = await fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  });
  
  if (!response.ok) {
    throw new Error('Login failed');
  }
  
  // Parsear JSON manualmente
  const data = await response.json();
  const { access_token } = data;
  localStorage.setItem('token', access_token);
  return data;
};

// Sin interceptores nativos
// Debes agregar token manualmente
const token = localStorage.getItem('token');
fetch('/api', {
  headers: {
    'Authorization': \`Bearer \${token}\`
  }
});`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

function ApiCommentsSection() {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl shadow-lg p-6 text-white">
        <h2 className="text-3xl font-bold mb-2">💬 API - Comentarios</h2>
        <p className="text-indigo-100">
          CRUD de comentarios asociados a posts
        </p>
      </div>

      {/* Demo Funcional */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <span className="text-3xl">🎯</span>
          Demo Funcional - Crear Comentario
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <CommentsDemo method="axios" />
          <CommentsDemo method="fetch" />
        </div>
      </div>

      {/* Código de Comparación */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <span className="text-3xl">🔄</span>
          Comparación de Código
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border-2 border-green-200 rounded-lg p-4 bg-green-50">
            <h4 className="font-bold text-green-700 mb-3 flex items-center gap-2">
              <span>✅</span> Con Axios
            </h4>
            <pre className="bg-white p-4 rounded-lg text-sm overflow-x-auto border border-green-200 shadow-sm">
{`// Crear comentario
const createComment = async (data) => {
  const response = await axios.post(
    '/comments',
    data
  );
  return response.data;
};

// Actualizar comentario
const updateComment = async (id, content) => {
  const response = await axios.put(
    \`/comments/\${id}\`,
    { content }
  );
  return response.data;
};

// Eliminar comentario
const deleteComment = async (id) => {
  await axios.delete(\`/comments/\${id}\`);
};`}
            </pre>
          </div>
          <div className="border-2 border-orange-200 rounded-lg p-4 bg-orange-50">
            <h4 className="font-bold text-orange-700 mb-3 flex items-center gap-2">
              <span>⚠️</span> Con Fetch
            </h4>
            <pre className="bg-white p-4 rounded-lg text-sm overflow-x-auto border border-orange-200 shadow-sm">
{`// Crear comentario
const createComment = async (data) => {
  const response = await fetch('/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': \`Bearer \${token}\`
    },
    body: JSON.stringify(data)
  });
  return await response.json();
};

// Actualizar comentario
const updateComment = async (id, content) => {
  const response = await fetch(
    \`/comments/\${id}\`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': \`Bearer \${token}\`
      },
      body: JSON.stringify({ content })
    }
  );
  return await response.json();
};

// Eliminar comentario
const deleteComment = async (id) => {
  await fetch(\`/comments/\${id}\`, {
    method: 'DELETE',
    headers: {
      'Authorization': \`Bearer \${token}\`
    }
  });
};`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

function ComparisonsSection() {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl shadow-lg p-8 text-white">
        <h2 className="text-3xl font-bold mb-2">⚖️ Comparaciones y Buenas Prácticas</h2>
        <p className="text-teal-100">
          Análisis completo de Axios vs Fetch con ejemplos y recomendaciones
        </p>
      </div>

      {/* Tabla Comparativa */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <span className="text-3xl">📊</span>
          Tabla Comparativa
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Característica
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Axios
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Fetch
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Instalación</td>
                <td className="px-6 py-4 text-sm text-orange-600">npm install axios</td>
                <td className="px-6 py-4 text-sm text-green-600">✅ Nativo</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">JSON Automático</td>
                <td className="px-6 py-4 text-sm text-green-600">✅ Sí</td>
                <td className="px-6 py-4 text-sm text-red-600">❌ Manual</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Interceptores</td>
                <td className="px-6 py-4 text-sm text-green-600">✅ Nativos</td>
                <td className="px-6 py-4 text-sm text-red-600">❌ Manual</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Manejo Errores</td>
                <td className="px-6 py-4 text-sm text-green-600">✅ Automático</td>
                <td className="px-6 py-4 text-sm text-red-600">❌ Manual</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Timeout</td>
                <td className="px-6 py-4 text-sm text-green-600">✅ Nativo</td>
                <td className="px-6 py-4 text-sm text-red-600">❌ AbortController</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Sintaxis</td>
                <td className="px-6 py-4 text-sm text-green-600">✅ Concisa</td>
                <td className="px-6 py-4 text-sm text-orange-600">⚠️ Verbosa</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Buenas Prácticas */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-bold mb-4">✅ Buenas Prácticas</h3>
        <div className="space-y-4">
          <div className="border-l-4 border-green-500 pl-4">
            <h4 className="font-semibold text-green-700">1. Centralizar Configuración</h4>
            <p className="text-sm text-gray-600 mt-1">
              Crear una instancia de Axios con baseURL y configuración común
            </p>
            <pre className="bg-gray-100 p-2 rounded text-xs mt-2">
{`const api = axios.create({
  baseURL: 'http://localhost:80/api',
  timeout: 10000
});`}
            </pre>
          </div>

          <div className="border-l-4 border-green-500 pl-4">
            <h4 className="font-semibold text-green-700">2. Usar Interceptores</h4>
            <p className="text-sm text-gray-600 mt-1">
              Agregar tokens automáticamente en todas las peticiones
            </p>
            <pre className="bg-gray-100 p-2 rounded text-xs mt-2">
{`api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = \`Bearer \${token}\`;
  }
  return config;
});`}
            </pre>
          </div>

          <div className="border-l-4 border-green-500 pl-4">
            <h4 className="font-semibold text-green-700">3. Manejo de Errores Centralizado</h4>
            <p className="text-sm text-gray-600 mt-1">
              Crear función para manejar errores de forma consistente
            </p>
            <pre className="bg-gray-100 p-2 rounded text-xs mt-2">
{`function handleError(error) {
  if (error.response?.status === 401) {
    // Redirigir a login
  }
  return error.response?.data?.message || 'Error';
}`}
            </pre>
          </div>

          <div className="border-l-4 border-green-500 pl-4">
            <h4 className="font-semibold text-green-700">4. Loading States</h4>
            <p className="text-sm text-gray-600 mt-1">
              Siempre mostrar feedback visual al usuario
            </p>
            <pre className="bg-gray-100 p-2 rounded text-xs mt-2">
{`const [loading, setLoading] = useState(false);

const fetchData = async () => {
  setLoading(true);
  try {
    const data = await api.get('/posts');
  } finally {
    setLoading(false);
  }
};`}
            </pre>
          </div>

          <div className="border-l-4 border-green-500 pl-4">
            <h4 className="font-semibold text-green-700">5. TypeScript</h4>
            <p className="text-sm text-gray-600 mt-1">
              Definir tipos para las respuestas de la API
            </p>
            <pre className="bg-gray-100 p-2 rounded text-xs mt-2">
{`interface Post {
  id: number;
  title: string;
  content: string;
}

const getPosts = async (): Promise<Post[]> => {
  const response = await api.get<Post[]>('/posts');
  return response.data;
};`}
            </pre>
          </div>
        </div>
      </div>

      {/* Cuándo usar cada uno */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-bold mb-4">🤔 ¿Cuándo usar cada uno?</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border-2 border-green-500 rounded-lg p-4">
            <h4 className="font-bold text-green-700 mb-2">Usar Axios cuando:</h4>
            <ul className="space-y-2 text-sm">
              <li>✅ Proyecto mediano/grande</li>
              <li>✅ Necesitas interceptores</li>
              <li>✅ Quieres sintaxis más limpia</li>
              <li>✅ Requieres manejo avanzado de errores</li>
              <li>✅ Trabajas con múltiples APIs</li>
            </ul>
          </div>
          <div className="border-2 border-orange-500 rounded-lg p-4">
            <h4 className="font-bold text-orange-700 mb-2">Usar Fetch cuando:</h4>
            <ul className="space-y-2 text-sm">
              <li>✅ Proyecto pequeño/simple</li>
              <li>✅ No quieres dependencias</li>
              <li>✅ Solo peticiones GET básicas</li>
              <li>✅ Optimizas tamaño del bundle</li>
              <li>✅ Restricciones de dependencias</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
