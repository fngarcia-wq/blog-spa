export function AsyncTestingDemo() {
  return (
    <div className="testing-section">
      <h2 className="testing-section-title">
        ⏳ Testing Asíncrono
      </h2>
      <p className="testing-section-subtitle">
        Fetch, mocking, waitFor y patrones para testear operaciones asíncronas
      </p>

      <div className="testing-highlight">
        <h3 className="testing-highlight-title">
          🎯 Desafíos del Testing Asíncrono
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-orange-700 mb-2">⚠️ Problemas Comunes</h4>
            <ul className="text-sm space-y-1">
              <li>• Tests que fallan intermitentemente</li>
              <li>• Timeouts por operaciones lentas</li>
              <li>• Estado que cambia después del test</li>
              <li>• Memory leaks en componentes</li>
              <li>• Race conditions</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-green-700 mb-2">✅ Soluciones</h4>
            <ul className="text-sm space-y-1">
              <li>• waitFor() para esperar cambios</li>
              <li>• findBy* queries (async by default)</li>
              <li>• Mock de APIs y timers</li>
              <li>• Cleanup apropiado</li>
              <li>• act() cuando es necesario</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="testing-card">
        <h3 className="testing-card-title">🔄 waitFor() - La herramienta principal</h3>
        <div className="testing-code-block">
{`// Esperar a que aparezca un elemento
await waitFor(() => {
  expect(screen.getByText('Data loaded')).toBeInTheDocument();
});

// Esperar a que desaparezca
await waitFor(() => {
  expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
});

// Con timeout personalizado
await waitFor(
  () => {
    expect(screen.getByText('Slow operation complete')).toBeInTheDocument();
  },
  { timeout: 3000 }
);

// Verificar llamadas a mocks
await waitFor(() => {
  expect(mockApiCall).toHaveBeenCalledWith(expectedData);
});`}
        </div>
      </div>

      <div className="testing-card">
        <h3 className="testing-card-title">🔍 findBy* Queries - Async por defecto</h3>
        <div className="testing-code-block">
{`// findBy* retorna una Promise y espera automáticamente
test('loads user data', async () => {
  render(<UserProfile userId="123" />);
  
  // Más simple que waitFor + getBy
  expect(await screen.findByText('John Doe')).toBeInTheDocument();
  
  // Con timeout personalizado
  expect(
    await screen.findByText('Profile loaded', {}, { timeout: 5000 })
  ).toBeInTheDocument();
});

// Para múltiples elementos
test('loads user posts', async () => {
  render(<UserPosts userId="123" />);
  
  const posts = await screen.findAllByTestId('post-item');
  expect(posts).toHaveLength(3);
});`}
        </div>
      </div>

      <div className="testing-card">
        <h3 className="testing-card-title">🌐 Mocking de Fetch/APIs</h3>
        
        <h4 className="font-semibold mb-2">Setup global de fetch mock:</h4>
        <div className="testing-code-block">
{`// setupTests.ts
global.fetch = jest.fn();

beforeEach(() => {
  (fetch as jest.MockedFunction<typeof fetch>).mockClear();
});`}
        </div>

        <h4 className="font-semibold mb-2 mt-4">Mock de respuestas exitosas:</h4>
        <div className="testing-code-block">
{`test('loads and displays user data', async () => {
  const mockUser = { id: 1, name: 'John Doe', email: 'john@example.com' };
  
  (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
    ok: true,
    json: async () => mockUser,
  } as Response);
  
  render(<UserProfile userId="1" />);
  
  expect(await screen.findByText('John Doe')).toBeInTheDocument();
  expect(await screen.findByText('john@example.com')).toBeInTheDocument();
  
  expect(fetch).toHaveBeenCalledWith('/api/users/1');
});`}
        </div>

        <h4 className="font-semibold mb-2 mt-4">Mock de errores:</h4>
        <div className="testing-code-block">
{`test('handles API error gracefully', async () => {
  (fetch as jest.MockedFunction<typeof fetch>).mockRejectedValueOnce(
    new Error('Network error')
  );
  
  render(<UserProfile userId="1" />);
  
  expect(await screen.findByText('Failed to load user data')).toBeInTheDocument();
});

test('handles HTTP error status', async () => {
  (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
    ok: false,
    status: 404,
    statusText: 'Not Found',
  } as Response);
  
  render(<UserProfile userId="999" />);
  
  expect(await screen.findByText('User not found')).toBeInTheDocument();
});`}
        </div>
      </div>

      <div className="testing-card">
        <h3 className="testing-card-title">🕒 Mocking de Timers</h3>
        
        <div className="testing-code-block">
{`// Mock de setTimeout/setInterval
beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});

test('shows message after delay', async () => {
  render(<DelayedMessage />);
  
  // Inicialmente no debe estar presente
  expect(screen.queryByText('Delayed message')).not.toBeInTheDocument();
  
  // Avanzar timers
  act(() => {
    jest.advanceTimersByTime(3000);
  });
  
  // Ahora debe aparecer
  expect(screen.getByText('Delayed message')).toBeInTheDocument();
});

test('auto-saves after typing stops', async () => {
  const mockSave = jest.fn();
  const user = userEvent.setup({ delay: null }); // Importante para fake timers
  
  render(<AutoSaveInput onSave={mockSave} />);
  
  await user.type(screen.getByRole('textbox'), 'Hello');
  
  // No debe guardar inmediatamente
  expect(mockSave).not.toHaveBeenCalled();
  
  // Avanzar el debounce timer
  act(() => {
    jest.advanceTimersByTime(500);
  });
  
  expect(mockSave).toHaveBeenCalledWith('Hello');
});`}
        </div>
      </div>

      <div className="testing-card">
        <h3 className="testing-card-title">📦 Ejemplo Completo: PostList con API</h3>
        
        <h4 className="font-semibold mb-2">Componente:</h4>
        <div className="testing-code-block">
{`// PostList.tsx
import { useState, useEffect } from 'react';

interface Post {
  id: number;
  title: string;
  body: string;
}

export function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError('');
        
        const response = await fetch('/api/posts');
        
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <div data-testid="loading">Loading posts...</div>;
  }

  if (error) {
    return <div data-testid="error">Error: {error}</div>;
  }

  return (
    <div data-testid="post-list">
      <h2>Posts</h2>
      {posts.length === 0 ? (
        <p>No posts found</p>
      ) : (
        <ul>
          {posts.map(post => (
            <li key={post.id} data-testid="post-item">
              <h3>{post.title}</h3>
              <p>{post.body}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}`}
        </div>

        <h4 className="font-semibold mb-2 mt-4">Tests completos:</h4>
        <div className="testing-code-block">
{`// PostList.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import { PostList } from '../PostList';

const mockPosts = [
  { id: 1, title: 'First Post', body: 'This is the first post' },
  { id: 2, title: 'Second Post', body: 'This is the second post' },
];

describe('PostList', () => {
  beforeEach(() => {
    (fetch as jest.MockedFunction<typeof fetch>).mockClear();
  });

  test('shows loading state initially', () => {
    // Mock que no resuelve inmediatamente
    (fetch as jest.MockedFunction<typeof fetch>).mockImplementation(
      () => new Promise(() => {}) // Never resolves
    );
    
    render(<PostList />);
    
    expect(screen.getByTestId('loading')).toBeInTheDocument();
    expect(screen.getByText('Loading posts...')).toBeInTheDocument();
  });

  test('loads and displays posts successfully', async () => {
    (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
      ok: true,
      json: async () => mockPosts,
    } as Response);
    
    render(<PostList />);
    
    // Verificar loading inicial
    expect(screen.getByTestId('loading')).toBeInTheDocument();
    
    // Esperar a que carguen los posts
    await waitFor(() => {
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    });
    
    // Verificar que se muestran los posts
    expect(screen.getByText('First Post')).toBeInTheDocument();
    expect(screen.getByText('Second Post')).toBeInTheDocument();
    expect(screen.getAllByTestId('post-item')).toHaveLength(2);
    
    // Verificar que se llamó fetch correctamente
    expect(fetch).toHaveBeenCalledWith('/api/posts');
  });

  test('shows error message when fetch fails', async () => {
    (fetch as jest.MockedFunction<typeof fetch>).mockRejectedValueOnce(
      new Error('Network error')
    );
    
    render(<PostList />);
    
    // Esperar a que aparezca el error
    expect(await screen.findByTestId('error')).toBeInTheDocument();
    expect(screen.getByText('Error: Network error')).toBeInTheDocument();
    
    // No debe mostrar loading ni posts
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    expect(screen.queryByTestId('post-list')).not.toBeInTheDocument();
  });

  test('handles HTTP error status', async () => {
    (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
    } as Response);
    
    render(<PostList />);
    
    expect(await screen.findByText('Error: Failed to fetch posts')).toBeInTheDocument();
  });

  test('shows empty state when no posts', async () => {
    (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    } as Response);
    
    render(<PostList />);
    
    await waitFor(() => {
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    });
    
    expect(screen.getByText('No posts found')).toBeInTheDocument();
  });

  test('calls fetch with correct URL', async () => {
    (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    } as Response);
    
    render(<PostList />);
    
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('/api/posts');
    });
  });
});`}
        </div>
      </div>

      <div className="testing-highlight">
        <h3 className="testing-highlight-title">
          💡 Best Practices para Testing Asíncrono
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-green-700 mb-2">✅ Hacer</h4>
            <ul className="text-sm space-y-1">
              <li>• Usar findBy* para elementos que aparecen</li>
              <li>• waitFor() para cambios de estado</li>
              <li>• Mock de APIs de forma consistente</li>
              <li>• Testear estados de loading y error</li>
              <li>• Limpiar mocks entre tests</li>
              <li>• Usar timeouts razonables</li>
              <li>• act() solo cuando sea necesario</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-red-700 mb-2">❌ Evitar</h4>
            <ul className="text-sm space-y-1">
              <li>• setTimeout en tests</li>
              <li>• Llamadas reales a APIs</li>
              <li>• Tests que dependan de timing</li>
              <li>• Ignorar cleanup de efectos</li>
              <li>• act() innecesario (RTL lo maneja)</li>
              <li>• Timeouts muy largos</li>
              <li>• Tests flaky o intermitentes</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}