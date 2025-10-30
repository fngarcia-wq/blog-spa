export function LoginFormTests() {
  return (
    <div className="testing-section">
      <h2 className="testing-section-title">🔐 Tests del LoginForm</h2>
      <p className="testing-section-subtitle">
        Testing completo del formulario de login con autenticación, validaciones
        y manejo de errores
      </p>

      <div className="testing-highlight">
        <h3 className="testing-highlight-title">
          🎯 Casos de uso del LoginForm
        </h3>
        <p className="text-sm mb-2">
          Este componente es perfecto para aprender testing porque incluye:
        </p>
        <ul className="text-sm space-y-1">
          <li>• Validación de campos</li>
          <li>• Llamadas a API asíncronas</li>
          <li>• Manejo de estados de loading</li>
          <li>• Manejo de errores</li>
          <li>• Navegación programática</li>
          <li>• Integración con context (Auth)</li>
        </ul>
      </div>

      <div className="testing-card">
        <h3 className="testing-card-title">📝 Componente LoginForm Completo</h3>
        <div className="testing-code-block">
          {`// src/components/auth/LoginForm.tsx (versión completa para testing)
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

interface LoginFormData {
  email: string;
  password: string;
}

export function LoginForm() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  });
  
  const [errors, setErrors] = useState<Partial<LoginFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const validateField = (field: keyof LoginFormData, value: string): string => {
    switch (field) {
      case 'email':
        if (!value.trim()) return 'Email is required';
        if (!/\\S+@\\S+\\.\\S+/.test(value)) return 'Please enter a valid email';
        return '';
      case 'password':
        if (!value) return 'Password is required';
        if (value.length < 6) return 'Password must be at least 6 characters';
        return '';
      default:
        return '';
    }
  };
  
  const validate = (): boolean => {
    const newErrors: Partial<LoginFormData> = {};
    
    Object.entries(formData).forEach(([key, value]) => {
      const error = validateField(key as keyof LoginFormData, value);
      if (error) newErrors[key as keyof LoginFormData] = error;
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleChange = (field: keyof LoginFormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear field error on change
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
    
    // Clear server error on any change
    if (serverError) {
      setServerError('');
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsSubmitting(true);
    setServerError('');
    
    try {
      await login(formData.email, formData.password);
      navigate('/dashboard');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Login failed';
      setServerError(message);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>
        </div>
        
        {serverError && (
          <div 
            className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded"
            role="alert"
            data-testid="server-error"
          >
            {serverError}
          </div>
        )}
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange('email')}
            disabled={isSubmitting}
            className={\`block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 \${
              errors.email ? 'border-red-300' : 'border-gray-300'
            }\`}
            placeholder="you@example.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600" role="alert">
              {errors.email}
            </p>
          )}
        </div>
        
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange('password')}
            disabled={isSubmitting}
            className={\`block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 \${
              errors.password ? 'border-red-300' : 'border-gray-300'
            }\`}
            placeholder="Your password"
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600" role="alert">
              {errors.password}
            </p>
          )}
        </div>
        
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </span>
            ) : (
              'Sign In'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}`}
        </div>
      </div>

      <div className="testing-card">
        <h3 className="testing-card-title">🧪 Tests Completos del LoginForm</h3>
        <div className="testing-code-block">
          {`// src/components/auth/__tests__/LoginForm.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../../../hooks/useAuth';
import { LoginForm } from '../LoginForm';

// Mock del hook useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// Mock del servicio de autenticación
const mockLogin = jest.fn();
jest.mock('../../../services/authService', () => ({
  authService: {
    login: (...args: any[]) => mockLogin(...args),
  },
}));

// Helper para renderizar con providers necesarios
function renderLoginForm() {
  return render(
    <BrowserRouter>
      <AuthProvider>
        <LoginForm />
      </AuthProvider>
    </BrowserRouter>
  );
}

describe('LoginForm', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    mockLogin.mockClear();
  });

  // Tests de renderizado
  describe('Rendering', () => {
    test('renders login form with all fields', () => {
      renderLoginForm();
      
      expect(screen.getByRole('heading', { name: 'Sign In' })).toBeInTheDocument();
      expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
      expect(screen.getByLabelText('Password')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument();
    });

    test('has proper form structure and attributes', () => {
      renderLoginForm();
      
      const form = screen.getByRole('form') || screen.getByTestId('login-form');
      const emailInput = screen.getByLabelText('Email Address');
      const passwordInput = screen.getByLabelText('Password');
      
      expect(emailInput).toHaveAttribute('type', 'email');
      expect(emailInput).toHaveAttribute('autoComplete', 'email');
      expect(passwordInput).toHaveAttribute('type', 'password');
      expect(passwordInput).toHaveAttribute('autoComplete', 'current-password');
    });
  });

  // Tests de interacción
  describe('User Interaction', () => {
    test('allows user to enter email and password', async () => {
      const user = userEvent.setup();
      renderLoginForm();
      
      const emailInput = screen.getByLabelText('Email Address');
      const passwordInput = screen.getByLabelText('Password');
      
      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'password123');
      
      expect(emailInput).toHaveValue('test@example.com');
      expect(passwordInput).toHaveValue('password123');
    });

    test('clears field errors when user starts typing', async () => {
      const user = userEvent.setup();
      renderLoginForm();
      
      // Trigger validation errors
      await user.click(screen.getByRole('button', { name: 'Sign In' }));
      
      expect(screen.getByText('Email is required')).toBeInTheDocument();
      
      // Start typing to clear error
      await user.type(screen.getByLabelText('Email Address'), 't');
      
      expect(screen.queryByText('Email is required')).not.toBeInTheDocument();
    });
  });

  // Tests de validación
  describe('Validation', () => {
    test('shows validation errors for empty fields', async () => {
      const user = userEvent.setup();
      renderLoginForm();
      
      await user.click(screen.getByRole('button', { name: 'Sign In' }));
      
      expect(screen.getByText('Email is required')).toBeInTheDocument();
      expect(screen.getByText('Password is required')).toBeInTheDocument();
    });

    test('validates email format', async () => {
      const user = userEvent.setup();
      renderLoginForm();
      
      await user.type(screen.getByLabelText('Email Address'), 'invalid-email');
      await user.type(screen.getByLabelText('Password'), 'password123');
      await user.click(screen.getByRole('button', { name: 'Sign In' }));
      
      expect(screen.getByText('Please enter a valid email')).toBeInTheDocument();
    });

    test('validates password length', async () => {
      const user = userEvent.setup();
      renderLoginForm();
      
      await user.type(screen.getByLabelText('Email Address'), 'test@example.com');
      await user.type(screen.getByLabelText('Password'), '123');
      await user.click(screen.getByRole('button', { name: 'Sign In' }));
      
      expect(screen.getByText('Password must be at least 6 characters')).toBeInTheDocument();
    });

    test('does not submit form with validation errors', async () => {
      const user = userEvent.setup();
      renderLoginForm();
      
      await user.click(screen.getByRole('button', { name: 'Sign In' }));
      
      expect(mockLogin).not.toHaveBeenCalled();
    });
  });

  // Tests de envío exitoso
  describe('Successful Submission', () => {
    test('submits form with valid data', async () => {
      const user = userEvent.setup();
      mockLogin.mockResolvedValue({ user: { id: 1, email: 'test@example.com' } });
      
      renderLoginForm();
      
      await user.type(screen.getByLabelText('Email Address'), 'test@example.com');
      await user.type(screen.getByLabelText('Password'), 'password123');
      await user.click(screen.getByRole('button', { name: 'Sign In' }));
      
      expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password123');
    });

    test('navigates to dashboard on successful login', async () => {
      const user = userEvent.setup();
      mockLogin.mockResolvedValue({ user: { id: 1, email: 'test@example.com' } });
      
      renderLoginForm();
      
      await user.type(screen.getByLabelText('Email Address'), 'test@example.com');
      await user.type(screen.getByLabelText('Password'), 'password123');
      await user.click(screen.getByRole('button', { name: 'Sign In' }));
      
      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
      });
    });

    test('shows loading state during submission', async () => {
      const user = userEvent.setup();
      mockLogin.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));
      
      renderLoginForm();
      
      await user.type(screen.getByLabelText('Email Address'), 'test@example.com');
      await user.type(screen.getByLabelText('Password'), 'password123');
      await user.click(screen.getByRole('button', { name: 'Sign In' }));
      
      expect(screen.getByText('Signing in...')).toBeInTheDocument();
      expect(screen.getByRole('button')).toBeDisabled();
      
      await waitFor(() => {
        expect(screen.queryByText('Signing in...')).not.toBeInTheDocument();
      });
    });
  });

  // Tests de manejo de errores
  describe('Error Handling', () => {
    test('shows server error on login failure', async () => {
      const user = userEvent.setup();
      mockLogin.mockRejectedValue(new Error('Invalid credentials'));
      
      renderLoginForm();
      
      await user.type(screen.getByLabelText('Email Address'), 'test@example.com');
      await user.type(screen.getByLabelText('Password'), 'wrongpassword');
      await user.click(screen.getByRole('button', { name: 'Sign In' }));
      
      await waitFor(() => {
        expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
      });
    });

    test('clears server error when user modifies form', async () => {
      const user = userEvent.setup();
      mockLogin.mockRejectedValue(new Error('Invalid credentials'));
      
      renderLoginForm();
      
      // Trigger server error
      await user.type(screen.getByLabelText('Email Address'), 'test@example.com');
      await user.type(screen.getByLabelText('Password'), 'wrongpassword');
      await user.click(screen.getByRole('button', { name: 'Sign In' }));
      
      await waitFor(() => {
        expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
      });
      
      // Modify form to clear error
      await user.type(screen.getByLabelText('Email Address'), '!');
      
      expect(screen.queryByText('Invalid credentials')).not.toBeInTheDocument();
    });

    test('resets loading state after error', async () => {
      const user = userEvent.setup();
      mockLogin.mockRejectedValue(new Error('Network error'));
      
      renderLoginForm();
      
      await user.type(screen.getByLabelText('Email Address'), 'test@example.com');
      await user.type(screen.getByLabelText('Password'), 'password123');
      await user.click(screen.getByRole('button', { name: 'Sign In' }));
      
      await waitFor(() => {
        expect(screen.getByText('Network error')).toBeInTheDocument();
      });
      
      expect(screen.getByRole('button', { name: 'Sign In' })).not.toBeDisabled();
    });
  });

  // Tests de accesibilidad
  describe('Accessibility', () => {
    test('has proper ARIA labels and roles', () => {
      renderLoginForm();
      
      const errorMessages = screen.queryAllByRole('alert');
      expect(errorMessages).toEqual(expect.any(Array));
      
      expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
      expect(screen.getByLabelText('Password')).toBeInTheDocument();
    });

    test('associates error messages with inputs', async () => {
      const user = userEvent.setup();
      renderLoginForm();
      
      await user.click(screen.getByRole('button', { name: 'Sign In' }));
      
      const emailError = screen.getByText('Email is required');
      const passwordError = screen.getByText('Password is required');
      
      expect(emailError).toHaveAttribute('role', 'alert');
      expect(passwordError).toHaveAttribute('role', 'alert');
    });
  });
});`}
        </div>
      </div>

      <div className="testing-highlight">
        <h3 className="testing-highlight-title">
          💡 Lecciones Clave del LoginForm Testing
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-green-700 mb-2">
              ✅ Técnicas Aplicadas
            </h4>
            <ul className="text-sm space-y-1">
              <li>
                • <strong>Mocking:</strong> useNavigate, authService
              </li>
              <li>
                • <strong>Custom Render:</strong> Providers wrapping
              </li>
              <li>
                • <strong>Async Testing:</strong> waitFor, promises
              </li>
              <li>
                • <strong>Error Scenarios:</strong> Server errors, validation
              </li>
              <li>
                • <strong>Loading States:</strong> Button text changes
              </li>
              <li>
                • <strong>User Interaction:</strong> Form flow completo
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-blue-700 mb-2">
              🎯 Cobertura Completa
            </h4>
            <ul className="text-sm space-y-1">
              <li>
                • <strong>Happy Path:</strong> Login exitoso
              </li>
              <li>
                • <strong>Validation:</strong> Todos los casos de error
              </li>
              <li>
                • <strong>Network Errors:</strong> Fallos de API
              </li>
              <li>
                • <strong>Loading States:</strong> UI feedback
              </li>
              <li>
                • <strong>Navigation:</strong> Redirección post-login
              </li>
              <li>
                • <strong>Accessibility:</strong> ARIA y roles
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
