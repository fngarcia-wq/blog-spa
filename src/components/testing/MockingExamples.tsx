export function MockingExamples() {
  return (
    <div className="testing-section">
      <h2 className="testing-section-title">
        🎭 Mocking de Módulos
      </h2>
      <p className="testing-section-subtitle">
        Módulos, Router, LocalStorage, Timers y técnicas avanzadas de mocking
      </p>

      <div className="testing-card">
        <h3 className="testing-card-title">📚 Tipos de Mocking</h3>
        <div className="testing-grid">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-bold text-blue-700 mb-2">🔧 Funciones</h4>
            <div className="testing-code-block">
{`const mockFunction = jest.fn();
const mockWithReturn = jest.fn(() => 'result');
const mockImplementation = jest.fn().mockImplementation((arg) => arg * 2);`}
            </div>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-bold text-green-700 mb-2">📦 Módulos</h4>
            <div className="testing-code-block">
{`jest.mock('./userService');
jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate
}));`}
            </div>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="font-bold text-purple-700 mb-2">🌐 APIs Globales</h4>
            <div className="testing-code-block">
{`global.fetch = jest.fn();
Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage
});`}
            </div>
          </div>
          
          <div className="bg-orange-50 p-4 rounded-lg">
            <h4 className="font-bold text-orange-700 mb-2">⏰ Timers</h4>
            <div className="testing-code-block">
{`jest.useFakeTimers();
jest.advanceTimersByTime(1000);
jest.useRealTimers();`}
            </div>
          </div>
        </div>
      </div>

      <div className="testing-card">
        <h3 className="testing-card-title">🗃️ Mocking LocalStorage</h3>
        <div className="testing-code-block">
{`// setupTests.ts - Setup global
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock as any;

// En un test específico
test('saves user preferences to localStorage', () => {
  const mockSetItem = jest.spyOn(Storage.prototype, 'setItem');
  
  render(<UserPreferences />);
  
  fireEvent.click(screen.getByText('Dark Mode'));
  
  expect(mockSetItem).toHaveBeenCalledWith('theme', 'dark');
  
  mockSetItem.mockRestore();
});

// Mock con valores predefinidos
test('loads saved preferences', () => {
  (localStorage.getItem as jest.Mock).mockReturnValue('dark');
  
  render(<UserPreferences />);
  
  expect(screen.getByText('Dark Mode')).toHaveClass('active');
});`}
        </div>
      </div>

      <div className="testing-card">
        <h3 className="testing-card-title">🛣️ Mocking React Router</h3>
        <div className="testing-code-block">
{`// Mock completo de react-router-dom
const mockNavigate = jest.fn();
const mockLocation = {
  pathname: '/dashboard',
  search: '',
  hash: '',
  state: null,
};

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useLocation: () => mockLocation,
  useParams: () => ({ id: '123' }),
}));

// Test con navegación
test('navigates to user profile on click', async () => {
  const user = userEvent.setup();
  render(<UserCard userId="123" />);
  
  await user.click(screen.getByText('View Profile'));
  
  expect(mockNavigate).toHaveBeenCalledWith('/users/123');
});

// Test con parámetros de URL
test('loads user based on URL params', () => {
  // useParams ya está mockeado para retornar { id: '123' }
  render(<UserProfile />);
  
  expect(screen.getByText('User ID: 123')).toBeInTheDocument();
});

// Mock de Link components
test('renders navigation links', () => {
  render(<Navigation />);
  
  const homeLink = screen.getByRole('link', { name: 'Home' });
  expect(homeLink).toHaveAttribute('href', '/');
});`}
        </div>
      </div>

      <div className="testing-card">
        <h3 className="testing-card-title">⏱️ Mocking Timers y Debounce</h3>
        <div className="testing-code-block">
{`describe('Timer Tests', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('shows countdown timer', () => {
    render(<CountdownTimer seconds={60} />);
    
    expect(screen.getByText('01:00')).toBeInTheDocument();
    
    // Avanzar 30 segundos
    act(() => {
      jest.advanceTimersByTime(30000);
    });
    
    expect(screen.getByText('00:30')).toBeInTheDocument();
  });

  test('debounced search calls API after delay', async () => {
    const mockSearch = jest.fn();
    const user = userEvent.setup({ delay: null }); // Importante!
    
    render(<SearchInput onSearch={mockSearch} />);
    
    const input = screen.getByPlaceholderText('Search...');
    await user.type(input, 'react');
    
    // No debe llamar inmediatamente
    expect(mockSearch).not.toHaveBeenCalled();
    
    // Avanzar el tiempo del debounce (ej: 300ms)
    act(() => {
      jest.advanceTimersByTime(300);
    });
    
    expect(mockSearch).toHaveBeenCalledWith('react');
  });

  test('cancels previous debounced call', async () => {
    const mockSearch = jest.fn();
    const user = userEvent.setup({ delay: null });
    
    render(<SearchInput onSearch={mockSearch} debounceMs={500} />);
    
    const input = screen.getByPlaceholderText('Search...');
    
    // Primera búsqueda
    await user.type(input, 'reac');
    
    // Avanzar parcialmente
    act(() => {
      jest.advanceTimersByTime(300);
    });
    
    // Segunda búsqueda antes de que termine el debounce
    await user.type(input, 't');
    
    // Completar el nuevo debounce
    act(() => {
      jest.advanceTimersByTime(500);
    });
    
    // Solo debe haber llamado con el texto final
    expect(mockSearch).toHaveBeenCalledTimes(1);
    expect(mockSearch).toHaveBeenCalledWith('react');
  });
});`}
        </div>
      </div>

      <div className="testing-card">
        <h3 className="testing-card-title">🔌 Mocking Servicios y APIs</h3>
        <div className="testing-code-block">
{`// userService.ts
export const userService = {
  async getUser(id: string) {
    const response = await fetch(\`/api/users/\${id}\`);
    return response.json();
  },
  
  async updateUser(id: string, data: any) {
    const response = await fetch(\`/api/users/\${id}\`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return response.json();
  }
};

// Mock del servicio completo
jest.mock('../services/userService', () => ({
  userService: {
    getUser: jest.fn(),
    updateUser: jest.fn(),
  },
}));

// En el test
import { userService } from '../services/userService';

const mockUserService = userService as jest.Mocked<typeof userService>;

test('displays user information', async () => {
  const mockUser = { id: '1', name: 'John Doe', email: 'john@example.com' };
  
  mockUserService.getUser.mockResolvedValue(mockUser);
  
  render(<UserProfile userId="1" />);
  
  expect(await screen.findByText('John Doe')).toBeInTheDocument();
  expect(mockUserService.getUser).toHaveBeenCalledWith('1');
});

test('handles update user', async () => {
  const user = userEvent.setup();
  const updatedUser = { id: '1', name: 'Jane Doe', email: 'jane@example.com' };
  
  mockUserService.updateUser.mockResolvedValue(updatedUser);
  
  render(<UserEditForm userId="1" />);
  
  await user.clear(screen.getByLabelText('Name'));
  await user.type(screen.getByLabelText('Name'), 'Jane Doe');
  await user.click(screen.getByText('Save'));
  
  expect(mockUserService.updateUser).toHaveBeenCalledWith('1', {
    name: 'Jane Doe',
    email: expect.any(String),
  });
});`}
        </div>
      </div>

      <div className="testing-card">
        <h3 className="testing-card-title">🎨 Mocking Custom Hooks</h3>
        <div className="testing-code-block">
{`// useAuth.ts
export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const login = async (email: string, password: string) => {
    // Implementation
  };
  
  const logout = () => {
    // Implementation
  };
  
  return { user, loading, login, logout };
}

// Mock del hook
jest.mock('../hooks/useAuth');

const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;

// Test con usuario autenticado
test('shows dashboard when user is logged in', () => {
  mockUseAuth.mockReturnValue({
    user: { id: 1, name: 'John Doe' },
    loading: false,
    login: jest.fn(),
    logout: jest.fn(),
  });
  
  render(<Dashboard />);
  
  expect(screen.getByText('Welcome, John Doe')).toBeInTheDocument();
});

// Test con usuario no autenticado
test('redirects to login when not authenticated', () => {
  mockUseAuth.mockReturnValue({
    user: null,
    loading: false,
    login: jest.fn(),
    logout: jest.fn(),
  });
  
  render(<ProtectedRoute />);
  
  expect(mockNavigate).toHaveBeenCalledWith('/login');
});

// Test de estado de loading
test('shows loading spinner while checking auth', () => {
  mockUseAuth.mockReturnValue({
    user: null,
    loading: true,
    login: jest.fn(),
    logout: jest.fn(),
  });
  
  render(<App />);
  
  expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
});`}
        </div>
      </div>

      <div className="testing-highlight">
        <h3 className="testing-highlight-title">
          💡 Best Practices para Mocking
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-green-700 mb-2">✅ Hacer</h4>
            <ul className="text-sm space-y-1">
              <li>• Mock solo lo necesario</li>
              <li>• Limpiar mocks entre tests (clearAllMocks)</li>
              <li>• Usar tipos TypeScript en mocks</li>
              <li>• Mock a nivel correcto (función vs módulo)</li>
              <li>• Testear tanto success como error cases</li>
              <li>• Restaurar mocks cuando sea necesario</li>
              <li>• Documentar qué se está mockeando</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-red-700 mb-2">❌ Evitar</h4>
            <ul className="text-sm space-y-1">
              <li>• Mockear todo automáticamente</li>
              <li>• Mocks que no reflejan la realidad</li>
              <li>• Dependencias entre mocks de diferentes tests</li>
              <li>• Mocks globales innecesarios</li>
              <li>• No limpiar estado entre tests</li>
              <li>• Mocks demasiado específicos</li>
              <li>• Ignorar los tipos en TypeScript</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}